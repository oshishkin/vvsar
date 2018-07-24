#!/usr/bin/env node
import express from 'express';
import moment from 'moment';

import { generateObj } from './src/utils/svgUtil';
import { requestStopInfo, requestWeatherInfo } from './src/utils/triasUtil';

const httpPort = process.env.PORT || 7654;
const app = express();
app.use (function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
       data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});

const GTFS_STOPS = [{
    stop_id:"de:08111:6018:0:4",
    stop_name:"Nobelstraße",
    stop_lat:48.740356600365,
    stop_lon:9.10019824732889
}];

app.use(express.static('public'));

app.get("/api/stop", (req, res) => {
	console.log("Body:");
	console.log(req.body);
	console.log("query:");
	console.log(req.query);
	console.log("headers:");
	console.log(req.headers);
    requestStopInfo({
        LocationRef: {
            StopPointRef: GTFS_STOPS[0].stop_id
        }
    }).then(value =>{
        const now = moment();
        let maxTimeToBus = 1;
		value.refreshRate=1;
        value.timetable = value.timetable.slice(0, 4);
        value.timetable = value.timetable.map(current=>{
            current.timetobus = Math.floor(moment(moment(current.departureTime)-now)/1000/60);
            maxTimeToBus = maxTimeToBus<current.timetobus?current.timetobus:maxTimeToBus;
            return current;
        });
        var colors=['#05ff46','#ffd905','#ff7805','#05ecff','#00f0ba','#00f0ba','#00f0ba','#00f0ba'];
        value.timetable = value.timetable.map(function(current,idx){
            current.progress = 100-current.timetobus/maxTimeToBus*100;
            current.maxTime = maxTimeToBus;
            current.type = current.lineType;
            current.departureTime = current.timetobus;
            current.lineColor = colors[idx];
            return current;
        });

        value.weather = requestWeatherInfo({lat:GTFS_STOPS[0].stop_lat, lng:GTFS_STOPS[0].stop_lon});
        // console.log(value);
        res.send(value);
    });
});

app.post("/api/stop", (req, res) => {
	console.log("Body:");
	console.log(req.body);
	console.log("query:");
	console.log(req.query);
	console.log("headers:");
	console.log(req.headers);
    requestStopInfo({
        LocationRef: {
            StopPointRef: GTFS_STOPS[0].stop_id
        }
    }).then(value =>{
        const now = moment();
        let maxTimeToBus = 1;
		value.refreshRate=1;
        value.timetable = value.timetable.slice(0, 4);
        value.timetable = value.timetable.map(current=>{
            current.timetobus = Math.floor(moment(moment(current.departureTime)-now)/1000/60);
            maxTimeToBus = maxTimeToBus<current.timetobus?current.timetobus:maxTimeToBus;
            return current;
        });
        var colors=['#05ff46','#ffd905','#ff7805','#05ecff','#00f0ba','#00f0ba','#00f0ba','#00f0ba'];
        value.timetable = value.timetable.map(function(current,idx){
            current.progress = 100-current.timetobus/maxTimeToBus*100;
            current.maxTime = maxTimeToBus;
            current.type = current.lineType;
            current.departureTime = current.timetobus;
            current.lineColor = colors[idx];
            return current;
        });

        value.weather = requestWeatherInfo({lat:GTFS_STOPS[0].stop_lat, lng:GTFS_STOPS[0].stop_lon});
        // console.log(value);
        res.send(value);
    });
});

app.get("/test.svg", (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    requestStopInfo({
        LocationRef: {
            StopPointRef: GTFS_STOPS[0].stop_id
        }
    }).then((value) => {
        const now = moment();
        let maxTimeToBus = 1;
        value.timetable = value.timetable.slice(0, 4);
        value.timetable = value.timetable.map((current)=>{
            current.timetobus = Math.floor(moment(moment(current.departureTime)-now)/1000/60);
            maxTimeToBus = maxTimeToBus<current.timetobus?current.timetobus:maxTimeToBus;
            return current;
        });
        var colors=['#05ff46','#ffd905','#ff7805','#05ecff','#00f0ba','#00f0ba','#00f0ba','#00f0ba'];

        value.timetable = value.timetable.map(function(current,idx){
            current.progress = 100-current.timetobus/maxTimeToBus*100;
            current.maxTime = maxTimeToBus;
            current.type = current.lineType;
            current.departureTime = current.timetobus;
            current.lineColor = colors[idx];
            return current;
        });

        value.weather = requestWeatherInfo({lat:GTFS_STOPS[0].stop_lat, lng:GTFS_STOPS[0].stop_lon});

        res.send(generateObj(value));
    });
});

app.listen(httpPort, () => {
    console.info("App is running at port "+httpPort); 
})
