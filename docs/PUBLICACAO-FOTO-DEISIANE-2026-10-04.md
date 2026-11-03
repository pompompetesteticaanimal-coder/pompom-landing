# Publicação da foto da Deisiane — 04/10/2026

Pedido: publicar no site oficial a nova foto da fundadora com o cachorro em trajes de Halloween.

## Escopo

A imagem de produção anterior foi usada como base imutável. A atualização adiciona apenas `fotos/halloween/deisiane-halloween.webp` e troca o `src` da foto da fundadora em `mobile.html` e `desktop.html`. As alterações locais do laboratório e do motor de temas não foram incluídas. Configuração de Nginx, segurança, identidade de execução, layout, demais imagens e scripts foram preservados.

O código local continua com fotos distintas para os temas Normal e Halloween, ainda não publicado. Não foi alterado o Dockerfile principal para o patch de produção: foi usado um contexto temporário mínimo em `/tmp/pompom-owner-deploy.WnKn2p`.

## Versão publicada

- Cloud Build: `43c246d6-91f0-4555-8fa1-6d45f5b2e1d6`, região `us-east1`.
- Base: `us-east1-docker.pkg.dev/pompom-evolution/cloud-run-source-deploy/pompom-site-halloween-preview@sha256:6f6873d6650f42d6dce0f87b8e88ff6d8ea2b2cfb4764deb40823a1c3d347c07`.
- Nova imagem: `us-east1-docker.pkg.dev/pompom-evolution/cloud-run-source-deploy/pompom-site-owner-photo@sha256:bbe533e5baf0d80e095a32bfcd145860a76dcdeb73ab521b6de1add955cfcc91`.
- Serviço/projeto: `pompom-site` / `pompom-evolution`.
- `us-east1`: `pompom-site-00072-rb8`, 100% do tráfego.
- `us-central1`: `pompom-site-00009-286`, 100% do tráfego.

As revisões anteriores foram mantidas: `pompom-site-00071-z9z` e `pompom-site-00008-qq4`. Nenhum DNS, domain mapping, IAM ou outro serviço foi alterado.

## Verificação

Após o deploy, verificar HTTP 200 para `/mobile`, `/desktop` e a nova imagem nos domínios principal e `www`, assim como nas URLs diretas das duas regiões. Conferir referência à nova foto, presença de CSP e igualdade SHA-256 da imagem publicada com o arquivo local. A verificação é de conteúdo/HTTP; não substitui inspeção visual no aparelho.

## Retorno à foto anterior, se solicitado

```sh
gcloud run services update-traffic pompom-site --region=us-east1 --project=pompom-evolution --to-revisions=pompom-site-00071-z9z=100
gcloud run services update-traffic pompom-site --region=us-central1 --project=pompom-evolution --to-revisions=pompom-site-00008-qq4=100
```

Esses comandos não foram executados. A campanha Halloween continua ativa.
