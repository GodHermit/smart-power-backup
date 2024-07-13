const http = require('http');
const { SettingsHTTP } = require('../api/settings/index.js');
const { StatusHTTP } = require('../api/status/index.js');
const { UserHTTP } = require('../api/user/index.js');

export const serverConfig = {
  port: 80
};

export async function startServer() {

  const server = http.createServer(async (req, res) => {
    console.log(`Request path: ${req.method} ${req.url}`);
    if (req.url.startsWith('/api')) {
      let response;
      try {
        switch (req.url) {
          case '/api/settings':
            response = await SettingsHTTP(req, res);
            break;
          case '/api/status':
            response = await StatusHTTP(req, res);
            break;
          case '/api/user':
            response = await UserHTTP(req, res);
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(error);
        res.writeHead(500, 'Internal Server Error');
        res.end();
        return;
      }

      if (!response) {
        res.writeHead(404, 'Not Found');
        res.write('Not Found');
        res.end();
        return;
      }

      let body = JSON.stringify(response.body);

      if (!body) {
        res.writeHead(404, 'Not Found');
        res.write('Not Found');
        res.end();
        return;
      }

      res.writeHead(response.statusCode, 'OK', {
        'Content-Type': 'application/json',
        'content-length': body.length
      });
      res.write(body);
      res.end();
      return;
    }
    var message = '<h1>Hello</h1>';
    res.writeHead(200, 'OK', {
      'Content-Type': 'text/html',
      'Content-Length': message.length,
    });
    res.write(message);
    res.end();
  });

  server.listen(serverConfig.port, () => {
    console.log(`Server started on ${server._dev.ip}:${serverConfig.port}`);
  });
}
