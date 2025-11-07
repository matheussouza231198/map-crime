# Stage 1: Build
FROM node:20-alpine AS builder

# Instala pnpm
RUN npm install -g pnpm@9

WORKDIR /app

# Copia arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia o código fonte
COPY . .

# Build da aplicação
RUN pnpm build

# Stage 2: Production
FROM nginx:alpine

# Copia o build para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuração customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
