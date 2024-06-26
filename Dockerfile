# Build
FROM node:18-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# Server
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
# COPY /etc/letsencrypt /etc/letsencrypt
COPY ./docker/nginx-ssl.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]