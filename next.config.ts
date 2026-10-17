import type { NextConfig } from 'next'

const config: NextConfig = {
  outputFileTracingIncludes: {
    '/': ['./index.html'],
    '/pnel': ['./admin/index.html'],
  },
}

export default config
