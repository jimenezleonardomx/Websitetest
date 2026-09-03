import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      '.open-next/**',
      'node_modules/**',
      'graphify-out/**',
      'next-env.d.ts',
      // vendored skill code -- not ours to lint
      '.claude/skills/impeccable/**',
      '.github/skills/impeccable/**',
      '.claude/agents/impeccable-*.md',
      '.github/agents/impeccable-*.agent.md',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
]

export default config
