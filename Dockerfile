# base image
FROM node:lts

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

COPY package*.json ./
COPY prisma ./prisma/

RUN apt-get -qy update && apt-get -qy install openssl

# install dependencies
RUN yarn install

ENV NEXT_TELEMETRY_DISABLED 1

COPY . .
RUN yarn run build


EXPOSE 3000
EXPOSE 5555
CMD yarn run start
