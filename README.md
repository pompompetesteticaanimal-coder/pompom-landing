# PomPom — site e Central de Natal

Site estático da PomPom Pet Estética Animal. O site público usa Cloud Run. Esta branch reúne o laboratório local e os estudos de Natal; publicar nela não altera a produção.

## Abrir em outro Mac ou PC

Com Git e Python 3 instalados:

```sh
git clone --branch codex/natal-laboratorio --single-branch https://github.com/pompompetesteticaanimal-coder/pompom-landing.git
cd pompom-landing
python3 -m http.server 8011 --bind 0.0.0.0
```

Abra **http://localhost:8011/previews/natal/?v=41**. Em outro dispositivo na mesma rede, substitua localhost pelo IP do computador servidor. No Mac, consulte com `ipconfig getifaddr en0`. O IP não acompanha o projeto ao mudar de máquina ou rede.

Se já clonou a branch e não tem alterações locais, atualize com `git pull --ff-only`. Também pode baixar o ZIP da branch, extrair e executar o servidor dentro da pasta. Node e Blender não são necessários para visualizar.

## Usar a Central

- **Entrada · Papai Noel**: animação de entrada e controles de renas, pausa, repetição e versões anteriores. Há também um botão de entrada sempre acima do celular.
- **Experiência e conteúdo / Loja e produtos**: escolha uma parte na navegação; o painel mostra suas três propostas e a prévia continua disponível ao lado.
- **Testar opção N em todas as partes**: aplica uma direção às 16 partes e à abertura. Você ainda pode combinar opções individualmente.
- **Natal / Halloween / Lado a lado**: compare as versões acima dos celulares. O tamanho do aparelho e a ampliação ficam junto da prévia.
- **Identidade e acabamentos**: artes da marca, paleta e papel das três fotos de campanha, organizados por contexto.
- **48 propostas e plano**: capturas nomeadas e links para testar cada proposta.
- **Arquivo de estudos**: nove referências anteriores de Natal e Halloween; a navegação da Central permanece disponível.

No computador há uma barra lateral independente dos ajustes. No tablet e celular, use **Páginas do projeto**; no celular, a prévia fica acima dos controles. Escolhas são salvas neste navegador. A entrada sem parte explícita começa na capa e no topo. Organização e implementação em [Central de Natal](docs/NATAL-CENTRAL-NAVEGACAO.md).

## Arquivos e decisões

- `previews/natal/index.html`: laboratório e telefone interativo.
- `previews/natal/planejamento.html`: três propostas para cada uma das 16 partes.
- `previews/natal/arquivo.html`: visor de estudos históricos.
- `previews/natal/magia/`: toque de varinha com fumaça entre fotos originais de antes e depois; Kiara é o par confirmado atual.
- `previews/natal/abertura/`: fontes das animações, incluindo teatro com Papai Noel ilustrado, seis renas, logo e contador para o Natal. Outras opções continuam acessíveis.
- `previews/natal/artes/`: cinco estilos dos mascotes da marca.
- [Plano das telas](docs/NATAL-PLANO-TELAS-2026-11-04.md): direção visual e referências.
- [Galeria por tema](docs/NATAL-GALERIA-POR-TEMA.md) e [álbuns](docs/NATAL-ALBUNS-FOTOS-REAIS.md): fotos reais mantidas, organizadas por momentos do ano.
- [Lojinha](docs/NATAL-LOJINHA-FOTOS-REAIS.md): fotos reais do estoque preservadas. Nosso espaço também usa suas fotos padrão.
- [Temas e laboratório](docs/TEMAS-E-LABORATORIO.md): estrutura e referências do Halloween.

As fotos e bibliotecas necessárias estão no repositório. As animações usam bibliotecas locais, sem depender de CDN. Fontes Blender são editáveis, mas os arquivos exportados já permitem visualizar sem Blender. Backups locais antigos, dependências instaladas, caches e credenciais não são necessários nem fazem parte da transferência.

## AI Memory compartilhado

`.ai-memory.toml` identifica **workspace pompom / project pompom-site**. No outro computador, abra este diretório e consulte esse escopo. A memória guarda contexto; os arquivos vêm do GitHub.

Referências atuais: `decisions/natal-central-navegacao.md`, `decisions/natal-planejamento-48-telas.md` e `decisions/natal-testar-proposta-site-inteiro.md`. Notas v15/v16 registram etapas históricas. Os registros são resumos explícitos e observações limitadas; não se pressupõe sincronização da transcrição completa.

## Produção

Instruções operacionais em `CLAUDE.md`. O laboratório não entra na imagem Docker. Esta branch não realiza deploy automático. Não usar Vercel; a produção permanece no Google Cloud Run.
