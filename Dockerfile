FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ./app /app
EXPOSE 3000


# docker exec -it astro-app /bin/sh
# npm run dev -- --host