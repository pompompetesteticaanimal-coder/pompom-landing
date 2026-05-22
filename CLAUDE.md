# PomPom Pet — Site Estático

Landing page do pet shop **PomPom Pet Estética Animal** em Cajamar/SP.
Site: **pompompetshop.com.br**

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
  --allow-unauthenticated \
  --port 8080 \
  --project pompom-evolution

gcloud run deploy pompom-site \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --project pompom-evolution
```

- Projeto GCP: `pompom-evolution`
- Conta: `pompompetesteticaanimal@gmail.com`
- Região principal (domínio): `us-east1` ← **aqui que o site público roda**
- Região secundária: `us-central1`
- Domínio público: `https://pompompetshop.com.br`

O `Dockerfile` usa nginx:alpine e já copia toda a pasta `fotos/copa/` — novas imagens nessa pasta entram automaticamente no deploy.

---

## Rodar Localmente

```bash
python server.py        # porta 3000 — acessível na rede: http://192.168.3.20:3000
# ou
python -m http.server 8080
```

---

## Estrutura

```
index.html      ← detecta dispositivo, redireciona para mobile.html ou desktop.html
desktop.html    ← versão desktop completa
mobile.html     ← versão mobile completa
Dockerfile      ← build Docker para Cloud Run
nginx.conf      ← config nginx hardened
fotos/copa/     ← figurinhas do álbum Copa 2026
```

---

## Sistema de Pacotinhos — Copa 2026

Cada pet tem um código único que desbloqueia sua figurinha no álbum digital do site.
O cliente digita o código, o pacotinho abre com animação, a figurinha fica no álbum permanentemente.

### Códigos dos clientes

| Pet | Código |
|-----|--------|
| Nala | `NALA2026` |
| Luna | `LUNA2026` |
| Belinha | `BELI2026` |
| Floquinho | `FLOQUINHO2026` |
| Gigi | `GIGI2026` |
| Kiara | `KIARA2026` |
| Romeu | `ROMEU2026` |
| Toddy | `TODDY2026` |

Para adicionar novos pets: incluir foto em `fotos/copa/BRA-XX-nome.jpeg` e adicionar entrada em `PACK_CODES` e `PACK_STICKERS` em `desktop.html` e `mobile.html`.
