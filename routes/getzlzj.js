var express = require('express');
var router = express.Router();

var request = require('request');
var common = require('./common');
var commfunc = require('./commfunc');
var sttzlzj = require('./../model/sttzlzj');
var sttmgg = require('./../model/sttmgg');

/* GET home page. */
router.post('/', function (req, res, next) {
    // 功能:①股票代码不选:主力资金流入次数最多的前50只股票出现次数检索 ②只选股票代码:股票资金流入检索
    var code = req.body['code']
    var ymdfrom = req.body['ymdfrom']
    console.log('code:' + code + '  ymdfrom:' + ymdfrom);

    // 从 BK0539:综合行业 提取code
    code = code.split(':')[0];
    // console.log(code);
    if (code) {
        // 查询股票主力资金流入详细
        sttzlzj.findByConditons(code, ymdfrom, function (err, datas) {
            if (err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(900);
                res.send(JSON.stringify(err));
            } else {
                // console.log(datas);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(datas));
            }
        });
    } else {
        // 查询主力资金流入次数最多的前50只股票
        sttzlzj.groupBefore50(ymdfrom, function (err, datas) {
            if (err) {
                // console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.status(900);
                res.send(JSON.stringify(err));
            } else {
                res.setHeader('Content-Type', 'application/json');
                // console.log(datas);
                // console.log(commfunc.convertzlzjgroupdata(datas));
                // res.send(JSON.stringify(commfunc.convertzlzjgroupdata(datas)));
                res.send(commfunc.convertzlzjgroupdata(datas));
            }
        });
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    // 初期话股票代码下拉框
    sttmgg.findCodeAndName(function (err, datas) {
        if (err) {
            res.render('getzlzj', {title: common.TITLE_GET_ZLZJ, err: err});
        } else {
            res.render('getzlzj', {title: common.TITLE_GET_ZLZJ, codes: commfunc.convertsttmggwithcodename(datas)});
        }
    });
});

module.exports = router;