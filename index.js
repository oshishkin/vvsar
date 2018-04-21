const httpPort = 80;
// const httpPort = 8085;
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
                        // nextStopName: current.StopEvent[0].ThisCall[0].CallAtStop[0].StopPointName[0].Text[0],
                        departureTime: current.StopEvent[0].ThisCall[0].CallAtStop[0].ServiceDeparture[0].TimetabledTime[0],
                        lineType:current.StopEvent[0].Service[0].Mode[0].Name[0].Text[0],
                        lineName:current.StopEvent[0].Service[0].PublishedLineName[0].Text[0],
                        routeDescription:current.StopEvent[0].Service[0].RouteDescription[0].Text[0],
                        startName:current.StopEvent[0].Service[0].OriginText[0].Text[0],
                        stopName:current.StopEvent[0].Service[0].DestinationText[0].Text[0]
                    };
                });
                console.log("Stop event=="+util.inspect(result,false, null));
                cbFunction({stationName:resultArr[0].StopEvent[0].ThisCall[0].CallAtStop[0].StopPointName[0].Text[0], timetable:mappedResult});
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
        value.timetable = value.timetable.slice(0,4);
        //hardcode FIXME
        value["weather"]={now: {temp: 21}, 
            sunrise: {time: '0:36', temp:16 }, 
            sunset: {time: '18:36', temp:13 }};
        console.log(value);
        res.send(value);
    });     
    
});

app.use(express.static('public'));

app.listen(httpPort, () => {
    console.info("App is running at port "+httpPort); 
})