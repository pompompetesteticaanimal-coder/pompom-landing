# Transformações de Halloween — teste local

Pares fornecidos pelo usuário, preservados em `/Users/paulohenrique/Pictures/Pompompet/halloween/transformacoes`:

- `cacau.HEIC` → `cacau-antes.webp`; `cacau2.png` → `cacau-depois.webp` (bruxinha).
- `lufi.png` → `lufi-antes.webp`; `lufi2.png` → `lufi-depois.webp` (vampiro).
- `snoopydexter.jpeg` → `snoopydexter-antes.webp`; `snoopydexter2.jpeg` → `snoopydexter-depois.webp` (dupla Frankenstein).
- `yoshi.jpeg` → `yoshi-antes.webp`; `yoshi2.png` → `yoshi-depois.webp` (vampiro).

Snoopy/Dexter e Yoshi foram publicados após aprovação da prévia local em 04/10/2026. Os quatro seletores usam uma grade de duas colunas no mobile. Registro: `docs/PUBLICACAO-MAIS-PETS-2026-10-04.md`.

Conversões WebP de qualidade 85. A Cacau original foi convertida de HEIC para JPEG temporário com `sips` e otimizada para 1086 × 1448. Os originais não foram alterados. Não houve geração de novas imagens nem retoque artístico nesta etapa.

O comparador do mobile permite escolher o pet e arrastar a divisória, inclusive pelo teclado. No Halloween, ele começa com 85% da foto normal visível e volta a essa posição ao trocar o pet. No tema Normal, o comparador anterior continua em 50%. As fotos são mostradas em formato vertical 3:4, com o mesmo enquadramento CSS para as duas camadas; os pares fornecidos têm pequenas diferenças de composição, não constituem um alinhamento perfeito pixel a pixel.

Disponível somente no tema Halloween. O tema Normal restaura `fotos/antes1.jpg` e `fotos/depois1.jpg`, sem seletores sazonais. O aviso “Transformação artística de Halloween” distingue a brincadeira das fotografias reais de serviço.

Teste no laboratório: `previews/?theme=halloween&opening=none&section=transformacoes`. Para testar o próprio aparelho: `mobile.html?previewThemes=1&theme=halloween&opening=none&intro=off#transformacoes`.

Publicado em 04/10/2026 com o comparador em destaque e a galeria menor abaixo, intitulada “Veja mais monstrinhos”. Registro: `docs/PUBLICACAO-TRANSFORMACOES-2026-10-04.md`. O desktop não possuía esse comparador; a alteração modifica apenas o componente mobile existente. O motor de temas e o laboratório permanecem locais.
