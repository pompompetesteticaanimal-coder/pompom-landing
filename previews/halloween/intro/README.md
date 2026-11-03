# Abertura mobile de Halloween — 2026

Implementada somente em `mobile.html`, com `halloween-intro.css` e `halloween-intro.js`.

Revisão visual: logo de Halloween aprovado no círculo (asset `fotos/halloween/logo-halloween.webp`) e novos morcegos cartoon de corpo arredondado, olhos grandes, bochechas rosadas e asas suaves. Referências documentadas em `fotos/halloween/REFERENCIAS-ABERTURA.md`.

Sequência (~6,7 s): enxame de morcegos → voo para fora → mensagem “Halloween chegou. / Venha conferir!” → texto dissolve em névoa → site liberado.

Dois raios com traço claro, brilho lilás e iluminação mais visível, sem áudio. O botão “Entrar no site” aparece junto com a mensagem e sobe se dissolvendo quando a fumaça começa (4,5 s); fica invisível aos 5,6 s. O botão e Escape encerram a abertura. A preferência de reduzir movimento mostra a mensagem estática por 2,6 s.

## Intervalo entre visitas e testes

- Chave da campanha: `pompom:halloween:2026:intro:v1` em localStorage, com sessionStorage de apoio.
- A chave é gravada assim que a abertura aparece, inclusive ao pular, evitando repetição por atualização.
- Intervalo: cinco horas desde a última exibição. Visitas/atualizações durante esse período não reiniciam a contagem. A abertura poderá reaparecer na primeira nova visita depois do prazo; não interrompe alguém que ficou com a página aberta.
- A lembrança vale por navegador e origem/domínio. Limpar o armazenamento ou usar outro navegador permite uma nova primeira visita. As datas já salvas pela versão anterior são compatíveis e passam a respeitar o prazo de cinco horas.
- `mobile.html?intro=preview`: repete para testar, sem gravar a chave.
- `mobile.html?intro=off`: abre direto o site.
- `previews/halloween/abertura.html`: visor mobile com botão de repetição.

## Stitch

Projeto: https://stitch.google.com/projects/10444169902472125204

Referência mobile enviada: tela `15295675043532007023`.
Proposta mobile gerada pelo Stitch: tela `17989612df6d4756809fbf3a5419780b`.
Exportação preservada em `stitch-mobile.html` e `stitch-mobile.png` como referência de design.
Captura da versão realmente implementada: tela `2755933449667983234`.
Referência desktop enviada antes da decisão de trabalhar somente no mobile: tela `9175644020782996802`.

O projeto no Stitch serve para revisar a composição; a prévia local contém a animação real e a persistência da visita.

## Verificações

Em viewport mobile de 390 × 844: abertura na primeira visita, encerramento automático, atualização sem repetição, desktop sem abertura, link de repetição, botão de pular e ausência de erros JavaScript. Conferidos também movimento reduzido, Escape, larguras de 320/430 px sem transbordamento horizontal e botão de repetição no visor.

`mobile-demo.webm` registra o teste. As imagens `mobile-morcegos.png`, `mobile-mensagem.png`, `mobile-nevoa.png` e `mobile-site.png` mostram os momentos da sequência.

O Dockerfile inclui os dois assets novos. Serviço de teste Cloud Run: `pompom-site-halloween-preview`, projeto `pompom-evolution`, região `us-east1`.
