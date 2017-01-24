var express = require('express');
var router = express.Router();

var request = require('request');
var common = require('./common');
var commfunc = require('./commfunc');
var sttggzj = require('./../model/sttggzj');
var sttmgg = require('./../model/sttmgg');

/* GET home page. */
router.post('/', function (req, res, next) {
    // 功能:①股票代码不选:个股资金流入次数最多的前50只股票出现次数检索 ②只选股票代码:股票资金流入检索
    var code = req.body['code']
    var ymdfrom = req.body['ymdfrom']
    console.log('code:' + code + '  ymdfrom:' + ymdfrom);

    // 从 BK0539:综合行业 提取code
    code = code.split(':')[0];
    if (code) {
        // 查询股票个股资金流入详细
        sttggzj.findByConditons(code, ymdfrom, function (err, datas) {
            if (err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(900);
                res.send(JSON.stringify(err));
            } else {
                console.log(datas);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(datas));
            }
        });
    } else {
        // 查询个股资金流入次数最多的前50只股票
        sttggzj.groupBefore50(ymdfrom, function (err, datas) {
            if (err) {
                // console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.status(900);
                res.send(JSON.stringify(err));
            } else {
                console.log(datas);
                res.setHeader('Content-Type', 'application/json');
                res.send(commfunc.convertgroupdata(datas));
            }
        });
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    // 初期话股票代码下拉框
    sttmgg.findCodeAndName(function (err, datas) {
        // console.log('init datas:' + datas);
        if (err) {
            res.render('getggzj', {title: common.TITLE_GET_GGZJ, err: err});
        } else {
            res.render('getggzj', {title: common.TITLE_GET_GGZJ, codes: commfunc.convertsttmggwithcodename(datas)});
        }
    });
});

module.exports = router;