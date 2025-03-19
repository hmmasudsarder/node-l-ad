const { StringDecoder } = require("string_decoder");
const handler = {};

handler.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;

  const docoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("end", () => {
    realDate += decode.end();
    console.log(realData);
    res.end("Hello, World!");
  });
};

module.exports = handler;
