FROM node:18.18.2

WORKDIR /var/www/html

COPY . /var/www/html

RUN npm install

EXPOSE 3000
