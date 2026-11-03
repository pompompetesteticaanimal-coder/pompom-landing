# PomPom Pet — Site Estático

Landing page do pet shop **PomPom Pet Estética Animal** em Cajamar/SP.
Site: **pompompetshop.com.br**
Última atualização operacional: **04/10/2026**

---

## ⚠️ Deploy — Cloud Run (NÃO é Vercel)

O site é hospedado no **Google Cloud Run** com Docker + Nginx.
**Nunca usar Vercel** — o projeto não tem configuração Vercel.

### Comando de deploy

```bash
cd "C:\Users\Usuario\Documents\pet\Site Pompom"

# ⚠️ SEMPRE fazer deploy nas DUAS regiões — o domínio aponta para us-east1!
gcloud run deploy pompom-site \
  --source . \
  --region us-east1 \
  --service-account pompom-site-sa@pompom-evolution.iam.gserviceaccount.com \
  --allow-unauthenticated \
  --port 8080 \
  --project pompom-evolution

gcloud run deploy pompom-site \
  --source . \
  --region us-central1 \
  --service-account pompom-site-sa@pompom-evolution.iam.gserviceaccount.com \
  --allow-unauthenticated \
  --port 8080 \
  --project pompom-evolution
```

- Projeto GCP: `pompom-evolution`
- Conta: `pompompetesteticaanimal@gmail.com`
- Região principal (domínio): `us-east1` ← **aqui que o site público roda**
- Região secundária: `us-central1`
- Domínio público: `https://pompompetshop.com.br`
- Serviço Cloud Run do site: `pompom-site`
- Revisão publicada em `us-east1`: `pompom-site-00074-jxf` (100% tráfego em 04/10/2026)
- Revisão publicada em `us-central1`: `pompom-site-00011-rdb` (100% tráfego em 04/10/2026)
- Acrescentados Snoopy/Dexter e Yoshi ao comparador oficial; quatro seletores em duas colunas, início em 85%. Ver `docs/PUBLICACAO-MAIS-PETS-2026-10-04.md`.
- Publicação mais recente: comparador mobile Cacau/Lufi em 85%, galeria menor abaixo como “Veja mais monstrinhos”; ver `docs/PUBLICACAO-TRANSFORMACOES-2026-10-04.md`. Desktop e foto da fundadora mantidos.
- Publicação de 04/10: somente a nova foto da Deisiane, em patch da imagem anterior; ver `docs/PUBLICACAO-FOTO-DEISIANE-2026-10-04.md`. O motor de temas e o laboratório continuam locais.

O `Dockerfile` usa nginx:alpine e copia os arquivos estáticos necessários do site.

Segurança revisada em 03/10/2026: Nginx 1.30.5 por digest + atualizações Alpine, CSP sem scripts/eventos inline, cabeçalhos em todos os assets, conteúdo sem escrita pelo worker e identidade dedicada nas duas regiões. Ver `SECURITY.md`. A imagem final passou em varredura de vulnerabilidades e segredos; não usar a identidade Compute padrão com papel Editor no site.

### Estado dos domínios e app web

- **Ativo:** `https://pompompetshop.com.br`
- **Ativo via mapping:** `https://www.pompompetshop.com.br`
- **Fora do ar de propósito:** domínio `.com` sem final `.br`.
- **App web/admin público fora do ar de propósito:** serviço `petgestor-frontend` foi mantido com acesso público bloqueado (`ingress: internal`). Não reativar esse serviço ao mexer no site.
- Se o site cair com `Error: Server Error`, verificar primeiro billing/projeto `pompom-evolution`, revisão do `pompom-site`, domain mappings e logs do Cloud Run.

---

## Rodar Localmente

```bash
python3 -m http.server 8000 --bind 0.0.0.0
# Laboratório: http://localhost:8000/previews/
# Celular: http://IP-DO-MAC:8000/previews/ no mesmo Wi-Fi
# Descobrir IP: ipconfig getifaddr en0
```

---

## Estrutura

```
index.html      ← detecta dispositivo, redireciona para mobile.html ou desktop.html
desktop.html    ← versão desktop completa
mobile.html     ← versão mobile completa
Dockerfile      ← build Docker para Cloud Run
nginx.conf      ← config nginx hardened
fotos/ambiente/ ← fotos da estrutura do pet shop
```

---

## Tema Atual

Campanha Halloween ativa em produção, publicada em 03/10/2026. Arte principal em aquarela, abertura identificada exclusiva mobile em toda visita/refresh (sem intervalo de cinco horas), marca Baloo 2 e catálogo com fotos maiores, ampliação/zoom e consulta pelo WhatsApp somente após selecionar o produto.

Foi promovida a mesma imagem imutável aprovada no serviço de teste. Registro: `previews/halloween/PUBLICACAO-OFICIAL-2026-10-03.md`. A versão original permanece em `backups/halloween-2026-10-02/`, com arquivo de código e revisões históricas `pompom-site-00069-xmw` / `pompom-site-00006-9pn`. Não apagar essas revisões ou os backups. Estudos e artes alternativos continuam locais, fora do deploy.

Em 04/10/2026 foi criado o laboratório local em `previews/index.html`, com celular centralizado, temas Normal/Halloween, abertura independente e acesso aos estudos antigos. Guia: `previews/guia.html`; documentação: `docs/TEMAS-E-LABORATORIO.md`. Os novos arquivos de tema ainda não foram publicados. Ao terminar a campanha, preferir `activeTheme: 'normal'` e `opening: 'auto'` em `site-theme-config.js`, publicando o código atual para preservar layout e segurança. Datas opcionais `startsAt`/`endsAt` automatizam o retorno ao normal nos próximos carregamentos. A classe antiga `halloween-theme` também contém estrutura: não remover o CSS inteiro nem restaurar automaticamente uma revisão antiga para mudar o tema.

### Mudanças recentes do site

- Removido o tema da Copa do Mundo/álbum de figurinhas das versões `desktop.html` e `mobile.html`.
- Removidos os blocos, modais, scripts e imagens `fotos/copa` da página publicada.
- Imagens principais substituídas por fotos permanentes de `fotos/ambiente/`: `recepcao.png`, `frente.png`, `interior.png`, `lojinha.png`.
- Open Graph, Twitter card e schema passaram a usar `https://pompompetshop.com.br/fotos/ambiente/frente.png`.
- Copy de prova social atual:
  - cards visíveis: `Todo mês` + `centenas de pets de Cajamar e região`;
  - SEO/compartilhamento: `Todo mês, centenas de pets de Cajamar e região passam por aqui.`
- `tailwind.css` foi regenerado depois da remoção do tema.
