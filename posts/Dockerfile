FROM node:20-alpine3.17

WORKDIR /app/posts

COPY ./package.json ./yarn.lock ./
# RUN yarn
# COPY . .

EXPOSE 8003

# CMD ["yarn", "start"]
CMD [ -d "node_modules" ] && yarn start || yarn && yarn start