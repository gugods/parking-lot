FROM phusion/passenger-nodejs:1.0.12 AS build

RUN npm install yarn -g

WORKDIR /home/app/parking-lot
COPY package.json yarn.lock .yarnrc ./

RUN yarn install
COPY . .

RUN yarn build
RUN yarn cache clean

CMD yarn start
