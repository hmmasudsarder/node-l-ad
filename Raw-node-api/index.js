const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// configuration
// app.config = {
//     port: 5000,
// };

data.create('test', 'newFile', { name: 'testFile', content: 'this is a test file' }, (err) => {
    if (!err) {
        console.log('File created successfully');
    } else {
        console.error('Error creating file:', err);
    }
});

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to port ${environment.port}`);
    });
};

// handle Request Response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();