FROM node:20-alpine3.17
WORKDIR /app
COPY ["package.json", "."]
RUN npm install
COPY . .
RUN npm run build



# Web server
FROM httpd:alpine3.15
WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/movieapp .

