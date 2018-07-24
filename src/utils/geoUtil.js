const coordsUtils = () => {
    const utils = {
        /**
          * @param {*} deg - The degrees to be converted into radians
          * @return radians
          */
        toRad : (deg) => deg * Math.PI / 180,
         /**
          * @param {*} rad - The radians to be converted into degrees
          * @return degrees
          */
        toDeg : (rad) => rad * 180 / Math.PI,
    };

    return {
        /**
         * @param {*} lat1 - The latitude of the first position
         * @param {*} lng1 - The longitude of the first position
         * @param {*} lat2 - The latitude of the second position
         * @param {*} lng2 - The longitude of the second position
         * @return int - The bearing between 0 and 360
         */
        bearing : (lat1, lng1, lat2, lng2) => {
            const dLon = (lng2 - lng1);
            const y = Math.sin(dLon) * Math.cos(lat2);
            const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            const bearing = utils.toDeg(Math.atan2(y, x));
            return 360 - ((bearing + 360) % 360);
        },

        /**
         * @param {*} lat1 - The latitude of the first position
         * @param {*} lng1 - The longitude of the first position
         * @param {*} lat2 - The latitude of the second position
         * @param {*} lng2 - The longitude of the second position
         * @return int - Distance in metres
         */
        distance : (lat1, lng1, lat2, lng2) => {
            const R = 6371e3; // Radius of the earth in metres
            const dLat = utils.toRad(lat2 - lat1);  // utils.toRad below
            const dLon = utils.toRad(lng2 - lng1); 
            const a = 
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(utils.toRad(lat1)) * Math.cos(utils.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ; 
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
            const d = R * c; // Distance in metres
            return d;
        },
    }
}

/**
 * @param {*} stops 
 * @param {*} point 
 * @param {*} bearing
 * @return object - stop that is closest to point
 */
export const getClosestStop = (stops, {lat, lng}, bearing) => (
    stops
        // filter by delta in bearings < 78 / 2
        .filter((s) => Math.abs(coordsUtils.bearing(lat, lng, s.lat, s.lng) - bearing) < 78 / 2)
        // add distance from point to each stop
        .map((s) => ({...s, distance: coordsUtils.distance(s.lat, s.lng, lat, lng)}))
        // find closest stop by distance
        .reduce((res, s) => (
            res == null ? s
                : s.distance <= res.distance ? s : res
        ), null)
);