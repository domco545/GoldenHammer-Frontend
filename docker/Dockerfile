FROM node:alpine AS Builder
WORKDIR /app
COPY . .
RUN npm install && ng build --configuration=staging

FROM nginx:alpine
COPY --from=Builder /app/dist /usr/share/nginx/html