const defaultDefs='<defs><style>'+
'.station-title { font-family: BloggerSans; font-size: 18px; font-weight: normal; font-style: normal; font-stretch: normal; letter-spacing: normal; text-align: left; fill: #00f0ba; } .station-info-element { font-family: BloggerSans; font-size: 13px; fill: #00f0ba; } .station-info-line-name { font-family: BloggerSans; font-size: 30px; fill: #00f0ba; } .station-info-departure { font-family: BloggerSans; font-size: 20px; fill: #00f0ba; } .weather { font-family: BloggerSans; fill: #fff; color: #ffffff; font-size: 14px; font-weight: normal; } .weather-value { font-size: 24px !important; fill: #fff; }'+
'</style></defs>'

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" width="17" height="17"><defs><style>.cls-1{fill:#ffc424;stroke:#ffc424}</style></defs><path id="Sonne" d="M8.927 15.733c-.092-.549-.173-1.1-.265-1.638-.03-.183.061-.234.224-.234.142 0 .315-.1.356.132l.234 1.587c.02.244-.031.4-.244.417h-.039c-.157.003-.238-.113-.266-.264zm-2.859.122c-.2-.051-.254-.2-.234-.264.163-.651.3-1.18.417-1.7.051-.214.163-.193.336-.153s.3.071.234.285c-.132.519-.265 1.048-.4 1.567-.043.154-.114.279-.262.279a.342.342 0 0 1-.091-.014zm5.738-1.017c-.315-.5-.61-1-.926-1.506-.1-.163.041-.2.132-.254.112-.051.234-.244.346-.071.346.539.661 1.088.956 1.577.01.214-.041.315-.163.366a.28.28 0 0 1-.125.032.263.263 0 0 1-.22-.144zm-8.627-.722c.305-.458.651-.9.977-1.353.092-.122.173-.163.285-.041.092.1.356.132.224.326-.336.5-.712.987-1.078 1.465a.352.352 0 0 1-.163.081c-.307-.061-.408-.244-.245-.478zM2.751 8a5.26 5.26 0 1 1 5.26 5.269A5.236 5.236 0 0 1 2.751 8zm.56-.03A4.7 4.7 0 1 0 8.123 3.3h-.094a4.713 4.713 0 0 0-4.718 4.672zm10.835 4.852c-.478-.315-.936-.671-1.4-1.007-.142-.1-.1-.193-.01-.285s.122-.346.326-.2c.488.336.966.692 1.434 1.048a.462.462 0 0 1 .1.214c-.042.2-.137.3-.261.3a.342.342 0 0 1-.189-.068zm-13.084-.669c-.1-.193.02-.325.173-.417.448-.275.9-.549 1.353-.814.163-.092.468.122.458.325-.01.1-.092.132-.163.173-.448.275-.9.539-1.343.814a.461.461 0 0 1-.238.083.27.27 0 0 1-.24-.164zm14.4-2.014c-.509-.122-1.017-.254-1.526-.366-.244-.051-.214-.193-.183-.376.031-.214.153-.234.326-.193.509.132 1.017.254 1.516.387.183.051.326.153.264.356a.248.248 0 0 1-.271.208.616.616 0 0 1-.13-.017zM0 9.243c-.03-.2.1-.315.285-.346.5-.081 1-.153 1.5-.224.173-.02.326-.061.366.2.03.234-.02.346-.265.376-.5.071-1 .153-1.5.224a.8.8 0 0 1-.086.009.267.267 0 0 1-.3-.239zm13.861-2.126c-.01-.142-.071-.315.163-.346.549-.081 1.1-.163 1.648-.234a.257.257 0 0 1 .328.234.263.263 0 0 1-.254.315c-.549.081-1.1.173-1.77.285h-.008c-.061.001-.107-.099-.107-.254zM1.937 6.792a95.756 95.756 0 0 0-1.5-.366c-.173-.041-.336-.132-.3-.346s.224-.285.427-.224c.509.122 1.017.275 1.526.376.275.061.193.2.163.366-.03.129-.067.23-.181.23a.374.374 0 0 1-.135-.036zm11.11-1.882c-.153-.214-.031-.285.122-.376.437-.254.855-.529 1.3-.783.285-.142.478-.061.509.244.01.122-.122.2-.254.285-.417.254-.844.488-1.251.763a.357.357 0 0 1-.186.072c-.099-.001-.158-.089-.24-.205zm-10.2-.325c-.407-.3-.814-.6-1.231-.9-.173-.122-.275-.285-.132-.468s.326-.122.488 0c.407.305.814.6 1.231.9.061.051.112.1.183.163-.092.132-.163.254-.244.356a.149.149 0 0 1-.111.064c-.074 0-.131-.075-.188-.116zM11.5 3.231c-.153-.122-.234-.2-.092-.4.315-.407.61-.844.926-1.261a.325.325 0 0 1 .387-.163.364.364 0 0 1 .193.295c-.041.081-.081.173-.132.254-.3.407-.6.814-.885 1.221-.067.1-.127.149-.2.149a.339.339 0 0 1-.197-.095zm-6.9-.295c-.3-.488-.59-.977-.885-1.475a.27.27 0 0 1 .054-.361c.1-.081.254-.112.326-.02a16.239 16.239 0 0 1 1.078 1.632c-.041.183-.224.193-.336.285a.167.167 0 0 1-.1.045c-.059.001-.101-.042-.137-.106zm4.782-.692c-.2-.03-.234-.132-.183-.315.132-.509.254-1.007.376-1.516C9.629.23 9.72.1 9.924.129a.283.283 0 0 1 .244.356 97.534 97.534 0 0 0-.4 1.587c-.038.159-.112.2-.2.2a1.127 1.127 0 0 1-.184-.027zM6.76 1.888c-.071-.5-.163-1-.234-1.5-.026-.178.01-.341.223-.381.244-.041.336.112.366.315.071.509.142 1.007.224 1.526.051.183-.041.275-.254.305A.512.512 0 0 1 7 2.161c-.165 0-.214-.106-.24-.273z" class="cls-1" transform="translate(.505 .501)"/></svg>`;
const sunriseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 17" width="25" height="17"><defs><style>.sunrise{fill:#00f0ba;stroke:#00f0ba}</style></defs><path id="Nacht" d="M-130.691-104.045a3.7 3.7 0 0 1-3.713-3.848 3.7 3.7 0 0 1 3.792-3.769c.282 0 .373-.045.428-.338a6.386 6.386 0 0 1 5.462-5.383 6.394 6.394 0 0 1 6.85 3.938.527.527 0 0 0 .53.373 4.528 4.528 0 0 1 4.164 4.75 4.5 4.5 0 0 1-4.593 4.266c-2.144.011-4.289.011-6.432.011-1.445 0-2.884.005-4.325.005q-1.08.001-2.163-.005zm10.554-.61a22.641 22.641 0 0 0 2.965-.077 3.849 3.849 0 0 0 3.273-4.627 3.717 3.717 0 0 0-2.8-2.946 3.708 3.708 0 0 0-3.927 1.2c-.169.181-.316.519-.621.248-.338-.293 0-.5.158-.7a4.092 4.092 0 0 1 2.268-1.389c.44-.1.383-.247.248-.553a5.881 5.881 0 0 0-5.688-3.307 5.827 5.827 0 0 0-5.123 4.119 2.682 2.682 0 0 0-.181 1.094c.045.283.485.283.722.463.181.136.339.283.193.508s-.35.158-.542.034a3.626 3.626 0 0 0-.35-.192 2.7 2.7 0 0 0-2.392-.012 3.223 3.223 0 0 0-1.76 3.667 3.073 3.073 0 0 0 3.047 2.449c2.145.034 4.288.012 6.432.012.869 0 1.727.011 2.6 0h.406c.355-.004.709.003 1.072.009zm-16.512-4.162c-.136 0-.338.045-.384-.147-.033-.147.147-.2.248-.271a6.185 6.185 0 0 0 2.438-3.679 6.281 6.281 0 0 0-2.235-6.5c-.09-.079-.192-.147-.271-.214s-.214-.124-.147-.271c.045-.1.158-.091.248-.1a5.342 5.342 0 0 1 2.494.293 5.64 5.64 0 0 1 3.509 6.793c-.135.519-.394.677-.88.576a4.971 4.971 0 0 0-3.792-6.963c2.551 3.272 2.551 6.511.023 9.761a.306.306 0 0 0 .3 0 .458.458 0 0 1 .253-.034c.011.474-.147.757-.677.757h-.754a6.627 6.627 0 0 1-.373-.001z" class="sunrise" transform="translate(137.538 120.539)"/></svg>`;

const lineContainer = (obj, x, y, width=245, height=45, stroke='#00f0ba') => {
    return `<svg width="${width}" height="${height}" x="${x}" y="${y}">
        <rect x="1" y="1" width="243" height="43" stroke="#00f0ba" stroke-width="1px" fill-opacity="0.6" rx="9"/>
        <text x="10" y="10" alignment-baseline="hanging" text-anchor="start" class="station-info-line-name">${obj.lineName}</text>
        <text x="50" y="5" alignment-baseline="hanging" text-anchor="start" class="station-info-element">${obj.startName}</text>
        <text x="50" y="30" alignment-baseline="hanging" text-anchor="start" class="station-info-element">${obj.stopName}</text>
        <text x="${width-10}" y="15" alignment-baseline="hanging" text-anchor="end" class="station-info-departure">${obj.departureTime+' min'}</text>
        <line x1="50" x2="100"
              y1="25" y2="25" stroke="#00f0ba" stroke-width="2" stroke-linecap="butt"/>
        <line x1="100" x2="175"
              y1="25" y2="25" stroke="#ffc424" stroke-width="2" stroke-linecap="butt"/>
    </svg>`;
}

const timetableContainer = (obj, x, y) => {
	const height=45;
    var result = '';
    obj.forEach((elem, index)=>{
    			result+=lineContainer(elem, 10, 25+index*(height+5));
    });
    const containerHeight=(obj.length>0 ? 50+obj.length*(height+5) : 50);
    return `<svg width="380" height="${containerHeight}" y="${y}">
    				<g>
            <rect x="1" y="1" width="378" height="${containerHeight-2}" stroke="#00f0ba" stroke-width="1px" fill-opacity="0.16" rx="9"/>
            ${result}
            </g></svg>`;
}

const weatherContainer = (weatherObj, x, y, width=250, height=45) => {
	const position = {x: 50, y: 3, padding: 25};
  
    return `<svg width="${width}" height="${height}" x="${x}" y="${y}">
    <g>
        <g class="weather-now">
            <svg x="${position.x+5}">${sunIcon}</svg>
            <text x="${position.x}" y="${position.y}" alignment-baseline="hanging" text-anchor="end" class="weather">Aktuell</text>
            <text x="67" y="25" alignment-baseline="hanging" text-anchor="end" class="weather-value">${weatherObj.now.temp+" °C"}</text>
            <line   x1="${position.x+3*position.padding/2}" x2="${position.x+3*position.padding/2}" 
                    y1="${position.y}" y2="${height-position.y}" stroke="#fff" stroke-width="1" stroke-linecap="butt"/>
        </g>
        <g class="weather-sunrise">
            <svg x="${2*position.x+position.padding+10}">${sunriseIcon}</svg>
            <text x="${2*position.x+position.padding}" y="${position.y}" alignment-baseline="hanging" text-anchor="end" class="weather">${weatherObj.sunrise.time}</text>
            <text x="${2*position.x+position.padding+30}" y="25" alignment-baseline="hanging" text-anchor="end" class="weather-value">${weatherObj.sunrise.temp+" °C"}</text>
            <line   x1="${2*position.x+2*position.padding+28}" x2="${2*position.x+2*position.padding+28}" 
                    y1="${position.y}" y2="${height-position.y}" stroke="#fff" stroke-width="1" stroke-linecap="butt"/>
        </g>
        <g class="weather-sunset">
            <svg x="${3*position.x+3*position.padding+5}">${sunIcon}</svg>
            <text x="${3*position.x+3*position.padding}" y="${position.y}" alignment-baseline="hanging" text-anchor="end" class="weather">${weatherObj.sunset.time}</text>
            <text x="${3*position.x+3*position.padding+22}" y="25" alignment-baseline="hanging" text-anchor="end" class="weather-value">${weatherObj.sunset.temp+" °C"}</text>
        </g>
        </g></svg>`;
}

const stationNameContainer = (stationName, x=0, y=0, width=250, height=50, stroke='#00f0ba') => {
    const padding=5;
    return `<svg width="${width}" height="${height}">
    <g>
        <rect x="1" y="4" width="${width-padding}" height="${height-padding}"
            stroke="${stroke}" stroke-width="1" fill-opacity="0.4" rx="9"/>
        <rect x="4" y="1" width="${width-padding}" height="${height-padding}"
            stroke="${stroke}" stroke-width="1" fill-opacity="0.4" rx="9"/>
        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle"
            class="station-title">${stationName}</text>
    </g></svg>`;
}

export const generateObj = (jsonObj, width=400, height=650) => {
	const title = stationNameContainer(jsonObj.stationName);
  const weather = weatherContainer(jsonObj.weather, 0, 60);
	const timetable = timetableContainer(jsonObj.timetable, 0, 150);
return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="optimizeSpeed">
        ${defaultDefs}
        <g>
            <rect fill="#000" fill-opacity="0.5" width="100%" height="100%"/>
            ${title}${weather}${timetable}
        </g></svg>`;
}






