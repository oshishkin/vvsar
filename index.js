let http = require('http');
let json2xml = require('json2xml'); 
let xml2js = require('xml2js');
var parser = new xml2js.Parser();
const util = require('util')
var express = require('express');
    
const app = express();


app.use('/', express.static('public'));
app.route('/').get(function (req, res) {
    res.redirect('./index.html');
});
            

function requestTriasApi(reqData, cbFunction){
    var body = json2xml({
        Trias: {
            ServiceRequest:{
                "siri:RequestTimestamp":"2018-04-20T20:30:00",
                "siri:RequestorRef":"fraunhofer",
                RequestPayload:{
                    StopEventRequest:{
                        Location:reqData,
                        Params:{
                            NumerOfResults:20,
                            StopEventType:"departure",
                            PtModeFilter:"Bus",
                            BusSubmode:"localBus"
                        }
                    }
                }
            }
        
        },
        attr: {
            version: "1.1",
            xmlns: "http://www.vdv.de/trias",
            "xmlns:siri": "http://www.siri.org.uk/siri"
        }
    }, {
        attributes_key: 'attr',
        header: true
    }); 
    
    console.log(body);
    var postRequest = {
        host: "efastatic.vvs.de",
        path: "/makeathon/trias",
        port: 80,
        method: "POST",
        headers: {
            'Cookie': "cookie",
            'User-Agent': 'Fiddler',
            'Content-Type': 'text/xml',
            'Content-Length': Buffer.byteLength(body)
        }
    };
    var req = http.request( postRequest, function( res )    {

    console.log( res.statusCode );
        var buffer = "";
        res.on( "data", function( data ) { buffer = buffer + data; } );
        res.on( "end", function(  ) { 
     
             parser.parseString(buffer, function (err, result) {
     
                let resultArr = result.Trias.ServiceDelivery[0].DeliveryPayload[0].StopEventResponse[0].StopEventResult;
                var mappedResult = resultArr.map(function(current){
                    return {
                        nextStopName: current.StopEvent[0].ThisCall[0].CallAtStop[0].StopPointName[0].Text[0],
                        departureTime: current.StopEvent[0].ThisCall[0].CallAtStop[0].ServiceDeparture[0].TimetabledTime[0],
                        lineType:current.StopEvent[0].Service[0].Mode[0].Name[0].Text[0],
                        lineName:current.StopEvent[0].Service[0].PublishedLineName[0].Text[0],
                        routeDescription:current.StopEvent[0].Service[0].RouteDescription[0].Text[0]
                    };
                });
                console.log("Stop event=="+util.inspect(mappedResult,false, null));
                cbFunction(mappedResult);
             });   
     
     
             //console.log( buffer ); 
         } );
     
     });
     
     req.on('error', function(e) {
         console.log('problem with request: ' + e.message);
     });
     
     req.write( body );

}

app.get("/api", (req, res) => {
    requestTriasApi({LocationRef:{
        StopPointRef:"de:08111:6018:0:4"
    }},function(value){
        console.log(value);
        res.send(value)
    });     
    
});

app.use(express.static('public'));

app.get("/renderimage.svg", (req, res) => {
    console.log(req.params.text);
    res.setHeader('content-type', 'image/svg+xml')
    res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">
            <foreignObject width="100%" height="100%">
                <div style="font-size: 40px;" xmlns="http://www.w3.org/1999/xhtml">
                    <em>I</em>
                    like
                    <span style="color: white; text-shadow: 0 0 2px black;" id="like">cheese</span>
                </div> 
            </foreignObject>
        </svg>`)
})

app.listen(80, () => {
    console.info("App is running at port 80"); 
})