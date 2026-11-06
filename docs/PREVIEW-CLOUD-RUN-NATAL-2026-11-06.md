# Prévia de Natal no Cloud Run — 06/11/2026

Publicada em ambiente de teste para revisão. A produção (`pompom-site`) e o serviço antigo de prévia Halloween não foram alterados.

- Serviço Cloud Run: `pompom-site-preview`
- Região: `us-east1`
- Revisão: `pompom-site-preview-00003-gmg` (100% do tráfego)
- URL de teste: <https://pompom-site-preview-zotp5bnfoq-ue.a.run.app/>
- Central de Natal: <https://pompom-site-preview-zotp5bnfoq-ue.a.run.app/previews/natal/>
- Imagem imutável: `us-east1-docker.pkg.dev/pompom-evolution/cloud-run-source-deploy/pompom-site-preview@sha256:cfc6fcb48671e3ade83f13afe74454d28956337cea24a6c5e38a53decfa4c344`
- Identidade: `pompom-site-sa@pompom-evolution.iam.gserviceaccount.com`

O contexto isolado inclui o site base e `previews/natal/` para testar a central e seus assets. O Nginx da prévia permite apenas `/previews/natal/`, define `X-Robots-Tag: noindex, nofollow, noarchive` e serve a central na raiz. O redirect de `.html` que revelava a porta interna do Cloud Run foi removido neste serviço de teste. Nenhuma configuração de produção, DNS, IAM ou tráfego do site público foi alterada.

Verificação HTTP após a publicação: raiz, central, bases mobile e desktop, CSS/JS v52, arte aquarela, abertura e magia responderam `200`; `/previews/halloween/` respondeu `404`. CSP e cabeçalhos de segurança foram mantidos.

## Revisão de conteúdo

As capas mobile e desktop exibem o tema de Natal. A frase residual sob a arte da capa foi removida e a comparação antiga de antes/depois de Halloween saiu do HTML mobile. A galeria anual continua com sua fileira histórica de Halloween. As classes e folhas de estilo `halloween-*` que fornecem estrutura compartilhada foram preservadas.

Esta publicação é somente para revisão no endereço de teste; não é promoção para o site oficial.
