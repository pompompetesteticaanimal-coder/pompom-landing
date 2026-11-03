# Transformações de Halloween publicadas — 04/10/2026

Pedido: publicar o comparador Cacau/bruxinha e Lufi/vampiro com 85% da foto normal visível; tornar a galeria de fotos temáticas secundária, abaixo, com o título “Veja mais monstrinhos”.

## Escopo

Patch da imagem de produção anterior. Inclui quatro fotos WebP, `halloween-transformations.css`, `site-scripts/halloween-transformations.js` e substituição apenas da seção mobile `#galeria`, mais os links ao CSS e JS. O script coloca o comparador primeiro e a galeria abaixo, reduz os cards a 108 × 144 CSS px, mantém categorias e ampliação, e reinicia a divisória em 85% ao trocar o pet. A indicação de transformação artística permanece visível.

Mantidos: foto nova da Deisiane, desktop, abertura, menu, loja, contato, segurança e identidade de execução. Não foram publicados o motor experimental de temas ou o laboratório. O componente reconhece a classe Halloween de produção mesmo sem esse motor. No código local, a troca para Normal restaura o comparador e a ordem da galeria anteriores.

## Versões

- Contexto de build mínimo: `/tmp/pompom-transform-deploy.ReldPy`.
- Build: `5f0992fb-2cea-4a50-96ff-18ad9646fb6d` em `us-east1` (horário UTC: 05/10; São Paulo: 04/10).
- Base: `pompom-site-owner-photo@sha256:bbe533e5baf0d80e095a32bfcd145860a76dcdeb73ab521b6de1add955cfcc91`.
- Nova imagem: `us-east1-docker.pkg.dev/pompom-evolution/cloud-run-source-deploy/pompom-site-transformations@sha256:1d50ea3a0dcca7f6e3eaf829db876668c7523ed79e32a652f80bc09089af2786`.
- Serviço `pompom-site`, projeto `pompom-evolution`.
- `us-east1`: `pompom-site-00073-5zz`, 100% do tráfego.
- `us-central1`: `pompom-site-00010-hg5`, 100% do tráfego.

Revisões anteriores preservadas: `pompom-site-00072-rb8` e `pompom-site-00009-286`. Nenhum DNS, domain mapping, IAM ou outro serviço foi alterado.

## Validação

Testes locais `tests/themes.mjs` e `tests/security.mjs` passaram. Testado também em DOM automatizado o patch sobre o HTML anterior de produção, sem motor de temas: seleção dos dois pets, 85% inicial, arraste e posição secundária da galeria. Após publicar, conferidos HTTP 200, CSP, presença do componente e igualdade SHA-256 de CSS, JS e quatro fotos em ambos os domínios e regiões. Não foi feita inspeção visual em navegador nesta etapa.

## Retorno, somente se solicitado

```sh
gcloud run services update-traffic pompom-site --region=us-east1 --project=pompom-evolution --to-revisions=pompom-site-00072-rb8=100
gcloud run services update-traffic pompom-site --region=us-central1 --project=pompom-evolution --to-revisions=pompom-site-00009-286=100
```

Não executado. Esses destinos mantêm a nova foto da fundadora e removem o comparador sazonal desta publicação.
