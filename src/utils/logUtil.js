import fs from 'fs';
import {
    getLogger
} from 'log4js';
const log = getLogger('logUtil.js');


export async function requestLogs(cnt) {
    var resp=requestLogsInfo();
    if(cnt && cnt*1>0 && resp && resp.length>cnt*1){
        resp=resp.slice(-cnt);
    }
    return resp;
}

function requestLogsInfo() {
    var result=[];
    var obj = null;
    try {
        var data = fs.readFileSync('vvsar.log', 'utf8');
        obj = JSON.parse("{\"logs\": ["+data.trim().slice(0, -1)+"]}");
    } catch(e){
        console.log(e);
    }
    result = obj && obj.logs && obj.logs.length>0 ?
        obj.logs.filter((el)=> {
            return el && el.data && el.data.length>0 && el.data[0]=='getReqCoords';
        }) : [];
    return result;
}