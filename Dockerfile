FROM node:14-alpine

# RUN npm install -g ts-node

WORKDIR /home/app

COPY package*.json ./

COPY . .

RUN npm install

# ENV POSTGRESQL_DB_HOST "cluster-db.czsbrlhzgr1u.sa-east-1.rds.amazonaws.com"
# ENV POSTGRESQL_DB_USER "postgres"
# ENV POSTGRESQL_DB_PASSWORD "8RG0EkcBbWMFbqDJ6mbMVA"
# ENV POSTGRESQL_DB "postgres"
# ENV POSTGRESQL_DB_SCHEMA "asterisks_prod"

EXPOSE 3001

CMD [ "npm", "start" ]