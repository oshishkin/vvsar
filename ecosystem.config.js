module.exports = {
  apps : [{
    name            : "vvsar",
    script          : "index.js",
    instances       : "max",
    exec_mode       : "cluster",
    watch           : false,
    ignore_watch    : ["node_modules"],
    out_file        : "vvsar_pm2.log",
    error_file      : "vvsar_pm2.log",
    merge_logs      : true,
    log_date_format : "YYYY-MM-DD HH:mm Z"
  }]
}
