# PomPom — temas, campanhas e laboratório mobile

Atualizado em 04/10/2026. Implementação local; a produção continua na campanha publicada em 03/10/2026.

## Objetivo

Manter um site permanente com o layout mais recente e aplicar temas por época do ano. Ao terminar uma campanha, retornar ao tema normal sem perder as melhorias de navegação, vitrine, catálogo, avaliações ou contato. Uma troca de tema não deve restaurar a versão antiga do site.

Disponíveis: **Normal** e **Halloween**. Outros temas precisam de suas artes, textos, estilos e testes. A abertura festiva só aparece no tema Halloween. O tema normal sempre entra diretamente, inclusive em URLs antigas de prévia que peçam a animação.

## Entrar no laboratório

Na pasta do projeto, execute:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

No computador: `http://localhost:8000/previews/`.

No celular: `http://IP-DO-MAC:8000/previews/`, no mesmo Wi-Fi. Descubra o IP com `ipconfig getifaddr en0`. O IP pode mudar; não é uma configuração permanente do projeto.

O laboratório mostra o site em um celular centralizado, ajustado à largura e à altura da janela sem rolagem externa. O site continua navegável por rolagem dentro do celular. 320, 375, 390 e 430 pixels são larguras de CSS da prévia, não uma simulação completa de hardware/Safari. A redução visual não altera a largura interna escolhida. **Abrir no meu celular** permite a verificação real no aparelho.

| Controle | Resultado |
| --- | --- |
| Site atual · interativo | Página atual com navegação, loja e modais reais |
| Normal / Halloween | Troca a aparência e o conteúdo sazonal na estrutura aprovada |
| Acompanhar o tema | Halloween tem abertura; Normal não tem |
| Sem abertura | Entra diretamente na página |
| Halloween · testar animação | Testa a abertura da campanha, disponível apenas no tema Halloween |
| Parte da página | Vai à seção, abre o menu ou abre o catálogo; pula a abertura |
| Reiniciar prévia | Recarrega a tela e repete a abertura quando habilitada |
| Ampliar celular | Centraliza uma moldura maior ocupando a tela, conservando a página e a posição de navegação |
| Estudos de layout · opções | Mostra as telas históricas exportadas do Stitch |
| Escolher esta opção | Guarda uma preferência no navegador, sem aplicar o protótipo ao site |
| Copiar minhas escolhas | Gera o texto para compartilhar; oferece campo copiável quando necessário |

Para rever a abertura, escolha Página completa e Reiniciar prévia. Os estudos antigos têm tema Halloween fixo: a troca de tema aplica-se ao site atual, não aos screenshots. **Abrir protótipo desta opção** leva à experiência histórica, que pode ter interações representativas.

**Ampliar celular** usa tela cheia do navegador quando disponível e oferece uma vista ampliada da janela nos demais casos. Para sair, use **Voltar ao laboratório** ou Escape. A moldura mantém a proporção e a largura de CSS selecionada; o site permanece interativo dentro dela.

## Material existente recuperado

- Entrada única: `previews/index.html`.
- Guia visual: `previews/guia.html`.
- Comparador original: `previews/halloween/layouts.html`.
- Opções e decisões canônicas: `previews/halloween/layouts/estudos.json`.
- Identidade, abertura e fotos: `previews/halloween/identidade.html`.
- Vitrine e avaliações: `previews/halloween/experimento.html`.
- Artes: `previews/halloween/artes.html` e `backups/artes-stitch-2026-10-02/`.
- Projeto Stitch: <https://stitch.google.com/projects/3957235714949665270>.

O Stitch produziu os estudos. O laboratório usa os arquivos locais exportados e funciona sem login no Stitch. Nenhuma nova geração ou atualização remota foi feita nesta etapa.

## Trocar o tema que será publicado

Edite `site-theme-config.js`:

```js
window.PomPomThemeConfig = Object.freeze({
  activeTheme: 'normal',
  opening: 'auto',
  startsAt: null,
  endsAt: null
});
```

Para reativar Halloween, use `activeTheme: 'halloween'`. A configuração é compartilhada por mobile e desktop; a abertura continua exclusiva mobile.

Depois de revisar no laboratório e no aparelho, publique a configuração no ambiente de teste e, quando aprovada, no oficial pelo fluxo Cloud Run do projeto. Os controles de prévia não fazem deploy. Os novos arquivos estão no `Dockerfile`; `previews/` e documentos permanecem fora da imagem pública.

### Encerrar automaticamente

Exemplo de campanha que termina no início de novembro, no horário de São Paulo:

```js
window.PomPomThemeConfig = Object.freeze({
  activeTheme: 'halloween',
  opening: 'auto',
  startsAt: null,
  endsAt: '2026-11-01T00:00:00-03:00'
});
```

Esse exemplo **não está ativado**: as datas atuais são `null`. Quando configurada e publicada, a campanha vale no intervalo `[startsAt, endsAt)`. Fora dele, usa-se o tema normal. A avaliação ocorre em cada carregamento pelo relógio do dispositivo; uma aba já aberta precisa ser recarregada. Datas inválidas desativam a campanha como fallback.

Use `opening: 'auto'` para acompanhar a campanha. `opening: 'none'` desativa a abertura durante a campanha. No tema normal a abertura permanece desativada em qualquer configuração.

## Conteúdo permanente e sazonal

Permanente: marca Baloo 2, menu compacto, vitrine 2, avaliações 1, horários, redes sociais, mapa e catálogo com duas colunas e ampliação/zoom antes de consultar pelo WhatsApp. Dados e ações não são duplicados por tema.

Sazonal: paleta, teias/morcegos, aquarela, textos da capa, bloco promocional da campanha e abertura. No tema normal esses elementos saem e a capa usa a identidade rosa com as três fotos permanentes agrupadas no topo mobile: recepção, fachada e interior.

As fotos de pets em cenários comemorativos continuam nos álbuns históricos da galeria. Encerrar uma campanha não apaga as memórias nem as artes salvas.

## Arquivos e funcionamento

| Arquivo | Responsabilidade |
| --- | --- |
| `site-theme-config.js` | Tema publicado e datas da campanha |
| `site-theme.js` | Resolve tema/datas e modo da abertura antes de renderizar |
| `site-opening.js` | Carrega a animação somente quando o tema resolvido é Halloween e a abertura está habilitada |
| `site-themes.css` | Tema normal mantendo os layouts aprovados |
| `halloween.css` | Halloween e regras antigas de layout compartilhado |
| `halloween-intro.js` / `.css` | Abertura mobile, obedecendo ao modo resolvido |
| `theme-preview.js` | Alternador apenas em URL explícita de prévia |
| `previews/laboratorio.js` / `.css` | Controles, estudos e moldura do celular |

As classes `halloween-theme`, `halloween-mobile` e `halloween-desktop` ainda contêm estrutura e permanecem nos dois temas. `theme-normal` e `data-theme` indicam a seleção atual. Não remover o CSS inteiro de Halloween: isso também removeria ajustes de layout. O gestor faz a transição.

### URLs para comparação

```text
/mobile.html?previewThemes=1&theme=normal&opening=auto
/mobile.html?previewThemes=1&theme=halloween&opening=none
/mobile.html?previewThemes=1&theme=halloween&opening=halloween
/desktop.html?previewThemes=1&theme=normal
```

`previewEmbedded=1` esconde o alternador dentro da moldura. `intro=off` pula a abertura. Overrides de `theme` e `opening` só valem com `previewThemes=1`; acessos comuns usam a configuração publicada.

O tema dos visitantes não fica gravado em `localStorage` ou `sessionStorage`. A seleção de prévia fica na URL. Só preferências de estudos usam `localStorage`, na chave histórica `pompom:layout-studies:2026:v1`, compartilhada com o comparador original. Elas não afetam produção.

## Próximas campanhas

1. Definir paleta, arte, textos e abertura usando o normal como referência.
2. Acrescentar o tema ao gestor e aos controles; preparar estilos e conteúdo sazonal na estrutura aprovada.
3. Incluir assets no Docker, mantendo estudos fora da publicação.
4. Conferir laboratório, aparelho e desktop; testar menu, loja, zoom, WhatsApp, galeria e contato.
5. Definir datas quando necessário e publicar no teste antes do oficial.

## Backups e retorno

`backups/halloween-2026-10-02/` preserva o site anterior para referência e recuperação. Restaurar uma revisão antiga pode perder melhorias posteriores e a segurança nova. Para encerrar o Halloween, use **tema normal no código atual**.

Guia operacional: `CLAUDE.md`. Segurança: `SECURITY.md`. Esta etapa é local e não exige autenticação Google.

## Verificação desta entrega

Em 04/10/2026 passaram os testes funcionais existentes de mobile/desktop (menu, sete categorias, produto ampliado, zoom, WhatsApp, galeria, avaliações e abertura) e os novos testes de temas, expiração da campanha e configuração independente da abertura.

O laboratório foi verificado em DOM para seleção de tema/abertura, dimensões internas do celular, seleção dos estudos e cópia das escolhas com fallback. As **12 partes e 36 opções** preservadas têm imagens locais disponíveis. Página, guia, scripts, estilos e documentação responderam HTTP 200 pelo servidor da rede.

Reprodução dos testes com a dependência temporária usada no projeto:

```sh
POMPOM_TEST_NODE_MODULES=/tmp/pompom-security-tests.ZazlO8/node_modules node tests/security.mjs
POMPOM_TEST_NODE_MODULES=/tmp/pompom-security-tests.ZazlO8/node_modules node tests/themes.mjs
```

O diretório temporário pode ser removido pelo sistema; se isso acontecer, é necessário disponibilizar jsdom novamente para esses comandos. Não está incluído no build público. Esses testes não verificam pixels nem o comportamento real de Safari. Não havia navegador conectado nesta sessão; a revisão visual em aparelho fica disponível pelo laboratório e pelo link Abrir no meu celular.
