---
name: agent-reach
description: >
  Acesso à internet para o agente: lê páginas web, busca vídeos, feeds RSS,
  repositórios GitHub, V2EX e mais — usando ferramentas CLI upstream já instaladas.
  Use quando o usuário pedir para buscar, ler ou pesquisar qualquer conteúdo online.
triggers:
  - buscar na internet
  - pesquisar online
  - ler página web
  - acessar URL
  - baixar vídeo
  - youtube
  - rss
  - feed
  - github repo
  - v2ex
  - bilibili
  - jina reader
  - agent-reach
  - internet access
---

# Agent Reach — Guia de uso

Agent Reach fornece acesso à internet através de ferramentas CLI já instaladas.
**Nunca crie arquivos temporários no workspace.** Use `/tmp/` ou `~/.agent-reach/`.

## Diagnóstico

```bash
agent-reach doctor          # status de todos os canais
agent-reach check-update    # verifica atualizações
```

---

## Canais disponíveis

### ✅ Qualquer página web (Jina Reader)
```bash
curl "https://r.jina.ai/https://exemplo.com/pagina"
```
Retorna o conteúdo em markdown. Funciona para qualquer URL pública.

### ✅ YouTube — baixar / transcrever
```bash
# Listar formatos disponíveis
yt-dlp --list-formats "URL_DO_VIDEO"

# Baixar apenas legenda/subtítulo (sem vídeo)
yt-dlp --skip-download --write-subs --write-auto-subs \
  --sub-langs pt,en -o /tmp/video "URL_DO_VIDEO"

# Baixar áudio
yt-dlp -x --audio-format mp3 -o /tmp/audio "URL_DO_VIDEO"
```

### ✅ RSS / Atom feeds
```bash
# Ler feed RSS
curl "https://exemplo.com/feed.xml"

# Usando feedparser via Python
python3 -c "
import feedparser
d = feedparser.parse('https://exemplo.com/feed.xml')
for e in d.entries[:5]:
    print(e.title, '-', e.link)
"
```

### ✅ V2EX
```bash
# Tópicos em alta
curl "https://www.v2ex.com/api/topics/hot.json"

# Nós (nodes)
curl "https://www.v2ex.com/api/nodes/show.json?name=python"
```

### ✅ Bilibili — busca
```bash
# Busca via API pública
curl "https://api.bilibili.com/x/web-interface/search/all/v2?keyword=TERMO"
```

### ⚠️ GitHub (gh CLI não instalado)
Quando o `gh` CLI for instalado:
```bash
gh repo view owner/repo
gh issue list --repo owner/repo
gh search repos "query"
```

---

## Segurança e limites

- Credenciais: `~/.agent-reach/config.yaml` (permissões 600)
- Arquivos temporários: `/tmp/` ou `~/.agent-reach/` — nunca no workspace
- Sem `sudo` sem aprovação explícita do usuário
- Para plataformas com login (Twitter, Reddit, etc.): `agent-reach configure proxy`

## Instalar canais adicionais

```bash
# Ver status atual
agent-reach doctor

# Instalar dependências core (requer aprovação do usuário)
agent-reach install --env=auto --system

# Exa (busca semântica) — requer mcporter
npm install -g mcporter
mcporter config add exa https://mcp.exa.ai/mcp --scope home
```

## Atualizar

```bash
pip install --upgrade /tmp/agent-reach-src/
# ou clonar novamente e reinstalar
```
