FROM node:16.17.0

RUN mkdir /usr/src/app && mkdir /usr/src/app/frontend
 
COPY ./ /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

RUN npm install

RUN npm install -g @angular/cli 
