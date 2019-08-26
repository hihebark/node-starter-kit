'use strict';

let getdate = () => {
    let date = new Date();
    return addZero(date.getHours())+':'+addZero(date.getMinutes())+':'+addZero(date.getSeconds());
}
let addZero = (i) => { return (i < 10) ? '0'+i : i; }

let log = {
  inf: (msg) => { console.log('['+getdate()+'][INF]: '+msg); },
  war: (msg) => { console.warn('['+getdate()+'][WAR]: '+msg); },
  err: (msg) => { console.error('['+getdate()+'][ERR]: '+msg); },
  non: () => { console.log('['+getdate()+'][NON]: '); },
  dbg: (req, res, next) => {
      let route = req.originalUrl
      , method = req.method
      , ip = req.ip
      , query = JSON.stringify(req.query)
      , body = JSON.stringify(req.body)
      , params = JSON.stringify(req.params)
      ;
      console.log('['+getdate()+']|------------[|  DEBUG  |]------------|');
      console.log(' -> ['+getdate()+'][DBG]: ['+method+']\t => '+route+' {IP: '+ip+'}');
      if (query != '{}'){
        console.log(' -> ['+getdate()+'][DBG]: Query: '+query);
      }
      if (method == 'PUT' || method == 'POST'){ 
        console.log(' -> ['+getdate()+'][DBG]: Body: '+body);
      }
      if (params != '{}'){
        console.log(' -> ['+getdate()+'][DBG]: Params: '+query);
      }
      next();
    }
}
module.exports = log;
