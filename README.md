# PomPom — site e laboratório de Natal

Site estático da PomPom Pet Estética Animal. O site público usa Cloud Run; o laboratório é uma prévia local. Esta branch registra o estado local e os estudos, sem publicar o site.

## Abrir em outro Mac ou PC

Com Git e Python 3 instalados:

```sh
git clone --branch codex/natal-laboratorio --single-branch https://github.com/pompompetesteticaanimal-coder/pompom-landing.git
cd pompom-landing
python3 -m http.server 8011 --bind 0.0.0.0
```

Abra **http://localhost:8011/previews/natal/?parte=abertura&abertura=teatro-ilustrado&v=18**. Para outra pessoa na mesma rede, substitua `localhost` pelo IP do computador que iniciou o servidor. No Mac, consulte o IP com `ipconfig getifaddr en0`. O endereço IP do Mac anterior não é transferido com o projeto.

Se essa branch já estiver clonada e sem alterações locais, atualize com `git pull --ff-only`. O ZIP da branch também funciona: extraia, abra o terminal na pasta extraída e execute o comando do servidor acima. Não é necessário instalar Node, Blender ou dependências npm para visualizar o laboratório.

## Conteúdo

- `previews/natal/index.html`: laboratório consolidado com telefone interativo e seleção de partes do site.
- `previews/natal/abertura/`: abertura ilustrada anterior, preservada com três ambientes.
- `previews/natal/abertura/alternativas/`: novos estudos Voo 3D, Teatro de papel e Teatro com personagens ilustrados, com simulação de tração nas rédeas. São sugestões para avaliação, não design aprovado.
- `previews/natal/abertura/rig/pompom-treno-renas.blend`: fonte editável do rig 2.5D anterior. Requer Blender para editar, não para visualizar o site.
- `docs/NATAL-ESTADO-V15.md`: decisões anteriores; `previews/natal/abertura/alternativas/README.md`: estado da revisão v16.
- `docs/NATAL-GALERIA-POR-TEMA.md`: fotos originais da galeria circular organizadas em quatro temas.
- `docs/TEMAS-E-LABORATORIO.md`: estrutura de temas e referências do Halloween.

As fotos e bibliotecas necessárias estão no repositório. Backups locais antigos, caches, dependências npm instaladas e credenciais não fazem parte desta transferência. O preview usa bibliotecas locais; não depende de CDN de terceiros para as animações.

## AI Memory compartilhado

O marcador `.ai-memory.toml` identifica **workspace `pompom` / project `pompom-site`**. No outro computador, peça ao agente para abrir este diretório e consultar esse escopo. AI Memory guarda contexto; os arquivos vêm deste repositório.

A referência anterior está em `notes/natal-laboratorio-abertura-v15.md`. O acompanhamento da revisão está em `notes/natal-alternativas-v16-em-construcao.md`; consulte a versão mais recente dessa nota. O registro automático local apresentou erro de autenticação; resumos explícitos foram salvos pela conexão disponível. Não se pressupõe que a transcrição completa esteja sincronizada.

## Produção

As instruções operacionais estão em `CLAUDE.md`. O laboratório não entra na imagem Docker e esta branch não realiza deploy automático. Publicar no GitHub não altera o Cloud Run.
