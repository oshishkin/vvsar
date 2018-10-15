const { getLogger } = require('log4js');

const log = getLogger('geoUtil.js');
const sectorSize = 120;
const coordsUtilsFactory = () => {
    const utils = {
        /**
         * @param {*} deg - The degrees to be converted into radians
         * @return radians
         */
        toRad: (deg) => deg * Math.PI / 180,
        /**
         * @param {*} rad - The radians to be converted into degrees
         * @return degrees
         */
        toDeg: (rad) => rad * 180 / Math.PI,
    };

    return {
        /**
         * @param {*} lat1 - The latitude of the first position
         * @param {*} lng1 - The longitude of the first position
         * @param {*} lat2 - The latitude of the second position
         * @param {*} lng2 - The longitude of the second position
         * @return int - The bearing between 0 and 360
         */
        bearing: (lat1, lng1, lat2, lng2) => {
            const dLon = (lng2 - lng1);
            const y = Math.sin(dLon) * Math.cos(lat2);
            const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            const bearing = utils.toDeg(Math.atan2(y, x));
            // console.log(Math.abs(bearing));
            return ((bearing>0?0:360)+bearing);
        },

        /**
         * @param {*} lat1 - The latitude of the first position
         * @param {*} lng1 - The longitude of the first position
         * @param {*} lat2 - The latitude of the second position
         * @param {*} lng2 - The longitude of the second position
         * @return int - Distance in metres
         */
        distance: (lat1, lng1, lat2, lng2) => {
            const R = 6371e3; // Radius of the earth in metres
            const dLat = utils.toRad(lat2 - lat1); // utils.toRad below
            const dLon = utils.toRad(lng2 - lng1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(utils.toRad(lat1)) * Math.cos(utils.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c; // Distance in metres
            return d;
        },
    }
}

const coordsUtils = coordsUtilsFactory();


/**
 * @param {*} stops 
 * @param {*} point 
 * @param {*} bearing
 * @return object - stop that is closest to point
 */
const getClosestStop = (stops, reqCoords) => {
    return stops
        // filter by delta in bearings < 160 / 2
        .filter((s) =>{ 
            var stopHeading = coordsUtils.bearing(reqCoords.latitude, reqCoords.longitude, s.lat, s.lng);
            var userHeading = reqCoords.heading;
            var a1 = Math.abs(stopHeading-userHeading);
            a1 = a1>180?(360-a1):a1;
            
            log.debug(a1);
            return a1 <= (((reqCoords.heading == 0) ? 360 : 360) / 2);
        
        })
        // add distance from point to each stop
        .map((s) => {
            // console.log(coordsUtils().distance(s.lat, s.lng, lat, lng));
            return { ...s,
                distance: coordsUtils.distance(s.lat, s.lng, reqCoords.latitude, reqCoords.longitude)
            };
        })
        // aggregate closest stop by distance
        .reduce((acc, s) => {
            if (s.distance < (reqCoords.precision )) {
                acc.push(s);
            }
            return acc;
        }, [])
        //sort by distance
        .sort((a, b) => {
            return a.distance - b.distance
        })
        //leave 14 closest stops
        .reduce((acc, s, index) => {
            if (index < 14) {
                acc.push(s);
            }
            return acc;
        }, []);
};

/**
 * @param {*} stops 
 * @param {*} point 
 * @param {*} bearing
 * @return object - stop that is closest to point
 */
const getClosestStopAlg2 = (stops, reqCoords) => {
    reqCoords.sectorFilterEnabled = 0;
    reqCoords.sectorSize = sectorSize;
    var filteredStops = 
    stops
        // filter by delta in bearings < 160 / 2
        // add distance from point to each stop
        .map((s) => {
            // console.log(coordsUtils().distance(s.lat, s.lng, lat, lng));
            return { ...s,
                distance: coordsUtils.distance(s.lat, s.lng, reqCoords.latitude, reqCoords.longitude)
            };
        })
        // filter stops by tolerance
        .reduce((acc, s) => {
            if (s.distance < (reqCoords.precision )) {
                acc.push(s);
            }
            return acc;
        }, [])
        
        //sort by distance
        .sort((a, b) => {
            return a.distance - b.distance
        })
        //leave 14 closest stops
        .reduce((acc, s, index) => {
            if (index < 14) {
                acc.push(s);
            }
            return acc;
        }, []);
        
        if(filteredStops.length>1){
            // log.info('hello');
            var filteredStopsAndHeading = filteredStops
            .filter((s) =>{ 
                var stopHeading = coordsUtils.bearing(reqCoords.latitude, reqCoords.longitude, s.lat, s.lng);
                var userHeading = reqCoords.heading;
                var a1 = Math.abs(stopHeading-userHeading);
                a1 = a1>180?(360-a1):a1;
                
                log.info("Angle",a1);    
                
                return a1 <= (((reqCoords.heading == 0) ? 360 : sectorSize) / 2);
            });
            
            if (filteredStopsAndHeading.length>=1){
                reqCoords.sectorFilterEnabled = 1;
                filteredStops = filteredStopsAndHeading;
            }
        }

        return filteredStops;
};

module.exports = {
    getClosestStop, getClosestStopAlg2
}