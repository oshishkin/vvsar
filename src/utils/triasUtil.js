import http from 'http';
import request from 'sync-request';
import json2xml from 'json2xml';
import xml2js from 'xml2js';
import util from 'util';
import moment from 'moment';

var parser = new xml2js.Parser();

const k = 273.15;

export function requestStopInfo(reqData, cbFunction){
    var body = json2xml({
        Trias: {
            ServiceRequest:{
                "siri:RequestTimestamp":getDate(),
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
    var httpPromise = new Promise(function(resolve, reject) {
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
                        // console.log("Stop event=="+util.inspect(mappedResult,false, null));
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
    return httpPromise;  

}

export function requestWeatherInfo(latlng) {
    var url;
    url = 'http://api.openweathermap.org/data/2.5/weather/?appid=7b6e364a6ea88bdfd9ab285f380cb898&lat=' + latlng.lat + '&lon=' + latlng.lng;
    var currentWeather = JSON.parse(request('GET', url).body.toString('utf-8'));
    console.log(currentWeather);
    //hack here. sunrise and sunset temp is mocked up
    var val = { now: { temp: currentWeather.main.temp - k, conditions: currentWeather.weather[0].main }, sunrise: { time: getTime(currentWeather.sys.sunrise * 1000), temp: currentWeather.main.temp - k - 1, conditions: currentWeather.weather[0].main }, sunset: { time: getTime(currentWeather.sys.sunset * 1000), temp: currentWeather.main.temp - k - 2, conditions: currentWeather.weather[0].main } };
    console.log(val);
    return val;
}

export function getDate() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds;
}

export function getTime(unixts){
    var date = moment(unixts).utcOffset(+2).format("HH:mm");// new Date(unixts);
    return date;
}