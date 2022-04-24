//Importing modules http, os, fs
const http = require('http');
const os = require('os');
const fs = require('fs');

//Initializing port
const port = 4000;

//defining server
const server = http.createServer((req,res) => {
    const url = req.url;

    if(url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('pages/index.html', (err,data) => {
            if(err){
                res.statusCode = 404;
                res.write('File not found');
            } else{
                res.write(data);
            } 
        
            res.end();

        });
        
    } else if(url === '/about'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('pages/about.html', (err,data) => {
            res.write(data);
            res.end();
        });
    } else if (url === '/sys'){
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');
        res.write('Your OS info has been saved successfully');
        res.end()
     }else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('pages/404.html', (err,data) => {
            res.write(data);
            res.end();
        });
    }
});


// Starting server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

let osinfo = {
    hostname: os.hostname(),
    platform: os.platform(),
    architecture: os.arch(),
    numberOfCPUS: os.cpus().length,
    networkInterfaces: os.networkInterfaces(),
    uptime: os.uptime(),
};
// console.log(osinfo);

const osinfoData = JSON.stringify(osinfo);
console.log(osinfoData);

fs.writeFile('osinfo.json', osinfoData, 'utf8', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('osinjo.json is saved successfully');
    }
});
