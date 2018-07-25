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
const getDbStops = async () => {
    if(dbStops == undefined){
        dbStops = (await pool.query('SELECT STOP_ID,STOP_NAME,STOP_LAT as lat,STOP_LON as lng from GTFS_STOPS')).rows;
    }
    return dbStops;
}

getDbStops().then(ok=>{console.log(ok)});