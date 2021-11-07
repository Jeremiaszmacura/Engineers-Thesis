FROM node:17-alpine

ENV POSTGRES_DB=maknowledge_development_db \
    POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=postgres

WORKDIR /workspace/server

COPY . /workspace/server

RUN npm install

CMD ["node", "/workspace/server/src/server.js"]