import { NextRequest, NextResponse } from 'next/server'

const GH_HEADERS = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  'User-Agent': 'ConselhoDigital-CMS',
}

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json()
    const bodyStr = JSON.stringify(content, null, 2)
    const b64 = Buffer.from(bodyStr).toString('base64')

    const repo = process.env.GITHUB_REPO ?? 'freak-m/conselhodigital'
    const api = `https://api.github.com/repos/${repo}/contents/public/content.json`

    const getR = await fetch(api, { headers: GH_HEADERS })
    if (!getR.ok) throw new Error('Não foi possível ler o repositório')
    const { sha } = await getR.json()

    const putR = await fetch(api, {
      method: 'PUT',
      headers: GH_HEADERS,
      body: JSON.stringify({ message: 'CMS: update content.json', content: b64, sha }),
    })
    if (!putR.ok) throw new Error(`GitHub retornou ${putR.status}`)

    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
