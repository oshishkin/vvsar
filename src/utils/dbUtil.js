const { Pool } = require('pg');
const http = require('http');

const connectionString = 'postgresql://postgres:vresSWTR@kemboo:5432/gtfs'

const pool = new Pool({
  connectionString: connectionString,
})

let dbStops;
const getDbStops = async () => {
    if (dbStops == undefined){
        dbStops = (await pool.query('SELECT STOP_ID,STOP_NAME,STOP_LAT as lat,STOP_LON as lng from GTFS_STOPS where stop_id in(select distinct stop_id from gtfs_stop_times where trip_id in(select trip_id from gtfs_trips where route_id in(select  route_id from gtfs_routes where route_type=3 or route_type= 402)))')).rows;
    }
    return dbStops;
}

let dbRoutes;
const getDbRoutes = async () => {
    if (dbRoutes == undefined){
        dbRoutes = (await pool.query('SELECT ROUTE_SHORT_NAME as lineName,\'#\'||ROUTE_COLOR as color from GTFS_ROUTES')).rows;
    }
    return dbRoutes;
}

const insertClosestStopRequest = async (request, requestCorrected, response, createdAt = Date.now()) => {
    try {
        await pool.query(
            'INSERT INTO closest_stop_request(request, request_corrected, response, created_at) VALUES($1, $2, $3, $4)',
            [JSON.stringify(request), JSON.stringify(requestCorrected), JSON.stringify(response), createdAt]
        );
    } catch (err) {
        console.error(err);
    }
}

const tailClosestStopRequests = async (count = 10) => {
    const records = (await pool.query('SELECT id, request, request_corrected, response, created_at FROM closest_stop_request ORDER BY created_at DESC LIMIT $1', [count])).rows;
    return records;
}
    
getDbStops();
getDbRoutes();

module.exports = {
    getDbStops, getDbRoutes, insertClosestStopRequest, tailClosestStopRequests
}