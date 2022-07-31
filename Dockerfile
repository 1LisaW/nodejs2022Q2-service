FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY ./dist ./src

CMD ["node", "dist/main.js"]