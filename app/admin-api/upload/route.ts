import { NextRequest, NextResponse } from 'next/server'

const GH_HEADERS = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json',
  'User-Agent': 'ConselhoDigital-CMS',
}

export async function POST(req: NextRequest) {
  try {
    const { filename, data } = await req.json()
    const repo = process.env.GITHUB_REPO ?? 'freak-m/conselhodigital'
    const api = `https://api.github.com/repos/${repo}/contents/${filename}`

    let sha: string | undefined
    const chk = await fetch(api, { headers: GH_HEADERS })
    if (chk.ok) sha = (await chk.json()).sha

    const body: Record<string, string> = { message: `CMS: upload ${filename}`, content: data }
    if (sha) body.sha = sha

    const putR = await fetch(api, { method: 'PUT', headers: GH_HEADERS, body: JSON.stringify(body) })
    if (!putR.ok) throw new Error(`GitHub retornou ${putR.status}`)

    return NextResponse.json({ ok: true, url: filename })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
