# pull official base image
FROM node:lts-alpine AS base-stage

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH=/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN mkdir dist
COPY public/index.html dist/
COPY public/favicon.ico dist/

FROM base-stage AS intermediate
COPY . .
RUN npm run build

FROM base-stage AS production
COPY --from=intermediate app/dist ./dist
COPY server ./server
COPY  *.js* .
CMD ["npm", "start"]

FROM base-stage AS development
RUN npm install nodemon -g
CMD ["npm", "run", "dev"]