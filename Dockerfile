FROM node:10.20.1-jessie

RUN mkdir -p /var/www/increment
WORKDIR /var/www/increment
COPY ./ /var/www/increment
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]