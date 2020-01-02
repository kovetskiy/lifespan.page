FROM nginx:alpine

RUN mkdir -p /srv/app
COPY /index.html /srv/app
COPY /index.js /srv/app
COPY /nginx.conf /etc/nginx/nginx.conf
