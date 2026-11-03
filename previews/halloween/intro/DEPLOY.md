# Deploy de teste — 02/10/2026

- Projeto: `pompom-evolution`
- Serviço: `pompom-site-halloween-preview`
- Região: `us-east1`
- Revisão anterior de teste: `pompom-site-halloween-preview-00001-qtr`
- Revisão publicada: `pompom-site-halloween-preview-00002-ln8`
- Tráfego: 100% para a nova revisão.
- URL: https://pompom-site-halloween-preview-120718400087.us-east1.run.app
- Replay de teste: https://pompom-site-halloween-preview-120718400087.us-east1.run.app/mobile?intro=preview

A abertura está somente na versão mobile, com intervalo de cinco horas entre exibições no mesmo navegador/origem. Atualizações durante o intervalo não estendem a contagem. As datas salvas anteriormente são compatíveis com a nova regra.

Verificação no endereço publicado: primeira visita, refresh sem repetição, ausência antes de 5 h, reaparecimento após 5 h (datas simuladas no navegador de teste), intervalo não alterado pelo replay, desktop sem abertura, roteamento da home para iPhone, carregamento do logo e ausência de erros JavaScript. Asset do logo confirmado com HTTP 200.

O serviço de produção `pompom-site` continua com suas revisões originais preservadas em `backups/halloween-2026-10-02/README.md`.

## Atualização — frase de apoio

Nova revisão: `pompom-site-halloween-preview-00003-47d`, servindo 100% do tráfego de teste.

O texto “Um sustinho de fofura espera por você.” passa a sumir no mesmo ritmo do botão (4,5–5,6 s). Conferido no endereço publicado: ambos invisíveis aos 5,65 s, primeira mensagem legível, botão ainda acessível durante a leitura e raio visível.

Os estudos de arte principal estão no projeto Stitch `6568277818132960064` e no comparador local `previews/halloween/artes.html`, aguardando a escolha visual.

## Atualização — escolhas aplicadas e abertura em toda visita

Em 02/10/2026, publicada a revisão `pompom-site-halloween-preview-00004-7dx`, com 100% do tráfego do serviço de teste. Revisão anterior `pompom-site-halloween-preview-00003-47d` preservada para eventual rollback.

Inclui aquarela escolhida, menu 2, contato 2, vitrine 2, avaliações 1, abertura identificada 1, marca Baloo 2 e catálogo 2 com fotos grandes, ampliação, zoom e consulta específica pelo WhatsApp.

Por pedido explícito do usuário, REMOVIDO o intervalo de cinco horas. A abertura exclusiva mobile aparece em todo carregamento, refresh e restauração da página pelo histórico. Nenhuma leitura/escrita de localStorage ou sessionStorage é usada para suprimir a apresentação; dados antigos são simplesmente ignorados. Mantida a duração de 6,7 s (2,6 s com reduced-motion), botão de entrada e encerramento por Escape. Parâmetro diagnóstico `intro=off` continua disponível.

Deploy: `gcloud run deploy pompom-site-halloween-preview --source . --project pompom-evolution --region us-east1 --quiet`.

Verificação local e no link público: visitas e refresh repetidos, cache anterior ignorado, evento de restauração do histórico, modo diagnóstico, desktop sem intro, ampliação/zoom dos produtos, foto fecha sem fechar catálogo, zero erros JavaScript. Serviço pronto e HTTP 200.

Produção NÃO alterada: `pompom-site-00069-xmw` em us-east1 e `pompom-site-00006-9pn` em us-central1 seguem com 100% do tráfego. Backup original e todas as artes permanecem locais, excluídos do build.
