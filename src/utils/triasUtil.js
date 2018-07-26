import http from 'http';
import request from 'sync-request';
import json2xml from 'json2xml';
import xml2js from 'xml2js';
import util from 'util';
import moment from 'moment';

var parser = new xml2js.Parser();

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
    var tzOffset=2;
    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather/?appid=7b6e364a6ea88bdfd9ab285f380cb898&units=metric&lat=' + latlng.lat + '&lon=' + latlng.lng;
    var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?appid=7b6e364a6ea88bdfd9ab285f380cb898&lat='+latlng.lat+'&lon='+latlng.lng+'&units=metric&cnt=8';
    var currentWeather = JSON.parse(request('GET', weatherUrl).body.toString('utf-8'));
    var forecastWeather = JSON.parse(request('GET', forecastUrl).body.toString('utf-8'));
    
    //console.log(currentWeather);
    var val = { 
                now: { temp: '-', conditions: 'Clear' }, 
                sunrise: { time: 0, temp: '-', conditions: 'Clear' }, 
                sunset: { time: 0, temp: '-', conditions: 'Clear' } 
            };
    
    if(currentWeather && currentWeather.weather && currentWeather.weather.length>0){
        val.now = { temp: Math.round(currentWeather.main.temp), conditions: currentWeather.weather[0].main };
    }

    if(forecastWeather && forecastWeather.list && forecastWeather.list.length>0){
        var d1 = forecastWeather.list.reduce((prev, current) => (prev.main.temp > current.main.temp) ? prev : current);
        var d2 = forecastWeather.list.reduce((prev, current) => (prev.main.temp <= current.main.temp) ? prev : current);
        if(d1.dt>d2.dt){
            const temp = d1;
            d1 = d2;
            d2 = temp;
        }
        val.sunrise = { time: getTimeByOffset(d1.dt * 1000, tzOffset), temp: Math.round(d1.main.temp), conditions: d1.weather[0].main};//+(d1.sys.pod=='n' ? '-Night' : '') };
        val.sunset = { time: getTimeByOffset(d2.dt * 1000, tzOffset), temp: Math.round(d2.main.temp), conditions: d2.weather[0].main};//+(d2.sys.pod=='n' ? '-Night' : '')};
        //var val = { now: { temp: currentWeather.main.temp, conditions: currentWeather.weather[0].main }, sunrise: { time: getTime(currentWeather.sys.sunrise * 1000), temp: currentWeather.main.temp - 1, conditions: currentWeather.weather[0].main }, sunset: { time: getTime(currentWeather.sys.sunset * 1000), temp: currentWeather.main.temp - 2, conditions: currentWeather.weather[0].main } };
    }
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
    return getTimeByOffset(unixts, 2);
}

export function getTimeByOffset(unixts, offset){
    var date = moment(unixts).utcOffset(offset).format("HH:mm");// new Date(unixts);
    return date;
}