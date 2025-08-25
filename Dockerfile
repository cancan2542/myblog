FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ./app /app
EXPOSE 3000
