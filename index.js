// import { resolve } from 'url';

const httpPort = 80;
// const httpPort = 8080;
let http = require('http');
var request = require('sync-request');
let json2xml = require('json2xml'); 
let xml2js = require('xml2js');
var parser = new xml2js.Parser();
const util = require('util')
var express = require('express');
const app = express();
const GTFS_STOPS = [{stop_id:"de:08111:6018:0:4", stop_name:"Nobelstraße", stop_lat:48.740356600365, stop_lon:9.10019824732889}];

app.use('/', express.static('public'));
app.route('/').get(function (req, res) {
    res.redirect('./index.html');
});
            

function requestStopInfo(reqData, cbFunction){
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
    var promise1 = new Promise(function(resolve, reject) {
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
                        console.log("Stop event=="+util.inspect(mappedResult,false, null));
                        resolve({stationName:resultArr[0].StopEvent[0].ThisCall[0].CallAtStop[0].StopPointName[0].Text[0], timetable:mappedResult});
                     });   
             
             
                     //console.log( buffer ); 
                 } );
             
             });
             
             req.on('error', function(e) {
                 console.log('problem with request: ' + e.message);
             });
             
             req.write( body );
             req.end();
                
    });
    return promise1;  

}

function requestWeatherInfo(latlng)
{
    // var currentWeather;
    // currentWeather = get('http://api.openweathermap.org/data/2.5/weather/?appid=7b6e364a6ea88bdfd9ab285f380cb898&lat=' + latlng.lat + '&lon='+latlng.lng);
    var currentWeather = JSON.parse(request('GET', 'http://api.openweathermap.org/data/2.5/weather/?appid=7b6e364a6ea88bdfd9ab285f380cb898&lat=' + latlng.lat + '&lon='+latlng.lng).body.toString('utf-8'));
    console.log(currentWeather);
    var weatherAtSunrise = JSON.parse(request('GET', 'http://api.openweathermap.org/data/2.5/weather/?appid=7b6e364a6ea88bdfd9ab285f380cb898&lat=' + latlng.lat + '&lon='+latlng.lng).body.toString('utf-8'));
    console.log(weatherAtSunrise);
}


// requestWeatherInfo({lat:48.740356600365, lng:9.10019824732889});

app.get("/api/stop", (req, res) => {
    requestStopInfo(
        {
            LocationRef: {
                StopPointRef: GTFS_STOPS[0].stop_id
            }
        }
    ).then(value =>{

        value.timetable = value.timetable.slice(0, 4);
        value["weather"] = {
            now: { temp: 21 },
            sunrise: { time: '0:36', temp: 16 },
            sunset: { time: '18:36', temp: 13 }
        };
        console.log(value);
        res.send(value);

    });
});


app.use(express.static('public'));

app.listen(httpPort, () => {
    console.info("App is running at port "+httpPort); 
})