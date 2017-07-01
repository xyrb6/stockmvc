var express = require('express');
var router = express.Router();

// var request = require('request');
var common = require('./common');
var getNetDataComm = require('./getNetDataComm');
var sttmgg=require('./../model/sttmgg');
var sttmhybk=require('./../model/sttmhybk');
var sttmhybkgg = require('./../model/sttmhybkgg');

/* GET home page. */
router.post('/', function(req, res, next) {
    var type = req.body['type'];
    var name = req.body['name'];
    console.log('type:' + type + " name:" + name);
    // 从网络取得数据
    if (type) {
        var data = getNetDataComm.dataMasterStartup(type, function (err, data) {
            // console.log('数据插入前:' + data);
            if (err) {
                res.render('getmst', {title: common.TITLE_GET_MST, isgetdata: true, success: false, err: err});
            } else {
                //insert
                // 个股实时资金流向排行
                if (type === common.type.ggzj) {
                    console.log('sttmgg delete.')
                    sttmgg.remove(function (err) {
                        if (!err) {
                            console.log('sttmgg insert.')
                            // 成功删除数据后批量插入数据
                            sttmgg.create(data, function (err) {
                                if (err) {
                                    res.setHeader('Content-Type', 'application/json');
                                    res.status(900);
                                    res.send(err);
                                } else {
                                    res.setHeader('Content-Type', 'application/json');
                                    res.send(data);
                                }
                            });
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            res.status(900);
                            res.send(err);
                        }
                    });
                    // 行业板块资金流向排行
                } else if (type === common.type.hybk) {
                    console.log('sttmhybk delete.')
                    sttmhybk.remove(function (err) {
                        console.log(err);
                        if (!err) {
                            console.log('sttmhybk insert.')
                            // 成功删除数据后批量插入数据
                            sttmhybk.create(data, function (err) {
                                if (err) {
                                    res.setHeader('Content-Type', 'application/json');
                                    res.status(900);
                                    res.send(err);
                                } else {
                                    res.setHeader('Content-Type', 'application/json');
                                    res.send(data);
                                }
                            });
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            res.status(900);
                            res.send(err);
                        }
                    });
                    // 主力资金流向排行
                } else if (type === common.type.zlzj) {
                    console.log('sttmhybkgg delete.')
                    sttmhybkgg.remove(function (err) {
                        console.log(err);
                        if (!err) {
                            console.log('sttmhybkgg insert.')
                            // 成功删除数据后批量插入数据
                            sttmhybkgg.create(data, function (err) {
                                if (err) {
                                    res.setHeader('Content-Type', 'application/json');
                                    res.status(900);
                                    res.send(err);
                                } else {
                                    res.setHeader('Content-Type', 'application/json');
                                    res.send(data);
                                }
                            });
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            res.status(900);
                            res.send(err);
                        }
                    });
                } else {
                    // 什么都没有
                }
            }
        });
    }
    ;
    // 根据股票名称检索数据
    if (name) {
        sttmgg.findCodeAndNameWithNameLike(name, function (err, datas) {
            console.log('err: ' + err);
            console.log('datas: ' + datas);
            if (err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(900);
                res.send(err);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(datas);
            }
        });
    }
    ;
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('getmst', {title: common.TITLE_GET_MST});
});

module.exports = router;