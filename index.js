var body = '<?xml version="1.0" encoding="UTF-8"?>'+
'<Trias version="1.1" xmlns="http://www.vdv.de/trias" xmlns:siri="http://www.siri.org.uk/siri">'+
'<ServiceRequest>'+
'<siri:RequestTimestamp>2017-05-24T12:00:00</siri:RequestTimestamp>'+
'<siri:RequestorRef>fraunhofer</siri:RequestorRef>'+
'<RequestPayload>'+
'<StopEventRequest>'+
'<Location><LocationRef>'+
'<GeoPosition>'+
'<Longitude>9.15949</Longitude>'+
'<Latitude>48.77080</Latitude>'+
'</GeoPosition>'+
'<LocationName>'+
'<Text>Roteb¸hlstraﬂe</Text>'+
'</LocationName>'+
'</LocationRef></Location>'+
'<Params>'+
'<NumberOfResults>20</NumberOfResults>'+
'<StopEventType>departure</StopEventType>'+
'<PtModeFilter>Bus</PtModeFilter>'+
'<BusSubmode>localBus</BusSudmode>'+
'</Params>'+
'</StopEventRequest>'+
'</RequestPayload>'+
'</ServiceRequest>'+
'</Trias>';


let http = require('http');


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
   res.on( "end", function( data ) { console.log( buffer ); } );

});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write( body );
req.end();