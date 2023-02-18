FROM node:16.15.1 as build
WORKDIR /weather-app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
FROM nginx:1.20
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /weather-app/build /usr/share/nginx/html