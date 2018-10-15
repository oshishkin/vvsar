#!/usr/bin/env node
const express = require('express');
const moment = require('moment');
const coordsTolerance = 10;
const { requestStopsInfo, requestWeatherInfo } = require('./src/utils/triasUtil');
const { getClosestStopAlg2 } = require('./src/utils/geoUtil');
const { getDbStops, insertClosestStopRequest, tailClosestStopRequests } = require('./src/utils/dbUtil');

const httpPort = process.env.PORT || 7654;
const app = express();

app.use(function (req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        data += chunk;
    });

    req.on('end', function () {
        req.body = data;
        next();
    });
});

function getReqCoords(req) {
    console.info('Query:',req.query);
    console.info('Body:',req.body);
    console.info('Headers:',req.headers);
    var reqCoords;
    var body = req.body;
    body=body.replace('"latitude"','latitude');body=body.replace('latitude','"latitude"');
    body=body.replace('"longitude"','longitude');body=body.replace('longitude','"longitude"');
    body=body.replace('"heading"','heading');body=body.replace('heading','"heading"');
    body=body.replace('"precision"','precision');body=body.replace('precision','"precision"');
    
    try {
        reqCoords = JSON.parse(body);
    } catch (error) {
        try {
            reqCoords = JSON.parse(req.query.val);
        } catch (error) {
            console.error("Error getting coords from request",error);
        }
    }
    reqCoords.precision = reqCoords.precision+coordsTolerance;
    console.info("getReqCoords",reqCoords);
    return reqCoords;
}

async function getClosestStops(reqCoords) {
    const allStops = await getDbStops();

    const filteredStops = getClosestStopAlg2(allStops, reqCoords);
    // [{"stop_id":"de:08111:2488:0:3","stop_name":"Nobelstraße","lat":48.740356600365,"lng":9.10019824732889,"distance":0}];
    console.info("getClosestStops", reqCoords, filteredStops);
    insertClosestStopRequest(reqCoords, filteredStops);

    // const value = await requestStopsInfo(filteredStops); 
    return filteredStops;
}

app.use(express.static('public'));

var rt = 0;
const compileResponce = async (value) => {
    const now = moment();

    let maxTimeToBus = 1;
    rt = (rt + 1) % 2;
    value.refreshRate = 3;
    // value.refreshRate = 1 + rt * 10;
    value.timetable = value.timetable; //.slice(0, 4);
    console.debug("compile responce", value);
    value.timetable = value.timetable.map(current => {
        current.timetobus = Math.floor(moment(moment(current.departureTime) - now) / 1000 / 60);
        maxTimeToBus = maxTimeToBus < current.timetobus ? current.timetobus : maxTimeToBus;
        return current;
    });


    value.timetable = value.timetable.map(function (current, idx) {
        current.progress = 100 - current.timetobus / maxTimeToBus * 100;
        current.maxTime = maxTimeToBus;
        current.type = current.lineType;
        current.departureTime = current.timetobus;
        // current.lineColor = colors[idx];
        return current;
    });



    return value;
}


const handleStopRequest = async (req, res) => {
    var reqCoords = getReqCoords(req);

    var closestStops = await getClosestStops(reqCoords);
    var value = await requestStopsInfo(closestStops); //.then(value =>{
    value = await compileResponce(value);
    value.weather = requestWeatherInfo({
        lat: reqCoords.latitude, // GTFS_STOPS[0].stop_lat,
        lng: reqCoords.longitude //GTFS_STOPS[0].stop_lon
    });
    res.send(value);

};

// handle stop request
app.get("/api/stop", handleStopRequest);
app.post("/api/stop", handleStopRequest);

app.get("/api/nearestStops", async (req, res) => {
    var reqCoords = getReqCoords(req);
    var closestStops = await getClosestStops(reqCoords);
    res.send(closestStops);
});

//
const handleLogsRequest = async (req, res) => {
    var values = await tailClosestStopRequests(req.query.cnt);
    res.send(
        values.reverse().map(({request, response, created_at}) => ({
            startTimeMs: created_at,
            data: [request, response]
        }))
    );
};
app.get("/api/lastpoints", handleLogsRequest);

app.listen(httpPort, () => {
    console.info("App is running at port " + httpPort);
})