FROM node:14-alpine

# RUN npm install -g ts-node

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package*.json ./
COPY tsconfig.json ./

COPY src ./src

RUN ls -a
RUN npm install

COPY . /home/app


# ENV POSTGRESQL_DB_HOST "cluster-db.czsbrlhzgr1u.sa-east-1.rds.amazonaws.com"
# ENV POSTGRESQL_DB_USER "postgres"
# ENV POSTGRESQL_DB_PASSWORD "8RG0EkcBbWMFbqDJ6mbMVA"
# ENV POSTGRESQL_DB "postgres"
# ENV POSTGRESQL_DB_SCHEMA "asterisks_prod"

# FROM node:14-alpine

# WORKDIR /home/app
# COPY package*.json ./


EXPOSE 3001

CMD [ "npm", "start" ]