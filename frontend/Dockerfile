FROM nginxinc/nginx-unprivileged:1.27-alpine AS base
WORKDIR /app
EXPOSE 80

FROM node:22.15.0-alpine AS build
WORKDIR /build
COPY . .
RUN npm ci --ignore-scripts
RUN npm run build

FROM base AS final
COPY --from=build /build/dist /usr/share/nginx/html
COPY --from=build /build/nginx/nginx.conf /etc/nginx/conf.d/default.conf
USER nginx
CMD ["nginx", "-g", "daemon off;"]