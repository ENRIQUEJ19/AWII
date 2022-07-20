FROM node
COPY . /app
WORKDIR /app
RUN npm install
ENV PORT 8000
EXPOSE 8000
ENTRYPOINT [ "npm", "start" ]