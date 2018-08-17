// const { Client } = require('pg');

const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:vresSWTR@kemboo:5432/gtfs'

const pool = new Pool({
  connectionString: connectionString,
})

//  const dbStops = await .rows;
    //   console.log( dbStops);
    // export var data;
    var dbStops;
    export const getDbStops = async () => {
        if(dbStops == undefined){
            dbStops = (await pool.query('SELECT STOP_ID,STOP_NAME,STOP_LAT as lat,STOP_LON as lng from GTFS_STOPS where stop_id in(select distinct stop_id from gtfs_stop_times where trip_id in(select trip_id from gtfs_trips where route_id in(select  route_id from gtfs_routes where route_type=3)))')).rows;
        }
        return dbStops;
    }
        
    getDbStops();

    var dbRoutes;
    export const getDbRoutes = async () => {
        if(dbRoutes == undefined){
            dbRoutes = (await pool.query('SELECT ROUTE_SHORT_NAME as lineName,\'#\'||ROUTE_COLOR as color from GTFS_ROUTES')).rows;
        }
        return dbRoutes;
    }
        
    getDbRoutes();