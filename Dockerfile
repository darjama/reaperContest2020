# pull official base image
FROM node:lts-alpine as base-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install nodemon -g

FROM base-stage as production

RUN npm install --silent
COPY dist ./dist
COPY server ./server
COPY  *.js* .
CMD ["npm", "start"]

FROM base-stage as development
RUN npm install
CMD ["npm", "run", "dev"]