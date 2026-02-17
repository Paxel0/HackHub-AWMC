# ========== BUILD STAGE ==========
FROM node:20-alpine AS builder
WORKDIR /app

# Copia package files per sfruttare cache Docker
COPY package*.json ./

# Installa dipendenze
RUN npm ci --legacy-peer-deps

# Copia sorgenti
COPY . .

# Build produzione Angular
RUN npm run build -- --configuration=production

# ========== RUNTIME STAGE ==========
FROM nginx:alpine AS runtime

# Rimuovi config nginx default
RUN rm /etc/nginx/conf.d/default.conf

# Copia config nginx personalizzata
COPY nginx.conf /etc/nginx/conf.d/

# Copia build Angular (output path basato su angular.json)
COPY --from=builder /app/dist/FrontEnd/browser /usr/share/nginx/html

# Sicurezza: imposta permessi corretti
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Usa utente non-root
USER nginx

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
