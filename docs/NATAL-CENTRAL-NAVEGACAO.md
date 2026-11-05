# Central de Natal · navegação v39

Entrada única: `http://localhost:8011/previews/natal/?v=39`. Na rede, substituir localhost pelo IP do computador servidor. Servidor com bind em 0.0.0.0, porta 8011.

## Caminhos

- Laboratório ao vivo: seleção de partes, arte, paleta e telefone interativo.
- 48 propostas e plano: três opções nomeadas para cada uma das 16 partes; cada proposta leva ao teste correspondente.
- Natal × Halloween: abre a comparação lado a lado.
- Testar conjunto completo: leva ao painel existente de aplicação de opção 1, 2 ou 3 em todas as partes.
- Referências de arte: seção do planejamento.
- Arquivo de estudos: seis referências anteriores, incluindo laboratório v10, mobile/desktop antigos e layouts, identidade e abertura do Halloween.

A navegação é compartilhada por laboratório, planejamento, arquivo e seis páginas históricas. No laboratório usa a lateral de controles existente; nas outras páginas é uma barra fixa à esquerda. Em telas pequenas vira menu superior recolhível, com aria-expanded e fechamento por Escape. A lista de partes permite saltar para uma seção. Referências históricas abrem dentro do arquivo com a navegação externa disponível. Dentro dos iframes não se injeta outra barra.

`ideias.html` encaminha ao laboratório; `layouts.html` encaminha ao planejamento. Parâmetros e âncora são mantidos, exceto o parâmetro antigo mode que não era usado. Nenhuma escolha é regravada por navegar entre páginas. O botão global de propostas e as escolhas individuais mantêm o comportamento v38.

## Implementação e verificação

`previews/natal/central/navegacao.js` centraliza rotas e catálogo do arquivo; `navegacao.css` cuida da barra compartilhada. `arquivo.html` e `central/arquivo.js` mostram estudos anteriores. O parâmetro pagina aceita apenas seis chaves locais conhecidas; não é convertido em URL arbitrária de iframe.

`node tests/natal-navegacao.mjs` verifica navegação, escolhas preservadas, seis rotas válidas, ausência de barra duplicada em iframe, rejeição de rotas desconhecidas, menu em 320/390 px e redirecionamentos antigos. `node tests/natal-laboratorio.mjs` cobre os controles, propostas globais, fotos e comparação existentes. Requer servidor local e Chrome de teste com CDP na porta 9237, ou variáveis POMPOM_TEST_URL/POMPOM_CDP_URL.

Alteração restrita ao laboratório e documentação. Não há deploy de produção nem alteração de fotos, estoque ou layout do site público.
