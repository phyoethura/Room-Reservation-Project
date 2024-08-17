FROM node:15-alpine
WORKDIR /app/lee
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "proj"]