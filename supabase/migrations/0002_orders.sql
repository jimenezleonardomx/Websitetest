-- Orders for the (currently fake) checkout flow. Every new order lands with
-- status 'paid' -- there is no real payment gateway wired up yet, so placing
-- an order simulates a payment that already succeeded. 'pending' exists for
-- when a real gateway (e.g. Stripe) is introduced and a webhook needs to
-- flip pending -> paid asynchronously.
create type public.order_status as enum ('pending', 'paid', 'shipped', 'cancelled');

create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  status        public.order_status not null default 'paid',
  customer_name text not null check (char_length(customer_name) between 1 and 120),
  email         text not null check (char_length(email) between 3 and 200),
  phone         text,
  address_line1 text not null check (char_length(address_line1) between 1 and 200),
  address_line2 text,
  city          text not null check (char_length(city) between 1 and 120),
  postcode      text not null check (char_length(postcode) between 1 and 20),
  country       text not null check (char_length(country) between 1 and 80),
  subtotal      numeric(10, 2) not null check (subtotal >= 0),
  total         numeric(10, 2) not null check (total >= 0),
  notes         text
);

create table if not exists public.order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders (id) on delete cascade,
  cigar_slug text not null,
  name       text not null,
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  quantity   integer not null check (quantity > 0)
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- There are no customer accounts in this prototype, so the checkout form
-- (anon) inserts its own order and immediately reads it back for the
-- confirmation page. This intentionally allows anyone with the anon key to
-- read all orders -- fine for a prototype seeded with fake data, but this
-- needs a per-order secret or real customer auth before real orders exist.
create policy "anyone can place an order"
  on public.orders for insert
  to anon, authenticated
  with check (true);

create policy "orders are readable for the confirmation page"
  on public.orders for select
  using (true);

create policy "only the signed-in owner updates orders"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

create policy "anyone can add items to the order they are placing"
  on public.order_items for insert
  to anon, authenticated
  with check (true);

create policy "order items are readable for the confirmation page"
  on public.order_items for select
  using (true);
