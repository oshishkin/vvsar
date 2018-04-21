import express from 'express';
import { generateObj } from './utils/svgUtil';

const app = express();

// api sample
app.get("/api", (req, res) => {
    res.send({data: 12345})
});

app.get("/test.svg", (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    const jsonResponse = {
        stationName: 'Nobelstraße (Fraunhofer)', 
      weather: {
          now: {temp: 21}, 
        sunrise: {time: '0:36', temp:16 }, 
        sunset: {time: '18:36', temp:13 }
      },
      timetable: [
          { type:'Bus', lineName: '82', lineColor: '#2bfd53', startName: 'Rohr (-Leinfelden Bf)', stopName: 'Vaihingen Bf', departureTime: 4, maxTime: 10 },
        { type:'Bus', lineName: '84', lineColor: '#fed732', startName: 'Vaihingen Universitat', stopName: '', departureTime: 7, maxTime: 10 },
        { type:'Bus', lineName: '91', lineColor: '#fd7824', startName: 'Feuerebach Bf', stopName: 'Aspenwaldstraße', departureTime: 9, maxTime: 10 },
        { type:'Bus', lineName: '92', lineColor: '#2becfd', startName: 'Heslach Vogelrain', stopName: 'Rudolf-Sophien-Stift', departureTime: 10, maxTime: 10 },  
      ],
    };
    const svgObj = generateObj(jsonResponse);
    res.send(svgObj);
})

app.use(express.static('public'));

app.listen(8080, () => {
    console.info("App is running at port 8080");
})