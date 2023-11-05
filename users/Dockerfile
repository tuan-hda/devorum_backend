FROM node:20-alpine3.17

WORKDIR /app/users

COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .

EXPOSE 8001

CMD ["yarn", "production"]