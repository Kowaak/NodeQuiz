const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const filePath = './plik.html';
  const header = 'Home page';

  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      res.statusCode = 500;
      res.end(err.message);
      return;
    }

    html = html.replace('{ Header }', header);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });
}).listen(3000);

// URL
// http://localhost:3000