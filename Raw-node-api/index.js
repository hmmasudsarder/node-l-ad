const http = require("http");
const { decode } = require("punycode");

import {handleReqRes} from require("./helpers/handleReqRes");

const app = {};

app.config = {
  port: 5000,
};

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`Server is listening on port ${app.config.port}`);
  });
};

app.handler = handleReqRes;

app.createServer();
