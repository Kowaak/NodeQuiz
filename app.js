var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
    res.writeHead(200,{'content-type':'text/html'});
    res.writeHead(200,{'content-type':'application/json'})
    if (req.url === '/'){
        var html = fs.readFileSync('./plik.html','utf8');
        var Header = 'Home page';
        html = html.replace('{ Header }',Header);
        res.end(html);
        res.writeHead(200);
    }else if(req.url === '/product'){
        res.writeHead(200);
        res.end('Products');
    }else if(req.url === '/blog'){
        res.writeHead(200);
        res.end('Blog');
    }else{
        res.writeHead(404);
        res.end('404: Not found');
    }
    
    fs.createReadStream('./plik.html').pipe(res);
    res.writeHead(200);
    res.end(html);
    
}).listen(3000);