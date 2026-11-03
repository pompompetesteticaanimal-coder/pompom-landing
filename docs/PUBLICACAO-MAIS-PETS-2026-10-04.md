# Snoopy/Dexter e Yoshi no comparador oficial — 04/10/2026

Publicação solicitada após inclusão dos novos pares na prévia local.

Patch da imagem anterior, sem incluir o motor experimental de temas ou o laboratório. Acrescentados quatro WebP (antes/depois de Snoopy e Dexter juntos e de Yoshi), atualizados os seletores da seção mobile `#galeria`, CSS em duas colunas e JS com os quatro pares. Cache busting dos recursos: `20261004-10`. Mantidos início em 85% da foto normal, Cacau/Lufi, galeria secundária, foto da Deisiane e restante do site.

- Build: `4c567d27-3bfa-431c-a457-919c71cc15aa`, região `us-east1`.
- Contexto mínimo: `/tmp/pompom-more-pets-deploy.sxUkGn`.
- Imagem: `us-east1-docker.pkg.dev/pompom-evolution/cloud-run-source-deploy/pompom-site-more-pets@sha256:2d4237de163546ca7adb6b48a050b19d6f33b09ee4983d3de6f08aafbf0caad3`.
- Serviço/projeto: `pompom-site` / `pompom-evolution`.
- `us-east1`: `pompom-site-00074-jxf`, 100% do tráfego.
- `us-central1`: `pompom-site-00011-rdb`, 100% do tráfego.
- Anteriores preservadas: `pompom-site-00073-5zz` e `pompom-site-00010-hg5`.

Testes locais de temas e segurança passaram, incluindo troca para os novos pares e posição inicial de 85%. Verificados HTTP 200, referências dos quatro pares, CSP e igualdade SHA-256 de CSS, JS e quatro novas fotos nos domínios principal, www e URLs das duas regiões. Sem inspeção visual em navegador nesta publicação. DNS, IAM, domain mappings e outros serviços não foram alterados.

Rollback, somente se solicitado:

```sh
gcloud run services update-traffic pompom-site --region=us-east1 --project=pompom-evolution --to-revisions=pompom-site-00073-5zz=100
gcloud run services update-traffic pompom-site --region=us-central1 --project=pompom-evolution --to-revisions=pompom-site-00010-hg5=100
```

Não executado. Remove apenas esta publicação, preservando a versão anterior com Cacau/Lufi e a foto nova da fundadora.
