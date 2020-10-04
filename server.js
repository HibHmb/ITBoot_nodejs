const http = require("http");
const fs = require("fs");
const readline = require("readline");
const updateResponseEmpInfo = require("./getEmpInfo");
const port = 3000;

var sarver = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      fs.readFile("./html/index.html", "utf-8", doReadTableData);

      function doReadTableData(err, data) {
        updateResponseEmpInfo(res, data);
      }

      break;
    case "/html/gausu.png":
      getImage(res, "./html/gausu.png");
      break;
    default:
      break;
  }
});

sarver.listen(port);

function getImage(res, imgUrl) {
  const image = fs.readFileSync(imgUrl);

  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image);
}
