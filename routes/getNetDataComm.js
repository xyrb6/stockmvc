/**
 * Created by Yu.S.Z on 2017/1/14.
 */
var request = require('request');
var common = require('./common');

/* 开启数据采集器(成交信息) */
function dataCollectorStartup(type, ymd, callback) {
    var URL_GET;
    // 个股实时资金流向排行
    if (type === '1') {
        URL_GET = common.URL_ONE_STOCK
        // tblid = common.TBL_sttgegushishizijin;
        // 主力净流入排名
    } else if (type === '2') {
        URL_GET = common.URL_MAIN;
        // tblid = common.TBL_sttzhulijingliuru;
        // 行业板块资金流向排行
    } else if (type === '3') {
        URL_GET = common.URL_HANGYE;
        // tblid = common.TBL_stthangyebankuai;
    } else {
        // 什么都没有
    }

    // 数据请求
    request({
        url: URL_GET,
        method: 'GET'
    }, function(err, res, body) {
        if (err) {
            // console.log(URL_GET)
            // console.error('[ERROR]Collection' + err);
            // return;
            // throw err;
            callback(err, null);
        } else {
            // switch(URL_GET)
            // {
            //     case URL_GET:
            //         data = dataParse(body, type, ymd);
            //         break;
            // }
            dataParse(body, type, ymd, 'trd', callback);
        }
    });
}

/* 开启数据采集器(代码表) */
function dataMasterStartup(type, callback) {
    var URL_GET;
    // 个股实时资金流向排行
    if (type === '1') {
        URL_GET = common.URL_ONE_STOCK
        // 主力净流入排名
    } else if (type === '2') {
        URL_GET = common.URL_MAIN;
        // 行业板块资金流向排行
    } else if (type === '3') {
        URL_GET = common.URL_HANGYE;
    } else {
        // 什么都没有
    }

    // 数据请求
    request({
        url: URL_GET,
        method: 'GET'
    }, function(err, res, body) {
        if (err) {
            callback(err, null);
        } else {
            dataParse(body, type, null, 'mst', callback);
        }
    });
}

function dataParse(body, type, ymd, datakbn, callback)
{
    console.log(type);
    console.log(ymd);
    console.log(datakbn);
    if (body.match("data"))
    {
        // 个股相关
        var datas = "{\"data\"" + body.split('data')[1];
    } else
    {
        // 行业板块
        var datas = "{\"data\":" + body.split('(')[1].split(')')[0] + "}";
    }

    var dates = null;
    if (ymd) {
        dates = ymd
    } else {
        dates = (new Date()).format(common.FMT_YYYYMMDD);
    }

    var arrdatas = JSON.parse(datas).data;
    var jsonArray = new Array();
    // console.log('数据解析1:' + datas);
    // console.log('数据解析2:' + arrdatas);
    arrdatas.forEach(function(val,index,arr){
        // console.log('数据解析2-1:' + arr[index]);
        if (type === '1') {
            if (datakbn === 'trd') {
                var jsonstr = {
                    "no":index + 1,
                    "date":dates,
                    "market":arr[index].split(",")[0],
                    "code":arr[index].split(",")[1],
                    "curprice":arr[index].split(",")[3],
                    "parcent": arr[index].split(",")[6],
                    "hybkcode": arr[index].split(",")[14],
                    "hybkname": arr[index].split(",")[13]
                }
            } else if (datakbn === 'mst') {
                var jsonstr = {
                    "no": index + 1,
                    "code": arr[index].split(",")[1],
                    "name": arr[index].split(",")[2]
                }
            } else {
                // 什么都不做
            }
        } else if (type === '2') {
            if (datakbn === 'trd') {
                var jsonstr = {
                    "no": index + 1,
                    "date": dates,
                    "market": arr[index].split(",")[0],
                    "code": arr[index].split(",")[1],
                    "curprice": arr[index].split(",")[3],
                    "parcent": arr[index].split(",")[4]
                }
            } else if (datakbn === 'mst') {
                // console.log("code=" + arr[index].split(",")[14] +
                //             "|name=" + arr[index].split(",")[13] +
                //             "|stockcode=" + arr[index].split(",")[1] +
                //             "|stockname=" + arr[index].split(",")[2] +
                //             "|marketdate=" + (new Date(arr[index].split(",")[15].substr(0,10))).format(common.FMT_YYYYMMDD));
                var jsonstr = {
                    // "no": index + 1,
                    "hybkcode": arr[index].split(",")[14],
                    "hybkname": arr[index].split(",")[13],
                    "stockcode": arr[index].split(",")[1],
                    "stockname": arr[index].split(",")[2],
                    "marketdate": (new Date(arr[index].split(",")[15].substr(0, 10))).format(common.FMT_YYYYMMDD)
                }
            }
        } else if (type === '3') {
            if (datakbn === 'trd') {
                var jsonstr = {
                    "no": index + 1,
                    "date": dates,
                    "code": arr[index].split(",")[1],
                    "money": arr[index].split(",")[3]
                }
            } else if (datakbn === 'mst') {
                var jsonstr = {
                    "no": index + 1,
                    "code": arr[index].split(",")[1],
                    "name": arr[index].split(",")[2]
                }
            } else {
                // 什么都不做
            }
        } else {
            // 什么都不做
        }
        // console.log('数据解析3:' + jsonstr);
        jsonArray.push(jsonstr);
    });

    // console.log('数据解析4:' + jsonArray);
    // return jsonArray;
    callback(null, jsonArray);
}

module.exports.dataCollectorStartup = dataCollectorStartup;
module.exports.dataMasterStartup = dataMasterStartup;
