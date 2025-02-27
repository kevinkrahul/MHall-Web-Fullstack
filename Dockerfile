FROM node:latest
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN NEXT_DISABLE_ESLINT=true npm run build
CMD [ "npm", "run", "dev" ]