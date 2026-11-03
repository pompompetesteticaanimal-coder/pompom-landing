# ── Stage 1: gera CSS otimizado com Tailwind ────────────────────────────────
FROM node:24-alpine AS css-builder
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY tailwind.config.js input.css ./
COPY desktop.html mobile.html index.html privacidade.html ./
COPY site-scripts ./site-scripts
RUN npx tailwindcss -i input.css -o tailwind.css --minify

# ── Stage 2: serve com nginx hardened ────────────────────────────────────────
# Stable patched release and immutable multi-platform digest verified 03/10/2026.
FROM nginx:1.30.5-alpine@sha256:0985e772fb9f729e6fa0980da05fca5d9c468e870eed43071545afa9d2e27d94

# Apply available Alpine fixes for libraries bundled in the upstream base image.
RUN apk upgrade --no-cache

# Remove configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuração de segurança hardened
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/security-headers.conf
RUN nginx -t

# Copia arquivos estáticos do site
COPY desktop.html /usr/share/nginx/html/
COPY mobile.html  /usr/share/nginx/html/
COPY index.html   /usr/share/nginx/html/
COPY privacidade.html /usr/share/nginx/html/
COPY site-scripts /usr/share/nginx/html/site-scripts/
COPY site-events.js /usr/share/nginx/html/
COPY halloween.css /usr/share/nginx/html/
COPY halloween-transformations.css /usr/share/nginx/html/
COPY halloween-components.js /usr/share/nginx/html/
COPY halloween-showcase.css halloween-showcase.js /usr/share/nginx/html/
COPY halloween-intro.css halloween-intro.js /usr/share/nginx/html/
COPY site-theme-config.js site-theme.js site-opening.js site-themes.css theme-preview.js /usr/share/nginx/html/
COPY fotos/halloween /usr/share/nginx/html/fotos/halloween/
COPY robots.txt   /usr/share/nginx/html/
COPY sitemap.xml  /usr/share/nginx/html/
COPY manifest.json /usr/share/nginx/html/
# Copia apenas subpastas usadas pelo site (exclui fotos/produtos/ que não é referenciada)
COPY fotos/ambiente          /usr/share/nginx/html/fotos/ambiente/
COPY fotos/cachorros         /usr/share/nginx/html/fotos/cachorros/
COPY fotos/datas-comemorativas /usr/share/nginx/html/fotos/datas-comemorativas/
COPY fotos/antes1.jpg        /usr/share/nginx/html/fotos/
COPY fotos/antes1.jpg.webp   /usr/share/nginx/html/fotos/
COPY fotos/depois1.jpg       /usr/share/nginx/html/fotos/
COPY fotos/depois1.jpg.webp  /usr/share/nginx/html/fotos/
COPY fotos/destaque.jpg      /usr/share/nginx/html/fotos/
COPY fotos/destaque.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/dona.jpg          /usr/share/nginx/html/fotos/
COPY fotos/dona.jpg.webp     /usr/share/nginx/html/fotos/
COPY fotos/hero-dog.jpg      /usr/share/nginx/html/fotos/
COPY fotos/hero-dog.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/logo-icon.png     /usr/share/nginx/html/fotos/
COPY fotos/logo-icon.png.webp /usr/share/nginx/html/fotos/
COPY fotos/logo.png          /usr/share/nginx/html/fotos/
COPY fotos/logo.png.webp     /usr/share/nginx/html/fotos/
COPY fotos/produto1.jpg      /usr/share/nginx/html/fotos/
COPY fotos/produto1.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/produto2.jpg      /usr/share/nginx/html/fotos/
COPY fotos/produto2.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/produto3.jpg      /usr/share/nginx/html/fotos/
COPY fotos/produto3.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/produto4.jpg      /usr/share/nginx/html/fotos/
COPY fotos/produto4.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/produto5.jpg      /usr/share/nginx/html/fotos/
COPY fotos/produto5.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/trabalho1.jpg     /usr/share/nginx/html/fotos/
COPY fotos/trabalho1.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/trabalho4.jpg     /usr/share/nginx/html/fotos/
COPY fotos/trabalho4.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/trabalho5.jpg     /usr/share/nginx/html/fotos/
COPY fotos/trabalho5.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/trabalho7.jpg     /usr/share/nginx/html/fotos/
COPY fotos/trabalho7.jpg.webp /usr/share/nginx/html/fotos/
COPY fotos/trabalho8.jpg     /usr/share/nginx/html/fotos/
COPY fotos/trabalho8.jpg.webp /usr/share/nginx/html/fotos/
COPY logo.svg     /usr/share/nginx/html/
COPY --from=css-builder /build/tailwind.css /usr/share/nginx/html/

# Permissões mínimas — nginx worker roda como usuário 'nginx' (não root)
RUN chown -R root:root /usr/share/nginx/html \
 && find /usr/share/nginx/html -type d -exec chmod 755 {} + \
 && find /usr/share/nginx/html -type f -exec chmod 644 {} + \
 && chown -R nginx:nginx /var/cache/nginx \
 && chown -R nginx:nginx /var/log/nginx \
 && touch /var/run/nginx.pid \
 && chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
