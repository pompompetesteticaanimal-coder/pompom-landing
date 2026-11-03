# Segurança do site — 03/10/2026

Escopo: landing page PomPom Pet, imagem Nginx e serviços Cloud Run do site. O app/admin PetGestor e suas permissões não foram alterados.

## Controles implementados

- Base Nginx 1.30.5 Alpine por digest imutável: sha256:0985e772fb9f729e6fa0980da05fca5d9c468e870eed43071545afa9d2e27d94.
- apk upgrade --no-cache aplica correções disponíveis às bibliotecas da imagem base. A imagem final também é identificada por digest e verificada antes da promoção.
- Validação nginx -t durante a construção; worker sem root; conteúdo estático de propriedade root, sem escrita pelo usuário do servidor.
- CSP script-src sem unsafe-inline/unsafe-eval; script-src-attr none. Scripts extraídos para site-scripts/ preservando a ordem. Eventos usam uma lista explícita de ações, sem eval. CSS inline permanece permitido para preservar o layout.
- Cabeçalhos centralizados em security-headers.conf; add_header_inherit merge para páginas, CSS, JavaScript, imagens e respostas de erro.
- Sem real_ip confiando em 0.0.0.0/0. Limite por endereço final encaminhado pela plataforma, e teto adicional independente de cabeçalhos por instância. Uma requisição de teste confirmou que Cloud Run acrescenta o endereço observado após um X-Forwarded-For fornecido pelo cliente. Esse limite não substitui WAF/proteção DDoS distribuída.
- Métodos limitados a GET/HEAD. Arquivos ocultos, configurações, backups e estudos bloqueados, além da lista explícita de COPY no Dockerfile.
- Segredos, chaves, testes e ferramentas de migração excluídos do envio para build; npm ci com lockfile em vez de resolução livre de dependências.
- Identidade dedicada pompom-site-sa nos serviços do site. Não foram encontradas atribuições de papéis no nível do projeto para essa conta. A conta Compute padrão mantém seus papéis para não afetar outros serviços, mas não será a identidade das revisões novas do site.

## Verificações reproduzíveis

Os testes funcionais usam jsdom 26.1.0 instalado em um diretório temporário, não incluído na aplicação:

```sh
POMPOM_TEST_NODE_MODULES=/tmp/pompom-security-tests.ZazlO8/node_modules node tests/security.mjs
node tests/http-security.mjs https://pompompetshop.com.br
npm audit --omit=dev
```

Cobertura: menu mobile; abertura/fechamento da loja; sete categorias; foto ampliada, zoom e consulta explícita pelo WhatsApp; galerias e lightbox; avaliações; intro, pular e retorno pelo histórico; ausência de eventos inline. Testes HTTP verificam roteamento mobile/desktop, CSP, oito cabeçalhos, assets, arquivos sensíveis retornando 404, POST 405 e preservação de parâmetros em URLs limpas.

Limitações: não houve teste visual em navegador nesta sessão, pois nenhum navegador estava disponível. jsdom não aplica CSP nem verifica layout. A análise não equivale a pentest, certificação LGPD ou teste de carga.

Varredura da imagem final com Trivy 0.75.0, linux/amd64, scanners vuln e secret, em 03/10/2026: Alpine 3.24.2, 71 pacotes, zero vulnerabilidades conhecidas e zero achados de segredos. A imagem inicialmente atualizada ainda tinha libexpat, libpng, nghttp2-libs e pcre2 desatualizados; apk upgrade resolveu os quatro achados. O resultado depende da base de vulnerabilidades consultada e não garante ausência de falhas desconhecidas. Nenhuma API paga de varredura do Google foi ativada.

Imagem final: us-east1-docker.pkg.dev/pompom-evolution/cloud-run-source-deploy/pompom-site-halloween-preview@sha256:6f6873d6650f42d6dce0f87b8e88ff6d8ea2b2cfb4764deb40823a1c3d347c07. Revisão de teste: pompom-site-halloween-preview-00007-dhg.

Publicação oficial: pompom-site-00071-z9z em us-east1 e pompom-site-00008-qq4 em us-central1, ambas com 100% do tráfego e a conta pompom-site-sa. HTTPS válido no domínio principal e www; HTTP redireciona para HTTPS. As revisões anteriores e o arquivo original de 179 MB foram preservados. Os arquivos HTML/JS publicados no teste foram comparados byte a byte com os arquivos usados nos testes locais.

## Dependências de desenvolvimento

npm audit fix atualizou dependências compatíveis. npm audit --omit=dev retornou zero vulnerabilidades. Restam cinco alertas high na árvore de desenvolvimento Tailwind 3 associados a braces e dependentes; a correção sugerida exige migrar para Tailwind 4, com risco de mudanças visuais. Essa árvore existe somente no estágio de construção, não na imagem final nem em um endpoint público; ela lê arquivos locais confiáveis. Não aceitar padrões fornecidos por terceiros nesse build. A migração de Tailwind deve ser testada separadamente, sem audit fix --force automático.

## Retorno e preservação do original

Backups e artes foram preservados. Revisões anteriores continuam disponíveis, mas restaurá-las reintroduz a configuração antiga. Preferir restaurar o conteúdo visual usando o servidor e a identidade endurecidos; migrar novamente os eventos e scripts inline do HTML original antes de servir com a CSP nova. Nunca restaurar o papel Editor como identidade do site por conveniência.
