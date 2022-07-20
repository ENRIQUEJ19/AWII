FROM node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install

COPY . /usr/src/app

ENV PORT 8000
EXPOSE 8000

CMD ["npm", "run", "dev"]
