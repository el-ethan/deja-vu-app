FROM node:6.11.1

RUN npm i -g nodemon

COPY . /deja-vu/backend/
WORKDIR /deja-vu/backend/
CMD [ "nodemon", "server.js", "--exec", "babel-node", "--presets", "es2015,stage-0" ]
