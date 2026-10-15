import type { NextConfig } from 'next'

const config: NextConfig = {
  outputFileTracingIncludes: {
    '/': ['./index.html'],
    '/admin': ['./admin/index.html'],
  },
}

export default config
