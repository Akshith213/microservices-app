# Dockerfile for payment-service
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3005
CMD ["node", "src/app.js"]

