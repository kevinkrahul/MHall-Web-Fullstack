FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm build
CMD [ "npm", "run", "dev" ]