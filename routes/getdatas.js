var express = require('express');
var router = express.Router();

var request = require('request');
var common = require('./common');
var getNetDataComm = require('./getNetDataComm');
var sttggzj = require('./../model/sttggzj');
var sttzlzj = require('./../model/sttzlzj');
var stthybk = require('./../model/stthybk');

/* GET home page. */
router.post('/', function (req, res, next) {
    // 获取数据类型
    var type = req.body['type'];
    // 获取指定年月日数据
    var ymd = req.body['txtymd'];
    console.log('getdatas.js:type=[' + type + '] ymd=[' + ymd + ']');
    var data = getNetDataComm.dataCollectorStartup(type, ymd, function (err, data) {
        // console.log('数据插入前:' + data);
        if (err) {
            res.render('getdatas', {title: common.TITLE_GET_DATA, isgetdata: true, success: false, err: err});
        } else {
            //insert
            console.log('getdatas.js:type=[' + type + ']');
            // 个股实时资金流向排行
            if (type === '1') {
                console.log('getdatas.js:sttggzj insert.')
                sttggzj.create(data, function (err) {
                    if (err) {
                        // console.log('err');
                        res.render('getdatas', {
                            title: common.TITLE_GET_DATA,
                            isgetdata: true,
                            success: false,
                            err: err
                        });
                    } else {
                        // console.log('ok');
                        res.render('getdatas', {title: common.TITLE_GET_DATA, isgetdata: true, success: true});
                    }
                });
                // 主力净流入排名
            } else if (type === '2') {
                console.log('getdatas.js:sttzlzj insert.')
                sttzlzj.create(data, function (err) {
                    if (err) {
                        // console.log('err');
                        res.render('getdatas', {
                            title: common.TITLE_GET_DATA,
                            isgetdata: true,
                            success: false,
                            err: err
                        });
                    } else {
                        // console.log('ok');
                        res.render('getdatas', {title: common.TITLE_GET_DATA, isgetdata: true, success: true});
                    }
                });
                // 行业板块资金流向排行
            } else if (type === '3') {
                console.log('getdatas.js:stthybk insert.')
                stthybk.create(data, function (err) {
                    if (err) {
                        // console.log('err');
                        res.render('getdatas', {
                            title: common.TITLE_GET_DATA,
                            isgetdata: true,
                            success: false,
                            err: err
                        });
                    } else {
                        // console.log('ok');
                        res.render('getdatas', {title: common.TITLE_GET_DATA, isgetdata: true, success: true});
                    }
                });
            } else {
                // 什么都没有
            }
        }
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('getdatas', {title: common.TITLE_GET_DATA});
});

module.exports = router;