# Implementação da escolha 1 / 2 / 2

Escolha explícita do usuário: abertura 1, letras da marca 2 e catálogo/fotos 2.

Aplicado ao site local:

- Abertura exclusiva mobile: nome PomPom Pet em Fredoka abaixo do logo, Estética Animal e linha “Banho, tosa e carinho para seu pet”; mensagem sazonal menor. Morcegos, raios, fumaça, botão de entrada, acessibilidade/reduced-motion e intervalo de cinco horas preservados. Fundo do site não transparece por trás do texto da abertura.
- Nome do topo e rodapé: Baloo 2 em peso 800, PomPom creme e Pet laranja; assinatura Estética Animal. Inclui header principal e sticky mobile, desktop normal/scrolled e rodapé. As fontes Fredoka e Baloo 2 foram adicionadas à mesma requisição do Google Fonts já existente.
- Catálogo modal: cards grandes com fotos sem recorte, duas colunas no mobile e quatro no desktop (três em largura menor). Mantidas todas as sete categorias e arquivos originais, sem inventar ou reclassificar produtos.
- Clique no produto: dialog separado com imagem original, zoom de 100% a 300% e consulta pelo WhatsApp específica da referência. Sem redirecionamento automático. Escape fecha somente a foto, devolve o foco e mantém a loja aberta e o fundo bloqueado. Fechar a loja retorna foco ao botão de entrada. O antigo botão genérico do rodapé do catálogo foi substituído por uma instrução; WhatsApp flutuante do site permanece.

Arquivos principais alterados: mobile.html, desktop.html, halloween-intro.js/css, halloween-components.js e halloween.css. Dockerfile já inclui todos os arquivos de runtime necessários. Referências às versões CSS/JS atualizadas para evitar cache antigo. Nenhum arquivo de prévia é importado pelo site principal.

Comparador atualizado com as escolhas aprovadas; todas as nove novas propostas, alternativas anteriores, artes e backup do site original continuam preservados. O protótipo isolado da abertura foi adaptado para não duplicar a identificação após a atualização do runtime.

Validação: mobile em 320/390/430px e desktop em 800/1024/1440px. Testadas fontes, cards com largura e altura adequadas (sem colapso das linhas do grid), fotos contain, sete categorias, Enter/Escape, ampliação sem abrir outra página, zoom 200%, retorno de foco e bloqueio de scroll. Regressões: vitrine/avaliações/contato, menu compacto, JSON-LD e intervalo de cinco horas/mode preview. Zero erros JavaScript. Capturas aplicado-abertura-1.png, aplicado-*-marca-2.png, aplicado-*-catalogo-2.png e aplicado-*-produto-zoom.png.

Sem deploy: domínio público e Cloud Run não foram modificados nesta etapa.
