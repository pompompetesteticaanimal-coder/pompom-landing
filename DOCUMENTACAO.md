# Site PomPom Pet — Documentação

> Landing page do pet shop PomPom Pet Estética Animal.
> Site estático (HTML/CSS/JS puro) com versão desktop e mobile separadas.
> Última atualização operacional: 12/08/2026.

---

## Estrutura de Arquivos

```
Site Pompom/
├── index.html          ← Página de entrada: detecta dispositivo e redireciona
├── desktop.html        ← Versão desktop completa
├── mobile.html         ← Versão mobile completa
├── logo.svg            ← Logo vetorial
├── nginx.conf          ← Config do servidor Nginx (deploy Cloud Run)
├── Dockerfile          ← Build da imagem Docker para Cloud Run
├── .dockerignore       ← Arquivos ignorados no build Docker
├── server.py           ← Servidor HTTP simples para testes locais (Python)
├── extracted_log.md    ← Log de histórico de conversas das sessões anteriores
│
├── fotos/              ← Todas as imagens do site
│   ├── logo.png        ← Logo principal (usada no <link rel="icon">)
│   ├── logo-icon.png   ← Ícone circular (cachorro + gato na banheira) — usado nos navs
│   ├── hero.jpg        ← Foto hero (desktop — fundo da seção inicial)
│   ├── dona.jpg        ← Foto da Deisiane (seção Sobre nós)
│   ├── antes1.jpg      ← Foto "antes" do before/after slider
│   ├── depois1.jpg     ← Foto "depois" do before/after slider
│   ├── produto1-5.jpg  ← Fotos dos produtos da lojinha
│   ├── trabalho1-8.jpg ← Fotos da galeria de trabalhos (raças variadas)
│   └── cachorros/      ← 40+ fotos dos pets atendidos (usadas no marquee rolante)
│
└── ssh_*.py            ← Scripts de diagnóstico/controle da Evolution API via SSH
    ├── ssh_evo_instance.py   ← Gerencia instâncias da Evolution API
    ├── ssh_qr.py             ← Gera/exibe QR code para conectar WhatsApp
    ├── ssh_qr2.py            ← Variação do QR com timeout diferente
    ├── ssh_qr_watch.py       ← Monitora QR até conectar
    ├── ssh_logs.py           ← Lê logs do servidor remoto
    ├── ssh_diagnose.py       ← Diagnóstico completo da instância
    ├── ssh_restart_watch.py  ← Reinicia e monitora reconexão
    ├── ssh_baileys.py        ← Interage com o Baileys (lib WhatsApp)
    ├── ssh_baileys_check.py  ← Verifica estado do Baileys
    ├── ssh_baileys_test.py   ← Testa envio via Baileys
    ├── ssh_debug.py          ← Debug geral da instância
    ├── ssh_poll_qr.py        ← Polling do QR code
    ├── ssh_stderr.py         ← Captura stderr do servidor
    ├── ssh_find_app.py       ← Localiza a aplicação no servidor
    ├── ssh_instances.py      ← Lista todas as instâncias
    ├── ssh_evo_endpoints.py  ← Testa endpoints da Evolution API
    └── ssh_wait_qr.py        ← Aguarda QR ficar disponível
```

---

## Como Rodar Localmente

### Opção 1 — npx serve (recomendado, acessível na rede local)

```bash
cd "C:\Users\Usuario\Documents\pet\Site Pompom"
npx serve . --listen tcp://0.0.0.0:5174
```

Acesse:
- Este computador: `http://localhost:5174/`
- Dispositivos na mesma rede Wi-Fi: `http://192.168.3.20:5174/`

O `index.html` detecta o dispositivo e redireciona automaticamente para `mobile.html` ou `desktop.html`.

### Opção 2 — Python (simples)

```bash
python server.py
# ou
python -m http.server 8080
```

---

## Como Fazer Deploy (Cloud Run)

O site é servido via **Docker + Nginx** no Google Cloud Run.
O projeto GCP correto é `pompom-evolution` e o serviço público do site é `pompom-site`.
Fazer deploy sempre nas duas regiões; o domínio público aponta para `us-east1`.

### Build e deploy manual

```bash
# Autenticar no Google Cloud
gcloud auth login

# Região principal do domínio
gcloud run deploy pompom-site \
  --source . \
  --region us-east1 \
  --allow-unauthenticated \
  --port 8080 \
  --project pompom-evolution

# Região secundária mantida em paridade
gcloud run deploy pompom-site \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --project pompom-evolution
```

Estado publicado em 11/08/2026:

| Região | Revisão | Tráfego |
|---|---|---|
| `us-east1` | `pompom-site-00069-xmw` | 100% |
| `us-central1` | `pompom-site-00006-9pn` | 100% |

### Domínios e serviços relacionados

| Item | Estado |
|---|---|
| `https://pompompetshop.com.br` | Site ativo |
| `https://www.pompompetshop.com.br` | Site ativo via domain mapping |
| Domínio `.com` sem `.br` | Deve ficar fora do ar |
| `petgestor-frontend` | App web/admin deve continuar sem acesso público (`ingress: internal`) |

Não reativar o app web/admin ao publicar o site. O pedido vigente é manter somente o site `.com.br` no ar.

### Como funciona o Dockerfile

```dockerfile
FROM node:20-alpine AS builder   # Etapa de build (não usada para HTML puro)
FROM nginx:alpine                # Serve os arquivos estáticos
COPY . /usr/share/nginx/html     # Copia todos os arquivos HTML/CSS/imagens
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
```

### nginx.conf — Por que `try_files /index.html`

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Garante que qualquer URL desconhecida retorna o `index.html` (que faz o redirect por JS para mobile ou desktop), evitando 404.

---

## Como o Site Funciona

### Roteamento por dispositivo (`index.html`)

```javascript
var isMobile = /Android|webOS|iPhone|iPad|.../i.test(navigator.userAgent)
  || window.innerWidth < 768;
window.location.replace(isMobile ? 'mobile.html' : 'desktop.html');
```

O `index.html` é apenas uma tela de loading com a patinha animada que redireciona imediatamente. Não tem conteúdo próprio.

### Estrutura das páginas

Ambas as páginas usam **HTML puro + TailwindCSS via CDN + Google Fonts**. Não há build step, bundler ou framework — o arquivo é o produto final.

| Seção | ID | Descrição |
|---|---|---|
| Hero | `#inicio` | Fundo com gradient rose + mosaico de fotos dos pets rolando |
| Serviços | `#servicos` | Cards de Banho, Tosa, Hidratação, Lojinha |
| Stats | — | Faixa rose com prova social local e avaliação ★★★★★ |
| Sobre | `#sobre` | Foto da Deisiane + texto + destaques |
| Galeria | `#galeria` | 8 fotos de raças diferentes (antes/depois incluso) |
| Avaliações | — | Depoimentos reais do Google Maps |
| Lojinha | — | 5 produtos com foto |
| Contato | `#contato` | Google Maps embed + endereço + horário + botões |
| Rodapé | — | Logo + links rápidos + WhatsApp flutuante |

### Recursos técnicos notáveis

- **Marquee infinito**: duas fileiras de fotos dos pets rolando em direções opostas (CSS animation)
- **Before/After slider**: comparação antes/depois com drag (`<input type="range">`)
- **Sticky header**: aparece ao rolar, some no hero (IntersectionObserver)
- **Fade-up animations**: elementos entram com animação ao rolar (IntersectionObserver)
- **WhatsApp flutuante**: botão fixo no canto inferior direito
- **Cursor customizado** (desktop): cursor em formato de patinha

---

## Informações de Contato no Site

| Campo | Valor |
|---|---|
| Endereço | R. dos Flox, 954 – Sala 1, Portal dos Ipês, Cajamar – SP, CEP 07791-060 |
| WhatsApp | (11) 94726-6216 |
| E-mail | pompompetesteticaanimal@gmail.com |
| Instagram | @pompompet_esteticaanimal |
| Domínio | pompompetshop.com.br |
| Google Maps | Coord: -23.4032216, -46.8606506 |
| Horário | Ter–Sex: 9h–17h · Sáb: 9h–17h · Dom e Seg: Fechado |

---

## Histórico de Mudanças Relevantes

### 11/08/2026 — Site reativado e tema permanente

| Mudança | Arquivo(s) |
|---|---|
| Reativado/publicado o site no Cloud Run `pompom-site` em `us-east1` e `us-central1` | Cloud Run |
| Confirmado domínio `.com.br` no ar e app web/admin `petgestor-frontend` mantido fora do acesso público | Cloud Run / domain mappings |
| Removido tema da Copa do Mundo, álbum de figurinhas, roupas Copa, modais e scripts relacionados | desktop.html, mobile.html |
| Removidas referências públicas a `fotos/copa` da página e do Dockerfile | desktop.html, mobile.html, Dockerfile |
| Substituídas imagens principais por fotos permanentes de `fotos/ambiente/` | desktop.html, mobile.html |
| Open Graph, Twitter card e schema passaram a usar `fotos/ambiente/frente.png` | desktop.html, mobile.html |
| Prova social alterada de número fixo para copy local: `Todo mês` / `centenas de pets de Cajamar e região` | desktop.html, mobile.html |
| `tailwind.css` regenerado após remoção do tema | tailwind.css |

### Sessão atual (branch `claude/adoring-hawking-92d433`)

| Mudança | Arquivo(s) |
|---|---|
| Corrigido double-encoding de emojis (109 bytes em desktop, 103 em mobile) | desktop.html, mobile.html |
| Removida BOM UTF-8 dos arquivos | desktop.html, mobile.html |
| Corrigido CSP: adicionado `https://www.google.com` ao `frame-src` (Google Maps) | desktop.html, mobile.html |
| Ícones corrigidos: 📍 endereço, ⏰ horário, 🐩 Poodle, 📍 Contato/Visite-nos | desktop.html, mobile.html |
| Removido "PomPom Pet" duplicado do corpo do hero mobile | mobile.html |
| Nome "PomPom Pet" aumentado: 1.65rem → 2.1rem + text-shadow no topo mobile | mobile.html |
| Badge "✨ Estética Animal com amor" movido para baixo do nome no topo (substituindo subtítulo simples) | mobile.html |

### Sessão anterior (histórico do extracted_log.md)

- Logo circular (logo-icon.png) nos navs das duas versões
- Fonte Dancing Script para o nome "PomPom Pet"
- Mosaico de fotos rolando no hero (mobile e desktop)
- Galeria com 8 raças diversificadas (Spitz, Golden, Poodle, Husky, Shih Tzu, Pug, Maltês, Lhasa Apso)
- Before/After slider
- Avaliações reais do Google Maps
- Seção 24h de gravação na área de Sobre
- Correções de segurança: `rel="noopener noreferrer"`, CSP, Referrer-Policy
- Link do Instagram corrigido para @pompompet_esteticaanimal
- Remoção de preços dos serviços e produtos
- Stats anteriores usavam "3000+ Pets atendidos"; copy atual usa prova social local sem número fixo.

---

## Scripts SSH da Evolution API

Os arquivos `ssh_*.py` são utilitários para gerenciar a instância da **Evolution API** (servidor WhatsApp) hospedada remotamente via SSH. Eles não fazem parte do site — são ferramentas de operação.

**Uso típico:**

```bash
# Ver se o WhatsApp está conectado
python ssh_diagnose.py

# Gerar novo QR code para reconectar
python ssh_qr.py

# Acompanhar reconexão em tempo real
python ssh_qr_watch.py
```

---

## Pendências e Próximos Passos

- [ ] **Merge das correções** da branch `claude/adoring-hawking-92d433` para `main`
- [x] **Deploy no Cloud Run** com o domínio `pompompetshop.com.br`
- [ ] **Fotos a adicionar na galeria**: spitz preto, pitbull, chow chow, salsicha
- [ ] **Yorkshire Terrier**: adicionar foto quando disponível em `fotos/cachorros/york-nova.jpg`
- [ ] **Google Maps**: avaliar migração para Google Maps Embed API com chave (URL atual é deprecated)
- [ ] **TailwindCSS**: migrar de CDN para build local em produção (performance e controle de versão)
