# Identidade e catálogo — estudos locais

Em 02/10/2026, a pedido do usuário, acrescentadas três partes ao comparador existente, cada uma com três alternativas. Total: 12 partes / 36 propostas. Os novos estudos foram construídos diretamente em HTML/CSS/JS, sem upload ao Stitch e sem alterar ou publicar o site principal.

- Abertura: nome abaixo do logo (Fredoka), acima do logo (Baloo 2) ou assinatura destacada (Lilita One). Todos explicitam “PomPom Pet”, “Estética Animal” e “Banho, tosa e carinho para seu pet”. Reutilizam a animação atual, com morcegos, raios e fumaça; o modo preview não grava o intervalo de cinco horas.
- Marca: Fredoka, Baloo 2 e Lilita One sobre a capa mobile atual com aquarela. Fontes carregadas do Google Fonts, com fallback local do sistema.
- Catálogo: círculos maiores em duas colunas, cards quadrados com foto inteira ou um produto por vez. Categorias e arquivos vêm diretamente de CATEGORIAS do mobile original, sem mudar classificação, nomes, disponibilidade ou preços. Em todas as alternativas o toque abre dialog com foto original, zoom de 100% a 300% e consulta pelo WhatsApp em ação separada. Escape e botão de fechamento devolvem o foco ao produto.

Arquivos: identidade.html (controles), intro-identidade.html (animação identificada), identidade-demo.js/css (prévia isolada no iframe do mobile). Apenas a página de comparação importa estes experimentos; não são referenciados por mobile.html/desktop.html nem incluídos na imagem de produção. Todas as alternativas e artes anteriores continuam preservadas.

Testes: nove protótipos sem erros JavaScript; repetição da abertura sem persistir cache, carregamento do logo, fontes aplicadas, sete categorias, fotos ampliadas sem navegação para WhatsApp, zoom 200%, fechamento por Escape com retorno de foco e navegação do catálogo. Marca e loja sem overflow em 320/390/430px. Capturas dos novos estudos em layouts/abertura-*.png, layouts/marca-*.png e layouts/catalogo-*.png, detalhes em catalogo-*-detalhe.png.
