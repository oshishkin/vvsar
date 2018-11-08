const request = require('sync-request');
const json2xml = require('json2xml');
const xml2js = require('xml2js');
const moment = require('moment');
const { getDbRoutes } = require('./dbUtil');

const xmlToJSON = async function (xml) {
    var xmlParser = new xml2js.Parser();
    return new Promise(function (resolve, reject) {
        xmlParser.parseString(xml, function (err, result) {
            resolve(result);
        });
    });
}

async function requestStopsInfo(stops) {
    var timetable = [];
    // var tt,
    var i;
    for (i = 0; i < stops.length; i++) {
        var tt = await requestStopInfo(stops[i]);
        timetable = timetable.concat(tt.timetable);
    }
    timetable = timetable
        //sort by departure time
        .sort(function (a, b) {
            return a.departureTimeUnix - b.departureTimeUnix
        })
        //leave just 20 buses
        .reduce((acc, s, index) => {
            if (index < 20) {
                acc.push(s);
            }
            return acc;
        }, []);
    var resp = {
        stationName: stops[0]==undefined?'':stops[0].stop_name,
        timetable: timetable
    };
    console.info("requestStopsInfo num of results=",resp.timetable.length);
    console.debug("requestStopsInfo ",resp);
    return resp;
}

async function requestStopInfo(stop) {
    var body = buildTriasRequest(stop);
    console.debug("Get stop schedule for:", stop);
    var postRequest = {
        host: "efastatic.vvs.de",
        path: "/makeathon/trias",
        port: 80,
        method: "POST",
        headers: {
            'Cookie': "MOAR cookies!!! O_o",
            'User-Agent': 'Fiddler',
            'Content-Type': 'text/xml',
            'Content-Length': Buffer.byteLength(body)
        }
    };
    var resp = request('POST', "http://efastatic.vvs.de/makeathon/trias", {
        headers: {

            'Cookie': "MOAR cookies!!! O_o",
            'User-Agent': 'Fiddler',
            'Content-Type': 'text/xml',
            'Content-Length': Buffer.byteLength(body)
        },
        'body': body

    }).body.toString('utf-8');
    let resultArr = (await xmlToJSON(resp)).Trias.ServiceDelivery[0].DeliveryPayload[0].StopEventResponse[0].StopEventResult;

    const allRoutes = await getDbRoutes();

    var mappedResult = resultArr.map(function (current) {
        return {
            departureTime: current.StopEvent[0].ThisCall[0].CallAtStop[0].ServiceDeparture[0].TimetabledTime[0],
            departureTimeUnix: moment(current.StopEvent[0].ThisCall[0].CallAtStop[0].ServiceDeparture[0].TimetabledTime[0]).unix(),
            lineType: current.StopEvent[0].Service[0].Mode[0].Name[0].Text[0],
            lineName: current.StopEvent[0].Service[0].PublishedLineName[0].Text[0],
            routeDescription: current.StopEvent[0].Service[0].RouteDescription[0].Text[0],
            startName: current.StopEvent[0].Service[0].OriginText[0].Text[0],
            stopName: current.StopEvent[0].Service[0].DestinationText[0].Text[0],
            lineColor: allRoutes.reduce((acc, curr) => {
                if (curr.linename == current.StopEvent[0].Service[0].PublishedLineName[0].Text[0]) {
                    return curr.color;
                } else {
                    return acc;
                }

            }, "#00FF00")
        };
    });

    return {
        stationName: resultArr[0].StopEvent[0].ThisCall[0].CallAtStop[0].StopPointName[0].Text[0],
        timetable: mappedResult
    };
}

function requestWeatherInfo(latlng) {
    var tzOffset=1;
    var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather/?appid=7b6e364a6ea88bdfd9ab285f380cb898&units=metric&lat=' + latlng.lat + '&lon=' + latlng.lng;
    var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?appid=7b6e364a6ea88bdfd9ab285f380cb898&lat='+latlng.lat+'&lon='+latlng.lng+'&units=metric&cnt=8';
    var currentWeather = JSON.parse(request('GET', weatherUrl).body.toString('utf-8'));
    var forecastWeather = JSON.parse(request('GET', forecastUrl).body.toString('utf-8'));
    
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
        val.sunrise = { time: getTimeByOffset(d1.dt * 1000, tzOffset), temp: Math.round(d1.main.temp), conditions: d1.weather[0].main+(d1.sys.pod=='n' ? '-Night' : '') };
        val.sunset = { time: getTimeByOffset(d2.dt * 1000, tzOffset), temp: Math.round(d2.main.temp), conditions: d2.weather[0].main+(d2.sys.pod=='n' ? '-Night' : '')};
        //var val = { now: { temp: currentWeather.main.temp, conditions: currentWeather.weather[0].main }, sunrise: { time: getTime(currentWeather.sys.sunrise * 1000), temp: currentWeather.main.temp - 1, conditions: currentWeather.weather[0].main }, sunset: { time: getTime(currentWeather.sys.sunset * 1000), temp: currentWeather.main.temp - 2, conditions: currentWeather.weather[0].main } };
    }
    return val;
}

function getDate() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds;
}

function getTime(unixts) {
    return getTimeByOffset(unixts, 2);
}

function getTimeByOffset(unixts, offset) {
    var date = moment(unixts).utcOffset(offset).format("HH:mm"); // new Date(unixts);
    return date;
}



const buildTriasRequest = (stop) => {
    var req = {
        attr: {
            version: "1.1",
            xmlns: "http://www.vdv.de/trias",
            "xmlns:siri": "http://www.siri.org.uk/siri"
        },
        Trias: {
            ServiceRequest: {
                "siri:RequestTimestamp": getDate(),
                "siri:RequestorRef": "fraunhofer",
                RequestPayload: {
                    StopEventRequest: {
                        Location: {
                            LocationRef: {
                                StopPointRef: stop.stop_id
                            }
                        },
                        Params: {
                            NumberOfResults: 10,
                            StopEventType: "departure",
                            PtModeFilter: "Bus",
                            BusSubmode: "localBus"
                        }
                    }
                }
            }
        }
    };
    var body = json2xml(req, {
        attributes_key: 'attr',
        header: true
    });

    return body;
};

module.exports = {
    requestStopsInfo, requestWeatherInfo, getDate,
    getTime, getTimeByOffset, 
}