var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
    //res.writeHead(200,{'content-type':'text/html'});
    //res.writeHead(200,{'content-type':'application/json'})
   
        var html = fs.readFileSync('./plik.html','utf8');
        var Header = 'Home page';
        html = html.replace('{ Header }',Header);
        //res.end(html);
        //res.writeHead(200);
    
    
    fs.createReadStream('./plik.html').pipe(res);
    //res.writeHead(200);
    res.end(html);
    
}).listen(3000);

// URL
// http://localhost:3000