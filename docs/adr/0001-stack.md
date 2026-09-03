# ADR 0001 -- Stack

**Status:** accepted
**Date:** 2026-09-02

## Context

Two-person website, built with Claude Code on both sides. We need auth, a
database, file uploads and a deploy target, without spending the first weeks
building infrastructure.

## Decision

- **Supabase** for Postgres, auth, storage and realtime.
- **Smooth Hosting** (shared hosting, static export) for hosting -- see
  [ADR 0002](0002-static-export-for-shared-hosting.md), which supersedes the
  original Cloudflare Pages/Workers choice below now that the domain and
  hosting plan are fixed.
- **Next.js (App Router) + TypeScript + Tailwind v4** for the app.
- **GitHub** with protected `main` and PR review.

## Why Supabase over Cloudflare D1

D1 is SQLite at the edge: cheap, fast, and it gives us nothing else. Auth,
storage and row-level permissions would all be ours to build and maintain.
Supabase ships all of it, and Postgres RLS lets authorization live next to the
data instead of scattered through route handlers. For two people, weeks of saved
work outweighs the edge-latency advantage.

Hosting and database are independent choices, so we still get Cloudflare's edge
for the app itself.

## Revisit if

- We become read-heavy enough that per-region Postgres latency hurts, and the
  data is simple enough to live in D1.
- Supabase pricing stops making sense at our traffic.

## Consequences

- Schema changes are migration files in `supabase/migrations/`, never dashboard
  edits, so both of us can rebuild the database from the repo.
- Every table must enable RLS with explicit policies. A table without policies
  is unreadable, which is the safe failure mode.
