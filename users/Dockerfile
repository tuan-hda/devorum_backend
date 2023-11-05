FROM node:20.9

WORKDIR /app/users

COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .

EXPOSE 8001

CMD ["yarn", "production"]