const { Pool } = require('pg')
const connectionString = 'postgresql://postgres:vresSWTR@kemboo:5432/gtfs'

const pool = new Pool({
  connectionString: connectionString,
})

var dbStops;
const getDbStops = async () => {
    if (dbStops == undefined){
        dbStops = (await pool.query('SELECT STOP_ID,STOP_NAME,STOP_LAT as lat,STOP_LON as lng from GTFS_STOPS where stop_id in(select distinct stop_id from gtfs_stop_times where trip_id in(select trip_id from gtfs_trips where route_id in(select  route_id from gtfs_routes where route_type=3)))')).rows;
    }
    return dbStops;
}
    
getDbStops();

var dbRoutes;
const getDbRoutes = async () => {
    if (dbRoutes == undefined){
        dbRoutes = (await pool.query('SELECT ROUTE_SHORT_NAME as lineName,\'#\'||ROUTE_COLOR as color from GTFS_ROUTES')).rows;
    }
    return dbRoutes;
}

const insertClosestStopRequest = async (request, response) => {
    try {
        await pool.query('INSERT INTO closest_stop_request(request, response) VALUES($1, $2)', [JSON.stringify(request), JSON.stringify(response)]);
    } catch (err) {
        console.error(err);
    }
}

const tailClosestStopRequests = async (count = 10) => {
    const records = (await pool.query('SELECT request, response, created_at FROM closest_stop_request ORDER BY created_at DESC LIMIT $1', [count])).rows;
    return records;
}
    
getDbRoutes();

module.exports = {
    getDbStops, getDbRoutes, insertClosestStopRequest, tailClosestStopRequests
}