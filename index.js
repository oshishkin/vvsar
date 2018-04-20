var body = '<?xml version="1.0" encoding="UTF-8"?>'+
'<Trias version="1.1" xmlns="http://www.vdv.de/trias" xmlns:siri="http://www.siri.org.uk/siri">'+
'<ServiceRequest>'+
'<siri:RequestTimestamp>2018-04-20T20:30:00</siri:RequestTimestamp>'+
'<siri:RequestorRef>fraunhofer</siri:RequestorRef>'+
'<RequestPayload>'+
'<StopEventRequest>'+
'<Location><LocationRef>'+
//'<StopPointRef>de:08111:6008:1:1</StopPointRef>'+  //Uni
'<StopPointRef>de:08111:6018:0:4</StopPointRef>'+    // Nobelstr

//'<GeoPosition>'+
//'<Longitude>9.15949</Longitude>'+
//'<Latitude>48.77080</Latitude>'+

//'<Longitude>9.10583696296453</Longitude>'+
//'<Latitude>48.7450905386822</Latitude>'+
//'</GeoPosition>'+
//'<LocationName>'+
//'<Text>Wangener-/Landhausstraße</Text>'+
//'</LocationName>'+
'</LocationRef></Location>'+
'<Params>'+
'<NumberOfResults>4</NumberOfResults>'+
'<StopEventType>departure</StopEventType>'+
//'<PtModeFilter>Bus</PtModeFilter>'+
//'<BusSubmode>localBus</BusSudmode>'+
'</Params>'+
'</StopEventRequest>'+
'</RequestPayload>'+
'</ServiceRequest>'+
'</Trias>';


let http = require('http');
let xml2js = require('xml2js');
var parser = new xml2js.Parser();
const util = require('util')

var postRequest = {
    host: "efastatic.vvs.de",
    path: "/makeathon/trias",
    port: 80,
    method: "POST",
    headers: {
        'Cookie': "cookie",
        'User-Agent': 'Fiddler',
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(body)
    }
};

var buffer = "";

var req = http.request( postRequest, function( res )    {

   console.log( res.statusCode );
   var buffer = "";
   res.on( "data", function( data ) { buffer = buffer + data; } );
   res.on( "end", function(  ) { 

        parser.parseString(buffer, function (err, result) {

            let resultArr = result.Trias.ServiceDelivery[0].DeliveryPayload[0].StopEventResponse[0].StopEventResult;

            for (i=0; i<4; i++)
            {
                

                let stopEvent = resultArr[i].StopEvent[0];
                let stopData = stopEvent.ThisCall[0].CallAtStop;
                let serviceData = stopEvent.Service[0];

                //console.log(util.inspect(serviceData,false, null));

                console.log(">>>>>");
                console.log("Stop Name: "+stopData[0].StopPointName[0].Text);
                console.log("Departure time: "+stopData[0].ServiceDeparture[0].TimetabledTime);
                console.log("Linie Name: "+serviceData.Mode[0].Name[0].Text+" "+serviceData.PublishedLineName[0].Text);
                console.log("Linie Description: "+serviceData.RouteDescription[0].Text);

            }

            console.log('Done');
        });   


        //console.log( buffer ); 
    } );

});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write( body );
req.end();