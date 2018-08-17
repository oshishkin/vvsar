#!/usr/bin/env node

import express from 'express';
import moment from 'moment';
const asyncHandler = require('express-async-handler');

import {
    generateObj
} from './src/utils/svgUtil';
import {
    requestStopsInfo,
    requestWeatherInfo
} from './src/utils/triasUtil';
import {
    getClosestStop,
    getClosestStopAlg2
} from './src/utils/geoUtil';
import {
    getDbStops
} from './src/utils/dbUtil';
import {
    requestLogs
} from './src/utils/logUtil';

import {
    configure,
    getLogger,
    addLayout
} from 'log4js';
addLayout('json', function (config) {
    return function (logEvent) {
        return JSON.stringify(logEvent) + ",";
    }
});
configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'json',
                separator: ','
            }
        },
        file: {
            type: 'file',
            filename: 'vvsar.log',
            layout: {
                type: 'json',
                separator: ','
            }

        }
    },
    categories: {
        default: {
            appenders: ['out', 'file'],
            level: 'info'
        }
    }
});
const log = getLogger('index.js');

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
    log.info('Query:',req.query);
    log.info('Body:',req.body);
    log.info('Headers:',req.headers);
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
            log.error("Error getting coords from request",error);
        }
    }
    log.info("getReqCoords",reqCoords);
    return reqCoords;
}

async function getClosestStops(reqCoords) {
    const allStops = await getDbStops();

    const filteredStops = //[{"stop_id":"de:08111:2488:0:3","stop_name":"Nobelstraße","lat":48.740356600365,"lng":9.10019824732889,"distance":0}];
    getClosestStopAlg2(allStops, reqCoords);
    log.info("getClosestStops",reqCoords,filteredStops);
    // const value = await requestStopsInfo(filteredStops); 
    return filteredStops;
}

app.use(express.static('public'));

var rt = 0;
const compileResponce = async (value) => {
    const now = moment();

    let maxTimeToBus = 1;
    rt = (rt + 1) % 2;
    //value.refreshRate = 1;
    value.refreshRate = 1 + rt * 10;
    value.timetable = value.timetable; //.slice(0, 4);
    log.debug("compile responce", value);
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


const handleStopRequest = asyncHandler(async (req, res) => {
    // console.log("Body:");
    // console.log(req.body);
    // console.log("query:");
    // console.log(req.query);
    // console.log("headers:");
    // console.log(req.headers);

    var reqCoords = getReqCoords(req);

    var closestStops = await getClosestStops(reqCoords);
    var value = await requestStopsInfo(closestStops); //.then(value =>{
    value = await compileResponce(value);
    value.weather = requestWeatherInfo({
        lat: reqCoords.latitude, // GTFS_STOPS[0].stop_lat,
        lng: reqCoords.longitude //GTFS_STOPS[0].stop_lon
    });
    res.send(value);

});

// handle stop request
app.get("/api/stop", handleStopRequest);
app.post("/api/stop", handleStopRequest);

app.get("/api/nearestStops", asyncHandler(async (req, res) => {
    var reqCoords = getReqCoords(req);
    var closestStops = await getClosestStops(reqCoords);
    res.send(closestStops);
}));

//
const handleLogsRequest = asyncHandler(async (req, res) => {
    var value = await requestLogs(req.query.cnt); //.then(value =>{
    res.send(value);
});
app.get("/api/lastpoints", handleLogsRequest);

app.listen(httpPort, () => {
    console.info("App is running at port " + httpPort);
})