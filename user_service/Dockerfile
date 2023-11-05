FROM node:20.9

WORKDIR /app/users

COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .

ENV JWT_SECRET=Tvsfsiv4db7f0gDGJ3wXUs1I9KNAgSdlrOUZjj9cZgQ
EXPOSE 8001

CMD ["yarn", "production"]