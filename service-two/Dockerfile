FROM node:12

COPY . /opt/app

WORKDIR /opt/app/service-two

RUN npm ci --only=production

EXPOSE ${PORT}

CMD [ "npm", "start" ]
