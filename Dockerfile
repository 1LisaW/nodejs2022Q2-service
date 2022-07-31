FROM node:16-alpine

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

# RUN npm run build

COPY . /app/

EXPOSE 4000

CMD ["npm", "run", "start:prod"]