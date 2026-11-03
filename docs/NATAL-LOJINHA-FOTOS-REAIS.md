# Lojinha — preservar fotos do catálogo

Em 03/11/2026 o usuário pediu manter as fotos reais dos produtos, pois representam os itens disponíveis da loja, preservando o fluxo de segurança existente.

Na prévia de Natal, as imagens de `#vitrine`, `#lojinha-sheet`, `#lojinha-modal` e `#product-detail` foram excluídas do mecanismo de embrulho de `reset-theme.js`. Isso vale para as imagens iniciais e as inseridas ao trocar categorias, ampliar ou usar zoom. A troca do papel natalino também mantém as fotos reais. Os três cartões da campanha continuam com papel de presente e Em breve; a exceção anterior da galeria circular permanece.

Nenhuma imagem, categoria, referência, lista de produtos ou integração de estoque foi alterada. O catálogo continua usando as fontes existentes em `https://storage.googleapis.com/pompom-produtos/`; não foi criada uma integração nova ou sincronização de estoque. O código do catálogo e dos eventos, CSP, cabeçalhos, Nginx e Dockerfile ficaram intactos. Não foram adicionados bibliotecas, domínios, permissões ou scripts inline.

Verificação em navegador nas versões mobile e desktop: sete categorias, fontes originais, ausência de embrulho na vitrine/catálogo/ampliação, troca de papel, zoom em 200%, fechamento e consulta específica por produto. O link WhatsApp foi apenas inspecionado, sem abrir conversa ou enviar mensagem. Conferidos o endereço de imagens com base fixa e nome codificado, os atributos noopener/noreferrer e o escape de conteúdo no gerador de cards com entrada contendo marcação HTML. Conferida ausência de scripts executáveis e eventos inline nas duas bases.

Entrada: `/previews/natal/?parte=vitrine&v=19`. Para ir direto ao catálogo: `/previews/natal/?parte=catalogo&v=19`.

Esta mudança é local ao laboratório e não publica no Cloud Run. Os testes descritos cobrem a alteração e a continuidade dos controles existentes; não são uma auditoria nova da infraestrutura.
