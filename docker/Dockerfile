FROM node:alpine AS Builder
WORKDIR /app
COPY . .
RUN npm install && npm run build_staging
#node_modules/.bin/ng build

FROM nginx:alpine
COPY --from=Builder /app/dist /usr/share/nginx/html