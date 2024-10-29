FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG PORT=5137
ENV PORT=$PORT

EXPOSE $PORT

CMD [ "npm", "run", "dev" ]
