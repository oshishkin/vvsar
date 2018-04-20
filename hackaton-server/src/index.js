const express = require('express');

const xml2js = require ('xml2js');
const fs = require('fs');

const http = require('http');

var input = fs.createReadStream('../req.xml');


function getIpAddrDecode(xmlString) {
    console.log("Requesting tias");
    return http.get({
        host: 'ip-api.com',
        path: '/json/' + item.addr
    }, function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            item.ipdecode = parsed;
            item.lat = parsed.lat;
            item.lng = parsed.lon;
        });
    });

};




const app = express();

// api sample
app.get("/api", (req, res) => {
    res.send({data: 12345})
});

// api sample
app.get("/triastest", (req, res) => {
   
   
   
    res.send({data: 'hui'});
});


app.listen(8080, () => {
    console.info("App is running at port 8080");
})