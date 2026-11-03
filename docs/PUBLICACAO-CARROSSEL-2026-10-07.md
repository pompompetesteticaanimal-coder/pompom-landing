# Carrossel Halloween no site oficial — 07/10/2026

Publicação autorizada após aprovação das setas sutis e centralizadas. Patch mínimo sobre a imagem em produção; o motor experimental de temas e o laboratório NÃO foram publicados.

Alterações: destaque com cinco cards (pets existentes + quatro fotos da decoração), deslizamento do card completo, troca automática a cada 5,5 segundos, setas laterais discretas, somente Pausar/Continuar embaixo, gesto horizontal no celular. Preservados os três pets juntos, tamanho do card, transformação inicial em 85%, quatro pares de pets, galeria secundária, foto da dona e restante do site.

- Cloud Build: `c9f9e1eb-5b1a-428a-92cf-ee4ecf22ace0`, `SUCCESS`, região `us-east1`.
- Contexto mínimo: `/private/tmp/pompom-showcase-deploy.my9hh4`.
- Imagem: `us-east1-docker.pkg.dev/pompom-evolution/cloud-run-source-deploy/pompom-site-showcase@sha256:559208ea5550d33f89ef60ef443186b4b87f63c335562a67d61b1915fa2bc0b9`.
- Serviço/projeto: `pompom-site` / `pompom-evolution`.
- `us-east1`: `pompom-site-00075-r2w`, 100% de tráfego.
- `us-central1`: `pompom-site-00012-k5l`, 100% de tráfego.
- Anteriores preservadas: `pompom-site-00074-jxf` e `pompom-site-00011-rdb`.

Incluídos somente HTML mobile/desktop de produção com identificação do bloco e referências ao CSS/JS novos, `halloween-showcase.css`, `halloween-showcase.js` e quatro WebP em `fotos/halloween/ambiente/`. Cache: CSS `20261007-5`, JS `20261007-4`. Dockerfile local atualizado para incluir os recursos em futuros builds completos; o deploy atual usou o Dockerfile mínimo do contexto.

Validação: teste de navegador do patch antes da publicação e no domínio oficial depois, mobile e desktop, confirmando collage original, fotos, navegação, animação lateral, passagem automática e ausência de erros JS. Os testes locais anteriores de tema, segurança e carrossel passaram. Não alterados DNS, IAM, domain mappings ou outros serviços.

Confirmados HTTP 200, referências mobile/desktop, CSP preservada e igualdade SHA-256 de CSS, JS e quatro fotos em `pompompetshop.com.br`, `www.pompompetshop.com.br` e nas URLs das duas regiões.

Rollback, somente se solicitado:

```sh
gcloud run services update-traffic pompom-site --region=us-east1 --project=pompom-evolution --to-revisions=pompom-site-00074-jxf=100
gcloud run services update-traffic pompom-site --region=us-central1 --project=pompom-evolution --to-revisions=pompom-site-00011-rdb=100
```

Não executado. Restaura a versão anterior à inclusão do carrossel.
