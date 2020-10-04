const http = require('http');
const fs = require('fs');
const readline = require("readline");
const port = 3000;

var sarver = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            fs.readFile('./html/index.html',"utf-8",doReadTableData);
            
            function doReadTableData(err,data) {
              let changeData="";

              const stream = fs.createReadStream("./sample-data.csv");
              const reader = readline.createInterface({input:stream}); 

              let isHeader = true;
              reader.on("line", (line)=>{
                tableTag = isHeader ? "th" : "td";
                changeData = changeData + `<tr><${tableTag}>`+
                line.replace(/,/g,`</${tableTag}><${tableTag}>`)+
                `</${tableTag}></tr>`;
                isHeader = false; 
              });

              reader.on("close",()=>{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data.replace("tabledate", changeData))
                res.end();
              });
            }; 

            
          break;
        case '/html/gausu.png':  
          getImage(res, './html/gausu.png');
          break;
        default:
          break;
      }

    
});

sarver.listen(port);



function getImage(res, imgUrl){
    const image = fs.readFileSync(imgUrl);

    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(image);
}