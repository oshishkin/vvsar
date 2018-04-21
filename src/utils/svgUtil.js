const defaultDefs='<defs><style>'+
'.station-title { font-family: BloggerSans; font-size: 18px; font-weight: normal; font-style: normal; font-stretch: normal; letter-spacing: normal; text-align: left; fill: #00f0ba; } .station-info-element { font-family: BloggerSans; font-size: 13px; fill: #00f0ba; } .station-info-line-name { font-family: BloggerSans; font-size: 25px; } .station-info-departure { font-family: BloggerSans; font-size: 20px; fill: #00f0ba; } .weather { font-family: BloggerSans; fill: #fff; color: #ffffff; font-size: 14px; font-weight: normal; } .weather-value { font-size: 24px !important; fill: #fff; }'+
'</style></defs>'

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17" width="17" height="17"><defs><style>.cls-1{fill:#ffc424;stroke:#ffc424}</style></defs><path id="Sonne" d="M8.927 15.733c-.092-.549-.173-1.1-.265-1.638-.03-.183.061-.234.224-.234.142 0 .315-.1.356.132l.234 1.587c.02.244-.031.4-.244.417h-.039c-.157.003-.238-.113-.266-.264zm-2.859.122c-.2-.051-.254-.2-.234-.264.163-.651.3-1.18.417-1.7.051-.214.163-.193.336-.153s.3.071.234.285c-.132.519-.265 1.048-.4 1.567-.043.154-.114.279-.262.279a.342.342 0 0 1-.091-.014zm5.738-1.017c-.315-.5-.61-1-.926-1.506-.1-.163.041-.2.132-.254.112-.051.234-.244.346-.071.346.539.661 1.088.956 1.577.01.214-.041.315-.163.366a.28.28 0 0 1-.125.032.263.263 0 0 1-.22-.144zm-8.627-.722c.305-.458.651-.9.977-1.353.092-.122.173-.163.285-.041.092.1.356.132.224.326-.336.5-.712.987-1.078 1.465a.352.352 0 0 1-.163.081c-.307-.061-.408-.244-.245-.478zM2.751 8a5.26 5.26 0 1 1 5.26 5.269A5.236 5.236 0 0 1 2.751 8zm.56-.03A4.7 4.7 0 1 0 8.123 3.3h-.094a4.713 4.713 0 0 0-4.718 4.672zm10.835 4.852c-.478-.315-.936-.671-1.4-1.007-.142-.1-.1-.193-.01-.285s.122-.346.326-.2c.488.336.966.692 1.434 1.048a.462.462 0 0 1 .1.214c-.042.2-.137.3-.261.3a.342.342 0 0 1-.189-.068zm-13.084-.669c-.1-.193.02-.325.173-.417.448-.275.9-.549 1.353-.814.163-.092.468.122.458.325-.01.1-.092.132-.163.173-.448.275-.9.539-1.343.814a.461.461 0 0 1-.238.083.27.27 0 0 1-.24-.164zm14.4-2.014c-.509-.122-1.017-.254-1.526-.366-.244-.051-.214-.193-.183-.376.031-.214.153-.234.326-.193.509.132 1.017.254 1.516.387.183.051.326.153.264.356a.248.248 0 0 1-.271.208.616.616 0 0 1-.13-.017zM0 9.243c-.03-.2.1-.315.285-.346.5-.081 1-.153 1.5-.224.173-.02.326-.061.366.2.03.234-.02.346-.265.376-.5.071-1 .153-1.5.224a.8.8 0 0 1-.086.009.267.267 0 0 1-.3-.239zm13.861-2.126c-.01-.142-.071-.315.163-.346.549-.081 1.1-.163 1.648-.234a.257.257 0 0 1 .328.234.263.263 0 0 1-.254.315c-.549.081-1.1.173-1.77.285h-.008c-.061.001-.107-.099-.107-.254zM1.937 6.792a95.756 95.756 0 0 0-1.5-.366c-.173-.041-.336-.132-.3-.346s.224-.285.427-.224c.509.122 1.017.275 1.526.376.275.061.193.2.163.366-.03.129-.067.23-.181.23a.374.374 0 0 1-.135-.036zm11.11-1.882c-.153-.214-.031-.285.122-.376.437-.254.855-.529 1.3-.783.285-.142.478-.061.509.244.01.122-.122.2-.254.285-.417.254-.844.488-1.251.763a.357.357 0 0 1-.186.072c-.099-.001-.158-.089-.24-.205zm-10.2-.325c-.407-.3-.814-.6-1.231-.9-.173-.122-.275-.285-.132-.468s.326-.122.488 0c.407.305.814.6 1.231.9.061.051.112.1.183.163-.092.132-.163.254-.244.356a.149.149 0 0 1-.111.064c-.074 0-.131-.075-.188-.116zM11.5 3.231c-.153-.122-.234-.2-.092-.4.315-.407.61-.844.926-1.261a.325.325 0 0 1 .387-.163.364.364 0 0 1 .193.295c-.041.081-.081.173-.132.254-.3.407-.6.814-.885 1.221-.067.1-.127.149-.2.149a.339.339 0 0 1-.197-.095zm-6.9-.295c-.3-.488-.59-.977-.885-1.475a.27.27 0 0 1 .054-.361c.1-.081.254-.112.326-.02a16.239 16.239 0 0 1 1.078 1.632c-.041.183-.224.193-.336.285a.167.167 0 0 1-.1.045c-.059.001-.101-.042-.137-.106zm4.782-.692c-.2-.03-.234-.132-.183-.315.132-.509.254-1.007.376-1.516C9.629.23 9.72.1 9.924.129a.283.283 0 0 1 .244.356 97.534 97.534 0 0 0-.4 1.587c-.038.159-.112.2-.2.2a1.127 1.127 0 0 1-.184-.027zM6.76 1.888c-.071-.5-.163-1-.234-1.5-.026-.178.01-.341.223-.381.244-.041.336.112.366.315.071.509.142 1.007.224 1.526.051.183-.041.275-.254.305A.512.512 0 0 1 7 2.161c-.165 0-.214-.106-.24-.273z" class="cls-1" transform="translate(.505 .501)"/></svg>`;
const sunriseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 17" width="25" height="17"><defs><style>.sunrise{fill:#00f0ba;stroke:#00f0ba}</style></defs><path id="Nacht" d="M-130.691-104.045a3.7 3.7 0 0 1-3.713-3.848 3.7 3.7 0 0 1 3.792-3.769c.282 0 .373-.045.428-.338a6.386 6.386 0 0 1 5.462-5.383 6.394 6.394 0 0 1 6.85 3.938.527.527 0 0 0 .53.373 4.528 4.528 0 0 1 4.164 4.75 4.5 4.5 0 0 1-4.593 4.266c-2.144.011-4.289.011-6.432.011-1.445 0-2.884.005-4.325.005q-1.08.001-2.163-.005zm10.554-.61a22.641 22.641 0 0 0 2.965-.077 3.849 3.849 0 0 0 3.273-4.627 3.717 3.717 0 0 0-2.8-2.946 3.708 3.708 0 0 0-3.927 1.2c-.169.181-.316.519-.621.248-.338-.293 0-.5.158-.7a4.092 4.092 0 0 1 2.268-1.389c.44-.1.383-.247.248-.553a5.881 5.881 0 0 0-5.688-3.307 5.827 5.827 0 0 0-5.123 4.119 2.682 2.682 0 0 0-.181 1.094c.045.283.485.283.722.463.181.136.339.283.193.508s-.35.158-.542.034a3.626 3.626 0 0 0-.35-.192 2.7 2.7 0 0 0-2.392-.012 3.223 3.223 0 0 0-1.76 3.667 3.073 3.073 0 0 0 3.047 2.449c2.145.034 4.288.012 6.432.012.869 0 1.727.011 2.6 0h.406c.355-.004.709.003 1.072.009zm-16.512-4.162c-.136 0-.338.045-.384-.147-.033-.147.147-.2.248-.271a6.185 6.185 0 0 0 2.438-3.679 6.281 6.281 0 0 0-2.235-6.5c-.09-.079-.192-.147-.271-.214s-.214-.124-.147-.271c.045-.1.158-.091.248-.1a5.342 5.342 0 0 1 2.494.293 5.64 5.64 0 0 1 3.509 6.793c-.135.519-.394.677-.88.576a4.971 4.971 0 0 0-3.792-6.963c2.551 3.272 2.551 6.511.023 9.761a.306.306 0 0 0 .3 0 .458.458 0 0 1 .253-.034c.011.474-.147.757-.677.757h-.754a6.627 6.627 0 0 1-.373-.001z" class="sunrise" transform="translate(137.538 120.539)"/></svg>`;
const busIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"> <defs> <style> .bus-cls-1,.bus-cls-4{fill:#000}.bus-cls-1{stroke:#00f0ba}.bus-cls-2{fill:#00f0ba}.bus-cls-3{stroke:none} </style> </defs> <g id="BUS" transform="translate(-240 -178)"> <g id="Ellipse_1" class="bus-cls-1" data-name="Ellipse 1" transform="translate(240 178)" fill-opacity="0.8"> <circle cx="15" cy="15" r="15" class="bus-cls-3"/> <circle cx="15" cy="15" r="14.5" class="bus-cls-4" fill-opacity="0.8"/> </g> <path id="bus-2" d="M16 4.75v2.5a.75.75 0 0 1-.75.75H15v5.25a.75.75 0 0 1-.75.75H14v1.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V14H5v1.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V14h-.25a.75.75 0 0 1-.75-.75V8H.75A.75.75 0 0 1 0 7.25v-2.5A.75.75 0 0 1 .75 4H1V2.5C1 1.119 4.134 0 8 0s7 1.119 7 2.5V4h.25a.75.75 0 0 1 .75.75zM3.5 10a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 3.5 10zm9 0a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 12.5 10zm1-1.75v-4.5a.75.75 0 0 0-.75-.75h-9.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 .75.75h9.5a.75.75 0 0 0 .75-.75z" class="bus-cls-2" data-name="bus" transform="translate(247 185)"/> </g> </svg> `;
const radarIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282.875 241.875"> <defs> <style> .radar-cls-1,.radar-cls-2,.radar-cls-3,.radar-cls-6,.radar-cls-9{fill:none}.radar-cls-1,.radar-cls-3,.radar-cls-4,.radar-cls-6{stroke:#00f0ba}.radar-cls-1,.radar-cls-4{stroke-width:2px}.radar-cls-3{stroke-width:.5px}.radar-cls-4{fill:#ffc424}.radar-cls-10,.radar-cls-5,.radar-cls-7{fill:#00f0ba}.radar-cls-5{font-size:21px;font-family:Helvetica-Bold,Helvetica;font-weight:700}.radar-cls-7{font-size:14px;font-family:BloggerSans,Blogger Sans}.radar-cls-10,.radar-cls-8{stroke:none}.radar-cls-11{filter:url(#Schnittmenge_1)}.radar-cls-12{filter:url(#Ellipse_6)} </style> <filter id="Ellipse_6" width="233.75" height="233.75" x="4" y="4.125" filterUnits="userSpaceOnUse"> <feOffset dy="3"/> <feGaussianBlur result="blur" stdDeviation="3"/> <feFlood/> <feComposite in2="blur" operator="in"/> <feComposite in="SourceGraphic"/> </filter> <filter id="Schnittmenge_1" width="241.75" height="129.875" x="0" y="112" filterUnits="userSpaceOnUse"> <feOffset dy="3"/> <feGaussianBlur result="blur-2" stdDeviation="3"/> <feFlood/> <feComposite in2="blur-2" operator="in"/> <feComposite in="SourceGraphic"/> </filter> </defs> <g id="RADAR-GRID" transform="translate(-157 -460.875)"> <g class="radar-cls-12" transform="translate(157 460.88)"> <g id="Ellipse_6-2" class="radar-cls-1" data-name="Ellipse 6" transform="translate(13 10.13)"> <circle cx="107.875" cy="107.875" r="107.875" class="radar-cls-8"/> <circle cx="107.875" cy="107.875" r="106.875" class="radar-cls-9"/> </g> </g> <g class="radar-cls-11" transform="translate(157 460.88)"> <g id="Schnittmenge_1-2" class="radar-cls-2" data-name="Schnittmenge 1"> <path d="M158 127.75h223.75a111.875 111.875 0 1 1-223.75 0z" class="radar-cls-8" transform="translate(-149 -9.75)"/> <path d="M269.875 239.125c7.557 0 15.109-.761 22.446-2.263a110.811 110.811 0 0 0 20.906-6.49 111.385 111.385 0 0 0 18.919-10.268 112.18 112.18 0 0 0 16.483-13.6 112.183 112.183 0 0 0 13.6-16.484 111.387 111.387 0 0 0 10.269-18.918 110.81 110.81 0 0 0 6.49-20.906 112.169 112.169 0 0 0 2.261-21.946H158.502c.032 7.39.793 14.77 2.261 21.946a110.81 110.81 0 0 0 6.49 20.906 111.386 111.386 0 0 0 10.268 18.918 112.178 112.178 0 0 0 13.6 16.484 112.174 112.174 0 0 0 16.484 13.6 111.384 111.384 0 0 0 18.918 10.269 110.81 110.81 0 0 0 20.905 6.49 112.198 112.198 0 0 0 22.447 2.262m0 .5C208.088 239.625 158 189.536 158 127.75h223.75c0 61.786-50.088 111.875-111.875 111.875z" class="radar-cls-10" transform="translate(-149 -9.75)"/> </g> </g> <g id="Ellipse_8" class="radar-cls-3" data-name="Ellipse 8" transform="translate(189.614 490.614)"> <circle cx="88.261" cy="88.261" r="88.261" class="radar-cls-8"/> <circle cx="88.261" cy="88.261" r="88.011" class="radar-cls-9"/> </g> <g id="Ellipse_9" class="radar-cls-3" data-name="Ellipse 9" transform="translate(209.227 510.227)"> <circle cx="68.648" cy="68.648" r="68.648" class="radar-cls-8"/> <circle cx="68.648" cy="68.648" r="68.398" class="radar-cls-9"/> </g> <g id="Ellipse_10" class="radar-cls-3" data-name="Ellipse 10" transform="translate(228.841 529.841)"> <circle cx="49.034" cy="49.034" r="49.034" class="radar-cls-8"/> <circle cx="49.034" cy="49.034" r="48.784" class="radar-cls-9"/> </g> <g id="Ellipse_11" class="radar-cls-3" data-name="Ellipse 11" transform="translate(248.455 549.455)"> <circle cx="29.42" cy="29.42" r="29.42" class="radar-cls-8"/> <circle cx="29.42" cy="29.42" r="29.17" class="radar-cls-9"/> </g> <path id="Linie_121" d="M212.808 0H0" class="radar-cls-3" data-name="Linie 121" transform="rotate(90 -97.543 375.418)"/> <g id="TargetH"> <g id="Ellipse_12" class="radar-cls-4" data-name="Ellipse 12" transform="translate(263.165 564.165)"> <circle cx="14.71" cy="14.71" r="14.71" class="radar-cls-8"/> <circle cx="14.71" cy="14.71" r="13.71" class="radar-cls-9"/> </g> <text id="H" class="radar-cls-5" transform="translate(270.03 586.049)"> <tspan x="0" y="0">H</tspan> </text> </g> <path id="Pfad_46" d="M36.125 525.342v6h19v-6" class="radar-cls-6" data-name="Pfad 46" transform="translate(319.875 -50.125)"/> <text id="_0_1000_m" class="radar-cls-7" data-name="0 1000 m" transform="translate(349.875 460.875)"> <tspan x="0" y="11">0 1000 m</tspan> </text> <path id="Linie_120" d="M212.808 0H0" class="radar-cls-3" data-name="Linie 120" transform="translate(171.471 579.365)"/> </g> </svg> `;
const timetableButtonIcons = [
    { 
        name: 'taxi',
        action: '',
        width: 35,
        height: 32,
        path: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 32"><defs><style>.taxi{fill:#00f0ba}</style></defs><path id="Taxi" d="M4.2 31.942A2.919 2.919 0 0 1 1.548 28.9c-.01-1.218-.01-2.457-.01-3.655v-4.958a13.69 13.69 0 0 1 .851-5.261c.01-.03.03-.068.039-.1a2.506 2.506 0 0 1 .145-5.01c.125-.01.251-.01.377-.01.406-.009.832-.019 1.257.01h.1l.039-.078c.281-.7.59-1.392.88-2.06.194-.416.377-.851.562-1.277a3.231 3.231 0 0 1 3.2-2.128H9c5.677.01 11.442 0 17.022 0h.338a3.168 3.168 0 0 1 3.076 2.012c.6 1.364 1.084 2.476 1.518 3.511 0 .009.01.009.01.019.493-.03.986-.019 1.47-.01.116.01.222.01.338.01a2.5 2.5 0 0 1 2.524 2.466 2.547 2.547 0 0 1-2.437 2.563c.029.078.048.145.077.213a13.49 13.49 0 0 1 .8 4.971c.01 2.912 0 5.852 0 8.608a3.242 3.242 0 0 1-.86 2.389 3.171 3.171 0 0 1-2.341.842h-.281a10.771 10.771 0 0 1-1.663-.087 2.579 2.579 0 0 1-2.291-2.723v-.919H8.986v.744a2.674 2.674 0 0 1-2.586 2.96A11.222 11.222 0 0 1 5.272 32a10.113 10.113 0 0 1-1.072-.058zM3.008 11.185c-.125.01-.261.01-.387.01a1.243 1.243 0 0 0-1.354 1.238 1.268 1.268 0 0 0 1.354 1.258h1.548l-.271.822a7.528 7.528 0 0 0-.107.338 7.49 7.49 0 0 1-.222.648 12.427 12.427 0 0 0-.764 4.787v4.962c0 1.189 0 2.427.01 3.637a1.675 1.675 0 0 0 1.528 1.8 9.326 9.326 0 0 0 1.944 0c1.045-.116 1.47-.609 1.461-1.7v-2.014h19.827v2.176a1.329 1.329 0 0 0 1.228 1.49 10.347 10.347 0 0 0 1.47.068h.271a2 2 0 0 0 1.461-.484 2.045 2.045 0 0 0 .493-1.5v-8.608a12.3 12.3 0 0 0-.716-4.517 7.733 7.733 0 0 1-.252-.744c-.029-.117-.068-.233-.106-.358l-.261-.822h1.161c.174 0 .319.009.464 0a1.261 1.261 0 0 0 1.257-1.258 1.236 1.236 0 0 0-1.277-1.228c-.107-.009-.222-.009-.338-.009-.484-.009-.948-.019-1.4.009a1.161 1.161 0 0 1-1.219-.793A170.544 170.544 0 0 0 28.3 6.9a1.924 1.924 0 0 0-1.925-1.257h-.338c-5.581.01-11.345.01-17.023 0h-.009a2 2 0 0 0-2.04 1.364c-.184.436-.377.87-.562 1.3-.29.667-.59 1.345-.86 2.022a1.262 1.262 0 0 1-1.374.87 12.483 12.483 0 0 0-.674-.016c-.159-.004-.321-.001-.487.002zm25.844 11.482a2.532 2.532 0 0 1-1.76-.726 2.631 2.631 0 0 1-.783-1.828 2.543 2.543 0 0 1 2.544-2.573 2.541 2.541 0 0 1 2.573 2.544 2.579 2.579 0 0 1-2.534 2.583zm-22.429-.01a2.558 2.558 0 1 1 .01-5.116 2.523 2.523 0 0 1 2.544 2.544 2.556 2.556 0 0 1-.755 1.815 2.529 2.529 0 0 1-1.789.754zm-.541-7.747l.377-1.286c.1-.339.194-.667.29-.987.155-.493.3-.976.445-1.47.329-1.122.677-2.283 1.015-3.424a1.131 1.131 0 0 1 1.18-.919c5.262.019 10.611.009 15.785.009h1.131a1.046 1.046 0 0 1 1.141.774c.416 1.431.852 2.873 1.277 4.275.193.657.4 1.305.59 1.963a1.159 1.159 0 0 1 .039.338v.058l.038.667zm3.335-6.819a477.42 477.42 0 0 1-1.025 3.434c-.155.493-.3.976-.445 1.47-.068.213-.126.426-.194.649h20.186c-.145-.464-.28-.939-.426-1.4-.406-1.364-.832-2.766-1.238-4.159h-1.1c-5.165 0-10.5 0-15.756-.009zm2.7-4.275a21.069 21.069 0 0 1 .019-2.35A1.725 1.725 0 0 1 13.619.015a561.41 561.41 0 0 1 8 0 1.772 1.772 0 0 1 1.77 1.644c.058.7.01 1.4.01 2.166-3.87.001-7.662.001-11.483-.01z" class="taxi"/></svg>'
    },
    { 
        name: 'fahrrad',
        action: '',
        width: 32,
        height: 32,
        path: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 25"><defs><style>.fahrrad{fill:#00f0ba}</style></defs><path id="Fahrrad" d="M39.044 16.081a7.8 7.8 0 0 0-8.91-6.616c-.241.048-.338-.024-.386-.241A73.094 73.094 0 0 1 28.2 1.69c-.1-.652-.362-.893-1.038-.918-.867-.023-1.762-.023-2.63-.048a1.665 1.665 0 0 1-1.256-.458.789.789 0 0 0-1.159-.025.821.821 0 0 0 .121 1.159 2.772 2.772 0 0 0 1.787.845c.8.072 1.594.072 2.415.072.145 0 .29-.024.338.217.145.966.338 1.932.507 2.922H14.173c-.121 0-.29.072-.386-.1-.386-.749-.749-1.5-1.135-2.27.459-.024.845-.048 1.231-.1a3.054 3.054 0 0 0 1.569-.531.538.538 0 0 0 .217-.6c-.072-.266-.314-.29-.531-.29h-5.7a.686.686 0 0 0-.749.628 2.877 2.877 0 0 0 .024 1.111.644.644 0 0 0 .821.579 5.74 5.74 0 0 0 1.256-.362c.193-.072.29-.024.386.169l1.159 2.318a.479.479 0 0 1 0 .507 127.499 127.499 0 0 0-1.569 3.139.28.28 0 0 1-.41.169 7.8 7.8 0 0 0-9.9 4.708A17.29 17.29 0 0 0 0 16.467v1.521c.169.628.241 1.256.459 1.859a7.761 7.761 0 0 0 6.23 5.071c.121.024.241 0 .314.072h1.52a15.6 15.6 0 0 0 1.835-.435 7.632 7.632 0 0 0 5.167-6.109c.072-.386.193-.483.579-.483.821.024 1.618 0 2.439.024a1.213 1.213 0 0 0 .99-.459c2.68-3.139 5.384-6.278 8.065-9.417.048-.048.1-.121.193-.217.169.652.314 1.28.483 1.908.048.217-.145.241-.266.314a7.949 7.949 0 0 0-3.091 2.559 7.849 7.849 0 0 0 3.549 11.831 15.738 15.738 0 0 0 2.1.531h1.524c.628-.169 1.256-.241 1.859-.459a7.761 7.761 0 0 0 5.071-6.23c.024-.121 0-.241.072-.314v-1.518c0-.169-.048-.29-.048-.435zm-27.865-3.839c.1-.193.169-.217.362-.1a6.268 6.268 0 0 1 2.439 3.839c.072.29.024.435-.338.41-.7-.024-1.4 0-2.1 0H9.393c-.241 0-.266-.072-.169-.29a460.5 460.5 0 0 0 1.955-3.859zm2.777 6.205a6.254 6.254 0 1 1-7.364-7.389 6.615 6.615 0 0 1 2.994.121c.266.072.314.169.169.41-.845 1.666-1.666 3.332-2.511 5.022a.985.985 0 0 0-.169.676c.048.435.386.676.942.676h5.578c.458.026.458.026.361.484zm1.811-2.052c-.217 0-.169-.169-.193-.29a7.773 7.773 0 0 0-2.1-4.322 7.5 7.5 0 0 0-1.256-1.062c-.121-.1-.217-.145-.121-.338.386-.773.773-1.545 1.207-2.39 1.425 2.825 2.8 5.578 4.2 8.4zm10.479-9.127q-3.513 4.129-7.075 8.258c-.145.169-.217.29-.362-.024-1.376-2.777-2.753-5.529-4.129-8.282a.817.817 0 0 1-.072-.193h11.759c.048.12-.072.173-.121.241zM31.993 23.4a6.255 6.255 0 0 1-3.646-11.735c.266-.145.386-.145.483.193.483 1.811 1.062 3.6 1.666 5.384.217.652.773.893 1.256.555a.866.866 0 0 0 .241-1.038l-1.087-3.332c-.217-.676-.362-1.352-.6-2-.121-.386.024-.435.314-.459A6.288 6.288 0 0 1 37.522 17a6.283 6.283 0 0 1-5.529 6.4z" class="fahrrad"/></svg>'
    },
    { 
        name: 'zug',
        action: '',
        width: 35,
        height: 35,
        path: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.5 35"> <defs> <style> .zug{fill:#00f0ba} </style> </defs> <path id="ZUG" d="M-315.449-241.2a.728.728 0 0 1 .14-1.036c.449-.393.953-.729 1.457-1.093.084-.056.168-.14.252-.2.224-.224.224-.42-.084-.56a5.336 5.336 0 0 1-1.092-.645 5.586 5.586 0 0 1-1.513-1.737 5.311 5.311 0 0 1-.728-2.913v-18.178a5.488 5.488 0 0 1 .784-2.969 5.757 5.757 0 0 1 1.793-1.793 6.1 6.1 0 0 1 3.3-1.009c.477-.028.953 0 1.429 0a.454.454 0 0 0 .532-.392 3.08 3.08 0 0 1 .533-1.093 2.358 2.358 0 0 1 1.148-.9 3.06 3.06 0 0 1 2.381.084 1.591 1.591 0 0 1 .449.308.531.531 0 0 0 .812.028 2.805 2.805 0 0 1 3.137-.28 2.457 2.457 0 0 1 1.372 1.765.506.506 0 0 0 .561.448c.288.012.575.009.865.005.388-.005.779-.009 1.179.023a5.991 5.991 0 0 1 3.388 1.457 5.08 5.08 0 0 1 1.569 2.381 5.8 5.8 0 0 1 .28 1.849v3.725c-.056 4.229 0 8.458-.028 12.688 0 .644 0 1.289.028 1.961a5.5 5.5 0 0 1-1.541 3.921 5.963 5.963 0 0 1-1.9 1.317.651.651 0 0 1-.308.2 11.146 11.146 0 0 1 .925.672 13.7 13.7 0 0 1 1.26.981.694.694 0 0 1 .084.952.626.626 0 0 1-.868.224 3.061 3.061 0 0 1-.42-.224l-1.933-1.429c-.252-.2-.5-.392-.729-.588a.879.879 0 0 0-.588-.2h-13.388a1 1 0 0 0-.673.252c-.644.5-1.26.981-1.9 1.457a5.18 5.18 0 0 1-1.036.7.985.985 0 0 1-.435.114.531.531 0 0 1-.494-.273zm4.2-30.669a4.939 4.939 0 0 0-2.493.784 4.118 4.118 0 0 0-1.849 3.5c-.028 1.569 0 3.137 0 4.733 0 2.661-.028 5.322 0 8.01.028.925 0 1.849 0 2.773 0 1.064-.056 2.129.028 3.192a4.138 4.138 0 0 0 1.877 3.193 4.306 4.306 0 0 0 2.605.756c2.269-.056 4.537-.056 6.834-.056s4.621.028 6.918 0a4.337 4.337 0 0 0 3.109-1.232 4.241 4.241 0 0 0 1.344-3.137c.028-4.565 0-9.159 0-13.724 0-.308 0-.588.028-.9a33.7 33.7 0 0 0-.112-4.117 3.776 3.776 0 0 0-1.2-2.521 4.814 4.814 0 0 0-3.7-1.233 6.608 6.608 0 0 1-1.289 0 .4.4 0 0 0-.448.252 2.141 2.141 0 0 1-.868.925 2.788 2.788 0 0 1-3.5-.2.389.389 0 0 0-.532 0 3.655 3.655 0 0 1-.42.281 2.9 2.9 0 0 1-2.745.14 2.611 2.611 0 0 1-1.176-1.093.491.491 0 0 0-.5-.308c-.322.014-.637 0-.953-.014-.222-.01-.444-.02-.669-.02-.099.011-.193.013-.288.017zm7.758-1.177a1.458 1.458 0 0 0 1.345 1.429 1.4 1.4 0 0 0 1.457-1.373 1.4 1.4 0 0 0-1.373-1.456h-.048a1.394 1.394 0 0 0-1.379 1.401zm-4.285 0a1.361 1.361 0 0 0 1.429 1.4 1.394 1.394 0 0 0 1.344-1.4 1.4 1.4 0 0 0-1.372-1.428 1.393 1.393 0 0 0-1.4 1.429zm9.551 26.1a3.155 3.155 0 0 1-3.277-3.417 3.169 3.169 0 0 1 3.333-3.164 3.251 3.251 0 0 1 3.248 3.249 3.2 3.2 0 0 1-3.25 3.333zm-1.793-3.445a1.769 1.769 0 0 0 1.793 1.961 1.883 1.883 0 0 0 1.877-1.9 1.954 1.954 0 0 0-1.821-1.793 1.866 1.866 0 0 0-1.847 1.737zm-13.556.056a3.262 3.262 0 0 1 3.389-3.22 3.228 3.228 0 0 1 3.221 3.249 3.183 3.183 0 0 1-3.389 3.36 3.245 3.245 0 0 1-3.219-3.384zm1.457 0a1.859 1.859 0 0 0 1.849 1.9 1.78 1.78 0 0 0 1.821-1.876 1.859 1.859 0 0 0-1.849-1.821 1.954 1.954 0 0 0-1.82 1.802zm1.121-6.134a2.536 2.536 0 0 1-1.821-.672 2.069 2.069 0 0 1-.729-1.541v-5.573a2.188 2.188 0 0 1 .729-1.6 2.478 2.478 0 0 1 1.736-.644c2.213-.056 4.4-.028 6.611-.028h6.078a7.025 7.025 0 0 1 1.709.112 2.3 2.3 0 0 1 1.764 2.269q-.042 2.6 0 5.209a2.383 2.383 0 0 1-2.381 2.409c-2.325.056-4.705.028-6.582.056zm-1.149-7.422v4.9a.94.94 0 0 0 1.064 1.037c2.269-.028 4.566-.028 6.835-.028h6.862a.929.929 0 0 0 1.037-.981v-4.985a.942.942 0 0 0-.476-.869 1.281 1.281 0 0 0-.645-.14h-13.64a.94.94 0 0 0-1.036 1.071z" class="zug" transform="translate(317.017 275.917)"/> </svg>'
    },
    {
        name: 'route',
        action: '',
        width: 35.7,
        height: 35.7,
        path: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.7 35.7"> <defs> <style> .route{fill:#00f0ba} </style> </defs> <path id="Route" d="M-313.3-365.057a8.767 8.767 0 0 1 8.756-8.756 8.8 8.8 0 0 1 5.613 2.021l5.9-5.771a8.793 8.793 0 0 1-2.088-5.68 8.768 8.768 0 0 1 8.761-8.757 8.768 8.768 0 0 1 8.757 8.757 8.768 8.768 0 0 1-8.757 8.756 8.873 8.873 0 0 1-5.388-1.841l-5.95 5.838a8.643 8.643 0 0 1 1.909 5.433 8.767 8.767 0 0 1-8.757 8.756 8.767 8.767 0 0 1-8.756-8.756zm1.8 0a6.966 6.966 0 0 0 6.96 6.961 6.967 6.967 0 0 0 6.961-6.961 6.967 6.967 0 0 0-6.961-6.961 6.966 6.966 0 0 0-6.96 6.961zm18.186-18.186a6.966 6.966 0 0 0 6.96 6.96 6.966 6.966 0 0 0 6.961-6.96 6.967 6.967 0 0 0-6.961-6.961 6.967 6.967 0 0 0-6.964 6.961zm-9.609 21.712l-.494-1.572h-2.807l-.516 1.572h-1.662l2.717-7.634h1.8l2.694 7.634zm-2.852-2.875h1.954l-.966-3.009zm16.436-15.02v-7.859h3.794a2.457 2.457 0 0 1 2.043.831 1.971 1.971 0 0 1 .359 1.191 1.709 1.709 0 0 1-.359 1.145 1.945 1.945 0 0 1-.607.449 1.664 1.664 0 0 1 .9.7 2.074 2.074 0 0 1 .314 1.145 2.223 2.223 0 0 1-.359 1.258 2.5 2.5 0 0 1-.562.628 2.193 2.193 0 0 1-.9.4 5.706 5.706 0 0 1-1.1.112zm1.571-1.37h1.908a1.824 1.824 0 0 0 .786-.135 1.008 1.008 0 0 0 .517-.987.806.806 0 0 0-.494-.831 1.827 1.827 0 0 0-.786-.135h-1.931zm0-3.39h1.908a1.573 1.573 0 0 0 .831-.2.772.772 0 0 0 .315-.7.687.687 0 0 0-.427-.718 2.789 2.789 0 0 0-.921-.112h-1.706z" class="route" transform="translate(313.301 392)"/> </svg>',
    }
];

const radarButtonIcons = [
    { 
        name: 'shop',
        action: '',
        width: 35,
        height: 30,
        path: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.398 29.701"> <defs> <style> .shop-cls-1{fill:#00f0ba} </style> </defs> <path id="shop" d="M12.121 26.765a2.757 2.757 0 1 1 5.5.089 2.755 2.755 0 1 1-5.5-.089zm1.553-.018a1.215 1.215 0 0 0 1.2 1.325 1.31 1.31 0 0 0 .034-2.614h-.034a1.211 1.211 0 0 0-1.2 1.289zm13.588 2.937a2.718 2.718 0 0 1-2.413-2.328 2.619 2.619 0 0 1 1.485-3.079 2.47 2.47 0 0 1 3.123.358 2.682 2.682 0 0 1 .439 3.4 2.3 2.3 0 0 1-2.38 1.656q-.125.001-.254-.008zm-.185-4.136a1.3 1.3 0 0 0-.743 1.5 1.125 1.125 0 0 0 .945.984 1.171 1.171 0 0 0 1.418-.787c.051-.108.135-.179.186-.269-.168-.913-.608-1.558-1.553-1.63a1.394 1.394 0 0 1-.253.201zm-2.938-2.7c-3.832 0-7.646 0-11.478.018a1.252 1.252 0 0 1-1.351-.949c-1.739-4.835-3.646-9.6-5.334-14.468-.607-1.741-1.316-3.425-1.958-5.144a.632.632 0 0 0-.709-.465q-1.139.026-2.279 0C.473 1.822.018 1.661 0 .944S.44.013 1 .013q1.645-.026 3.291 0a1.012 1.012 0 0 1 1 .788c.355 1 .76 1.97 1.1 2.99.169.519.372.77.945.77.972-.009 1.944 0 2.916 0s1.972.009 2.958 0c6.347-.053 12.711-.018 19.058-.018.675 0 1.351-.018 2.025 0 .979.018 1.3.429 1.013 1.36-1.1 3.349-2.245 6.679-3.359 10.01-.22.663-.709.77-1.283.77h-5.917q-6.33 0-12.66-.018c-.625 0-.895.072-.557.823a28.258 28.258 0 0 1 1.047 2.829.873.873 0 0 0 1 .7c2.954-.018 5.908 0 8.862 0h1.351a.748.748 0 0 1 .2 0c.2.018.422.018.642.018 1.722 0 3.444.018 5.165 0 .608 0 1.115.161 1.1.9-.017.716-.472.949-1.1.913s-1.269-.015-1.9 0a35.47 35.47 0 0 1-1.423.017h-.593c-.822.001-1.62-.022-1.742-.022zM7.512 6.836q1.469 3.652 2.886 7.305a.963.963 0 0 0 1.063.734c3.056-.036 6.128-.018 9.183-.018h9.1c.422 0 .776.018.962-.573a202.653 202.653 0 0 1 2.363-7.056c.287-.806.068-.9-.658-.9Q20.156 6.334 7.9 6.3c-.4 0-.59.016-.388.536z" class="shop-cls-1"/> </svg>'
    },
    { 
        name: 'food',
        action: '',
        width: 32,
        height: 30,
        path: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.345 29.999"> <defs> <style> .food-cls-1{fill:#00f0ba} </style> </defs> <path id="Food" d="M-314.375-555.113a1.348 1.348 0 0 1-.245-.89 2.735 2.735 0 0 1 .467-1.335 15.437 15.437 0 0 1 1.936-2.448c1.6-1.713 3.316-3.315 5.007-4.85.512-.467 1-.935 1.513-1.4a.956.956 0 0 1 .69-.266 1 1 0 0 1 .645.356c.489.6 1 1.224 1.646 1.98a.865.865 0 0 1-.023 1.247c-.467.512-.957 1.023-1.424 1.535-1.469 1.6-3 3.271-4.65 4.783a19.065 19.065 0 0 1-2.2 1.8 6.099 6.099 0 0 1-.534.311 2.94 2.94 0 0 1-1.112.289 2.168 2.168 0 0 1-1.716-1.112zm8.078-8.566c-1.67 1.535-3.382 3.115-4.94 4.784a13.49 13.49 0 0 0-1.78 2.226 1.489 1.489 0 0 0-.266.712v.089c.489.689.623.623 1.112.378.133-.067.245-.133.4-.222a13.239 13.239 0 0 0 2.025-1.669c1.6-1.491 3.115-3.137 4.561-4.718.4-.423.8-.868 1.179-1.291-.378-.511-.756-.957-1.112-1.38-.4.357-.782.735-1.182 1.091zm14.641 9.523a5.428 5.428 0 0 1-1.535-.89 33.971 33.971 0 0 1-3.894-3.626c-2.069-2.181-4.138-4.451-6.142-6.631-.957-1.068-1.935-2.114-2.893-3.181l-.067-.067a1.875 1.875 0 0 1-.266-.312 2.184 2.184 0 0 0-2.048-.89 11.093 11.093 0 0 1-2.225-.245 6.44 6.44 0 0 1-3.694-2.247 10.467 10.467 0 0 1-2.537-5.562 4.574 4.574 0 0 1 .134-1.914 3.175 3.175 0 0 1 3.048-2.269h.355a8.783 8.783 0 0 1 3.272.756 11.754 11.754 0 0 1 3.2 2.047 6.674 6.674 0 0 1 2.136 4.45c.045.49.089.957.112 1.446.022.223.022.423.044.645a1.3 1.3 0 0 0 .49.89c2.492 2.27 4.918 4.495 7.254 6.631l.712.645c1.735 1.6 3.538 3.248 5.162 5.051a15.637 15.637 0 0 1 1.335 1.669 3.514 3.514 0 0 1 .378.645c.579 1.2.356 1.981-.823 2.826a1.341 1.341 0 0 1-.823.267 2.051 2.051 0 0 1-.685-.134zm-23.9-25.21a3.53 3.53 0 0 0-.089 1.38 9.429 9.429 0 0 0 2.225 4.873 4.924 4.924 0 0 0 2.938 1.78 12.233 12.233 0 0 0 1.957.222 3.533 3.533 0 0 1 3.137 1.469l.112.112.112.111 2.914 3.182c1.981 2.181 4.05 4.45 6.119 6.609a33.3 33.3 0 0 0 3.739 3.493 3.965 3.965 0 0 0 1.156.689.607.607 0 0 0 .311.045c.579-.423.713-.512.4-1.157-.088-.178-.2-.334-.289-.49a12.47 12.47 0 0 0-1.224-1.513c-1.579-1.758-3.36-3.382-5.073-4.962l-.712-.645c-2.336-2.136-4.762-4.383-7.254-6.631a2.577 2.577 0 0 1-.912-1.758c-.023-.222-.023-.422-.045-.645-.044-.467-.067-.957-.111-1.424a5.174 5.174 0 0 0-1.691-3.582 9.854 9.854 0 0 0-2.826-1.8 6.978 6.978 0 0 0-2.759-.645h-.311a1.834 1.834 0 0 0-1.821 1.287zm17.133 11.459a1.365 1.365 0 0 1-.89-.511l-.134-.133c-.289-.267-.578-.512-.868-.779l-.912-.8.534-.49c.133-.111.267-.245.378-.355.29-.267.579-.556.89-.823a.6.6 0 0 0 .2-.623c-.022-.2-.067-.4-.089-.6-.045-.289-.089-.6-.134-.89a4.26 4.26 0 0 1 1.269-3.783c1.268-1.291 2.6-2.536 3.893-3.76l.645-.6c.245-.223.467-.445.712-.668l1.046-.979a.876.876 0 0 1 1.291-.023c.2.178.423.356.645.556.112.089.2.156.311.245l.579.467-1.179 1.18c-.535.534-1.068 1.046-1.58 1.58l-2.536 2.537a.282.282 0 0 0-.089.156.193.193 0 0 0 .067.133.19.19 0 0 0 .29 0l.645-.645 4.005-4.005a1.009 1.009 0 0 1 .712-.334.9.9 0 0 1 .689.356c.267.289.49.511.69.689a.99.99 0 0 1 .378.689 1.014 1.014 0 0 1-.355.757l-2.2 2.2c-.823.823-1.647 1.646-2.47 2.447-.112.112-.112.156-.068.245.023.089.045.156.245.156 0 0 .045 0 .089-.067l1.691-1.691 2.938-2.937a.944.944 0 0 1 .779-.334.978.978 0 0 1 .712.422c.178.223.356.445.556.69l.156.178a.879.879 0 0 1-.044 1.246c-.4.423-.779.846-1.179 1.268a228.886 228.886 0 0 1-4.7 4.984 4.8 4.8 0 0 1-4.829 1.291.083.083 0 0 1-.067-.022 1.094 1.094 0 0 0-1.424.422 1.131 1.131 0 0 1-.267.29.725.725 0 0 0-.112.133 1.159 1.159 0 0 1-.868.534zm6.363-13.862c-.244.222-.467.445-.689.645l-.645.6a122.19 122.19 0 0 0-3.849 3.716 2.916 2.916 0 0 0-.89 2.648q.068.435.133.868c.045.2.068.423.112.624a1.871 1.871 0 0 1-.645 1.824c-.245.245-.467.467-.712.689.222.2.467.4.689.6.045.044.089.067.112.112.044-.045.089-.112.133-.157.045-.022.067-.044.067-.067a2.376 2.376 0 0 1 2.893-.957 3.409 3.409 0 0 0 3.56-.912c1.58-1.625 3.137-3.316 4.673-4.963l.934-1a3.557 3.557 0 0 0-.289-.334c-.89.89-1.78 1.8-2.648 2.67l-1.691 1.691a1.4 1.4 0 0 1-1.179.467 1.569 1.569 0 0 1-1.38-1.046 1.484 1.484 0 0 1 .4-1.647c.823-.823 1.646-1.625 2.47-2.447l1.958-1.958a1.382 1.382 0 0 1-.245-.267c-1.246 1.269-2.515 2.537-3.739 3.761l-.645.645a1.525 1.525 0 0 1-2.181.022 1.481 1.481 0 0 1-.467-1.09 1.568 1.568 0 0 1 .467-1.112l2.537-2.537c.534-.534 1.068-1.046 1.579-1.579l.134-.133c-.045-.045-.112-.089-.156-.134-.264.246-.531.513-.798.758z" class="food-cls-1" transform="translate(317 584)"/> </svg> '
    },
    { 
        name: 'feedback',
        action: '',
        width: 32,
        height: 32,
        path: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.343 32"> <defs> <style> .feedback-cls-1{fill:#00f0ba} </style> </defs> <path id="feedback" d="M20.215 31.736c-1.682-1.458-3.38-2.9-5.062-4.357a.99.99 0 0 0-.721-.272c-3.652.016-7.3 0-10.957 0A3.55 3.55 0 0 1 0 23.615V8.654a3.317 3.317 0 0 1 3.492-3.476h15.73a2.359 2.359 0 0 1 .336 0 .586.586 0 0 1 .016 1.169 2.361 2.361 0 0 1-.336 0H3.4a2.55 2.55 0 0 0-1.281.288 1.7 1.7 0 0 0-.929 1.554v15.538a2.138 2.138 0 0 0 2.227 2.195h11.256a1.458 1.458 0 0 1 1.089.416c1.362 1.2 2.755 2.387 4.133 3.572.064.048.128.08.256.176V26.8c0-.7.176-.881.881-.881h4.918a2.035 2.035 0 0 0 2.13-2.13V10.816a.745.745 0 0 1 .144-.545.533.533 0 0 1 .577-.208.581.581 0 0 1 .465.545 4.5 4.5 0 0 1 0 .465v12.478a3.626 3.626 0 0 1-1.41 2.915 2.807 2.807 0 0 1-1.856.657c-1.442 0-2.867 0-4.309-.016-.288 0-.368.08-.368.368.016 1.249 0 2.5.016 3.732a.7.7 0 0 1-.368.737.574.574 0 0 1-.237.056.824.824 0 0 1-.519-.264zM6.92 21.629h-.16a.631.631 0 0 1-.66-.609.611.611 0 0 1 .641-.577c.384-.016.769 0 1.137 0H22.6a.586.586 0 0 1 .016 1.169 1.93 1.93 0 0 1-.3 0c-2.563.016-5.126.016-7.689.016zm15.426-3.059H6.9a.679.679 0 0 1-.7-.337.507.507 0 0 1 .032-.577.713.713 0 0 1 .673-.272h15.377a1.542 1.542 0 0 1 .384.016.575.575 0 0 1 .5.593.555.555 0 0 1-.481.561.6.6 0 0 1-.168.02c-.059-.001-.117-.005-.171-.005zm-6.039-3.77a349.13 349.13 0 0 1 1.185-4.405.6.6 0 0 1 .769-.5.588.588 0 0 1 .368.769 319.04 319.04 0 0 1-.993 3.716c-.112.417-.112.417.3.3 1.249-.32 2.483-.625 3.732-.945a.579.579 0 0 1 .753.384.564.564 0 0 1-.433.737c-1.522.4-3.043.785-4.565 1.169a.707.707 0 0 1-.144.016 1.037 1.037 0 0 1-.972-1.241zm-5.638.721H6.824c-.416 0-.7-.24-.7-.577-.016-.352.272-.609.721-.609H14.5c.449 0 .737.24.737.593s-.288.593-.737.593zm12.078-2.355a.532.532 0 0 1 .048-.609 2.607 2.607 0 0 1 .288-.3c2.579-2.579 5.158-5.174 7.753-7.737A.49.49 0 0 0 31 3.9a5.748 5.748 0 0 0-.609-1.458 3.63 3.63 0 0 0-2.146-1.169c-.24-.048-.32.08-.449.208-2 2.018-4.021 4.037-6.023 6.071-.593.609-1.2 1.217-1.81 1.81-.336.336-.673.368-.929.128-.272-.256-.224-.625.112-.961 2.707-2.739 5.43-5.462 8.137-8.2a.8.8 0 0 1 .993-.24 1.4 1.4 0 0 0 .365.111 4.276 4.276 0 0 1 2.851 1.71 1.3 1.3 0 0 1 .272.448c.176.577.336 1.169.529 1.746a.759.759 0 0 1-.208.849c-.833.817-1.65 1.65-2.483 2.483l-5.75 5.751c-.192.144-.336.3-.561.288h-.047a.533.533 0 0 1-.498-.304zm-8.57-.7H6.952a1.937 1.937 0 0 1-.3 0A.586.586 0 0 1 6.68 11.3c.208-.016.432 0 .641 0h7.865a.632.632 0 0 1 .673.577.608.608 0 0 1-.657.593 7.663 7.663 0 0 1-.341.007c-.229-.004-.461-.011-.685-.011zm6.7-1.105a.579.579 0 0 1 .048-.881l7.769-7.721a.577.577 0 0 1 .689-.16.523.523 0 0 1 .368.561c.016.24-.16.4-.32.561-2.312 2.29-4.631 4.579-6.941 6.871-.24.24-.48.5-.737.721a.721.721 0 0 1-.485.229.556.556 0 0 1-.396-.181z" class="feedback-cls-1"/> </svg>'
    }
];


const lineContainer = (obj, x, y, width=245, height=45, stroke='#00f0ba') => {
    const percentLength = 50+obj.progress*1.25;
    return `<svg width="${width}" height="${height}" x="${x}" y="${y}">
        <rect x="1" y="1" width="243" height="43" stroke="#00f0ba" stroke-width="1px" fill-opacity="0.6" rx="9"/>
        <text x="5" y="12" alignment-baseline="hanging" text-anchor="start" class="station-info-line-name" fill="${obj.lineColor}">${obj.lineName}</text>
        <text x="50" y="5" alignment-baseline="hanging" text-anchor="start" class="station-info-element">${obj.startName}</text>
        <text x="50" y="30" alignment-baseline="hanging" text-anchor="start" class="station-info-element">${obj.stopName}</text>
        <text x="${width-10}" y="15" alignment-baseline="hanging" text-anchor="end" class="station-info-departure">${obj.departureTime+' min'}</text>
        <line x1="50" x2="${percentLength}"
              y1="25" y2="25" stroke="#00f0ba" stroke-width="2" stroke-linecap="butt"/>
        <line x1="${percentLength}" x2="175"
              y1="25" y2="25" stroke="#ffc424" stroke-width="2" stroke-linecap="butt"/>
    </svg>`;
}

const buttonContainer = (elem, x, y, width=48, height=48) => {
    const button = `<svg width="${width}" height="${height}" x="${x}" y="${y}">
        <rect x="1" y="1" width="${width-2}" height="${height-2}" stroke="#00f0ba" stroke-width="1px" fill-opacity="0.4" rx="9"/>
            <svg width="${elem.width}" height="${elem.height}" y="${(width-elem.width)/2-1}" x="${(height-elem.height)/2-1}">
                ${elem.path}
            </svg>
        </svg>`;
    /*button.addEventListener("mouseover", function() {
    console.log(elem.name);
    }, true);*/
    return button;
}

const timetableContainer = (obj, x, y) => {
    const height=45;
    var result = '';
    obj.forEach((elem, index)=>{
        result+=lineContainer(elem, 10, 25+index*(height+5));
    });

    timetableButtonIcons.forEach((elem, i)=>{
        result+=(buttonContainer(elem, 290, 25+i*(height+5)));
    });

    const containerHeight=(obj.length>0 ? 50+obj.length*(height+5) : 50);
    return `
        <svg width="380" height="${containerHeight}" y="${y}">
        <g>
            <rect x="1" y="1" width="378" height="${containerHeight-2}" stroke="#00f0ba" stroke-width="1px" fill-opacity="0.16" rx="9"/>
            ${result}
        </g></svg>
        <svg width="30" height="30" y="${y-15}" x="170">
            ${busIcon}
        </svg>
        `;
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
            <text x="${2*position.x+position.padding}" y="${position.y}" alignment-baseline="hanging" text-anchor="end" class="weather">${weatherObj.sunset.time}</text>
            <text x="${2*position.x+position.padding+30}" y="25" alignment-baseline="hanging" text-anchor="end" class="weather-value">${weatherObj.sunset.temp+" °C"}</text>
            <line   x1="${2*position.x+2*position.padding+28}" x2="${2*position.x+2*position.padding+28}" 
                    y1="${position.y}" y2="${height-position.y}" stroke="#fff" stroke-width="1" stroke-linecap="butt"/>
        </g>
        <g class="weather-sunset">
            <svg x="${3*position.x+3*position.padding+5}">${sunIcon}</svg>
            <text x="${3*position.x+3*position.padding}" y="${position.y}" alignment-baseline="hanging" text-anchor="end" class="weather">${weatherObj.sunrise.time}</text>
            <text x="${3*position.x+3*position.padding+22}" y="25" alignment-baseline="hanging" text-anchor="end" class="weather-value">${weatherObj.sunrise.temp+" °C"}</text>
        </g>
        </g></svg>`;
}

const stationNameContainer = (stationName, x=0, y=0, width=250, height=50, stroke='#00f0ba') => {
    const padding=5;
    return `<svg width="${width}" height="${height}">
    <g>
        <rect x="1" y="4" width="${width-padding}" height="${height-padding}"
            stroke="${stroke}" stroke-width="1" fill-opacity="0.25" rx="9"/>
        <rect x="4" y="1" width="${width-padding}" height="${height-padding}"
            stroke="${stroke}" stroke-width="1" fill-opacity="0.25" rx="9"/>
        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle"
            class="station-title">${stationName}</text>
    </g></svg>`;
}

const radarContainer = (x, y, width, height) => {
    var iconsResult = '';
    radarButtonIcons.forEach((elem, i)=>{
        iconsResult+=(buttonContainer(elem, 290, y+25+i*(45+10)));//290, 25+i*(45+5)));
    });
    console.log(iconsResult);
    return `<g>
            ${iconsResult}
            <svg  width="${width}" height="${height}"  x="${x}" y="${y}">
                ${radarIcon}
            </svg>
            </g>
            `
}

export const generateObj = (jsonObj, width=400, height=650) => {
	const title = stationNameContainer(jsonObj.stationName);
  const weather = weatherContainer(jsonObj.weather, 0, 60);
    const timetable = timetableContainer(jsonObj.timetable, 0, 150);
    const radar = radarContainer(0, 410, 283, 243);
return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="optimizeSpeed">
        ${defaultDefs}
        <g>
            <rect fill="#000" fill-opacity="0.2" width="100%" height="100%"/>
            ${title}${weather}${timetable}
        </g>
        <g>
            ${radar}
        </g>
        </svg>`;
}






