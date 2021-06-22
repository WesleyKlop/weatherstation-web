FROM node:16 as builder

WORKDIR /app
ADD ./ /app

RUN npm install
RUN npm run build

FROM nginx:latest

ADD --from=builder /app/dist /usr/share/nginx/html
