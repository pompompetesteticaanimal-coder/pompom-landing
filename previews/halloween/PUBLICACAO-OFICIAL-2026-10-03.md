# Publicação oficial — bloqueada pelo faturamento

Pedido do usuário: promover a versão aprovada do Cloud Run de teste para pompompetshop.com.br.

Tentada promoção da imagem imutável aprovada do serviço de teste, digest sha256:1ba0e565642330c2fa33b1b3b6495e997c9ab76edb76516b6d3f1660e731e82e, para o serviço pompom-site nas regiões us-east1 e us-central1. Ambos os comandos falharam antes de criar/re rotear a revisão, com PERMISSION_DENIED / BILLING_DISABLED.

Diagnóstico somente leitura: o projeto pompom-evolution continua vinculado ao faturamento (billingEnabled: true), mas sua conta vinculada “Minha conta de faturamento” está FECHADA (open: false). Não foi alterada a conta, forma de pagamento ou configuração financeira. É necessário o usuário reabrir/regularizar a conta antes de retomar a publicação.

Após as tentativas, produção preservada: pompom-site-00069-xmw em us-east1 e pompom-site-00006-9pn em us-central1, ambas com 100% do tráfego. O backup original-source-08193cf.tar.gz de 179 MB continua presente.

Consulta ao domínio oficial retornou HTTP 500 e página “Error: Server Error”; a versão nova não foi publicada. Não foram alterados DNS, mappings, IAM, admin ou outros serviços.

## Resolvido — publicação oficial concluída

Após o usuário regularizar o faturamento e solicitar nova tentativa, confirmado open: true na conta vinculada.

Promovida exatamente a imagem imutável aprovada no teste, sem recompilar o código ou incluir os experimentos:

- us-east1: pompom-site-00070-7gf, com 100% do tráfego.
- us-central1: pompom-site-00007-ljh, com 100% do tráfego.
- Imagem em ambas: us-east1-docker.pkg.dev/pompom-evolution/cloud-run-source-deploy/pompom-site-halloween-preview@sha256:1ba0e565642330c2fa33b1b3b6495e997c9ab76edb76516b6d3f1660e731e82e.

Verificados HTTP 200 em https://pompompetshop.com.br e https://www.pompompetshop.com.br. Teste no domínio oficial aprovou abertura em toda visita/refresh no mobile, cache antigo ignorado, restauração pelo histórico, carregamento do logo, TikTok no contato, desktop sem intro, foto ampliada e zoom, Escape fecha somente a foto e ausência de erros JavaScript.

As revisões originais continuam preservadas para retorno ao fim da campanha; comandos de restauração em backups/halloween-2026-10-02/README.md. Não foram alterados DNS, mappings, IAM ou outros serviços.
