var express = require('express');
var router = express.Router();

// var request = require('request');
var common = require('./common');
var getNetDataComm = require('./getNetDataComm');
var sttmgg=require('./../model/sttmgg');
var sttmhybk=require('./../model/sttmhybk');
var sttmhybkgg = require('./../model/sttmhybkgg');

var sttggzj = require('./../model/sttggzj');
var sttzlzj = require('./../model/sttzlzj');

/* GET home page. */
router.post('/', function(req, res, next) {
    var type = req.body['type'];
    var name = req.body['name'];
    console.log('type:' + type + " name:" + name);
    // 从网络取得数据
    if (type) {
        console.log('this is go to type.');
        if (type == 'updategg') {
            console.log('this is update gg data.');
            sttmhybkgg.find(function (err, datas) {
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(900);
                    res.send(JSON.stringify(err));
                } else {
                    var updateresponse = new Array();
                    datas.forEach(function (item, index, array) {
                        sttggzj.update(item.stockcode, item.hybkcode, item.hybkname, function (err, response) {
                            if (err) {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(900);
                                res.send(err);
                            } else {
                                updateresponse.push(response);
                            }
                        });
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.send(updateresponse);
                }
            });
        } else if (type == 'updatezl') {
            console.log('this is update zl data.');
            sttmhybkgg.find(function (err, datas) {
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(900);
                    res.send(JSON.stringify(err));
                } else {
                    var updateresponse = new Array();
                    datas.forEach(function (item, index, array) {
                        sttzlzj.update(item.stockcode, item.hybkcode, item.hybkname, function (err, response) {
                            if (err) {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(900);
                                res.send(err);
                            } else {
                                // console.log(response);
                                updateresponse.push(response);
                            }
                        });
                    });
                    // console.log(updateresponse);
                    res.setHeader('Content-Type', 'application/json');
                    res.send(updateresponse);
                }
            });
        } else {
            console.log('this is get net data.');
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
    }
    ;
    // 根据股票名称检索数据（从个股资金,主力资金画面检索）
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