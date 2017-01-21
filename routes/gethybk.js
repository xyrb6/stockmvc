var express = require('express');
var router = express.Router();

var request = require('request');
var common = require('./common');
var commfunc = require('./commfunc');
var stthybk=require('./../model/stthybk');

/* GET home page. */
router.post('/', function(req, res, next) {
    // ymd和ymdfrom不能同时指定（前台已验证）
    var code = req.body['code']
    var ymd = req.body['ymd']
    var ishybkdetail = req.body['ishybkdetail']
    var ymdfrom = req.body['ymdfrom']
    // 从 BK0539:综合行业 提取code
    code = code.split(':')[0];
    console.log("code:" + code + " ymd:" + ymd + " ymdfrom:" + ymdfrom + ' ishybkdetail:' + ishybkdetail);

    if (code && ishybkdetail) {
        console.log("个股详情");
        // 个股详细
        // 板块代码+详细复选框 查询板块详细
        // ymdfrom有设定：抽出大于等于ymdfrom的指定板块数据
        // ymdfrom没有设定：抽出数据库中指定板块的所有数据
        stthybk.findByCode(code, ymdfrom, function (err, datas) {
            if (err) {
                res.render('gethybk', {title: common.TITLE_GET_HYBK, err: err});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(datas));
            }
        });
    } else {
        // 统计
        if (code) {
            console.log("个股统计");
            // 抽出设定板块的数据
            // ymd有设定:抽出指定日指定板块的统计数据
            // ymdfrom有设定:抽出大于等于ymdfrom的指定板块的统计数据
            // ymd,ymdfrom都没设定:抽出指定所有统计数据
            stthybk.groupByConditons(code, ymd, ymdfrom, function (err, datas) {
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(900);
                    res.send(JSON.stringify(err));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(commfunc.converthybkgroupdata(datas)));
                }
            });
        } else {
            console.log("全部统计");
            // 抽出所有板块的数据
            // ymd有设定:抽出指定日所有板块的统计数据
            // ymdfrom有设定:抽出大于等于ymdfrom的所有板块的统计数据
            // ymd,ymdfrom有设定:抽出所有板块的所有统计数据
            stthybk.groupAll(ymd, ymdfrom, function (err, datas) {
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(900);
                    res.send(JSON.stringify(err));
                } else {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(commfunc.converthybkgroupdata(datas)));
                }
            });
        }
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    stthybk.findCodeList(function(err, datas) {
        if (err) {
            res.render('gethybk', {title: common.TITLE_GET_HYBK,err:err});
        } else {
            // console.log(datas);
            res.render('gethybk', {title: common.TITLE_GET_HYBK,codes:commfunc.converthybklisthavename(datas.sort())});
        }
    });
});

module.exports = router;