FROM node:latest

ENV POSTGRES_DB=maknowledge_development_db \
    POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=postgres

WORKDIR /workspace/server

COPY package*.json .

RUN npm install

COPY . /workspace/server

CMD ["node", "src/server.js"]