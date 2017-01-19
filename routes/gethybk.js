var express = require('express');
var router = express.Router();

var request = require('request');
var common = require('./common');
var commfunc = require('./commfunc');
var stthybk=require('./../model/stthybk');

/* GET home page. */
router.post('/', function(req, res, next) {
  var code = req.body['code']
  var ymd = req.body['ymd']
  var ishybkdetail = req.body['ishybkdetail']
  console.log('ishybkdetail:' + ishybkdetail);
  // 从 BK0539:综合行业 提取code
  code = code.split(':')[0];

    if (code && ishybkdetail && !ymd) {
        // 以code,ymd为条件查询
        stthybk.findByCode(code, function(err, datas) {
          if (err) {
              res.render('gethybk', {title: common.TITLE_GET_HYBK,err:err});
          } else {
              // console.log(datas);
              // res.render('gethybk', {title: common.TITLE_GET_HYBK,datas:datas});
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(datas));
          }
        });
    } else if (!code && !ymd) {
        // 以所有code求和
        stthybk.groupAll(function(err, datas) {
            if (err) {
                // res.render('gethybk', {title: common.TITLE_GET_HYBK,err:err});
                res.setHeader('Content-Type', 'application/json');
                res.status(900);
                res.send(JSON.stringify(err));
            } else {
                // console.log(datas);
                // res.render('gethybk', {title: common.TITLE_GET_HYBK,datas:datas});
                res.setHeader('Content-Type', 'application/json');
                // res.send(JSON.stringify(datas));
                res.send(JSON.stringify(commfunc.converthybkgroupdata(datas)));
            }
        });
    } else {
        // 以条件求和
        stthybk.groupByConditons(code, ymd, function(err, datas) {
            if (err) {
                // res.render('gethybk', {title: common.TITLE_GET_HYBK,err:err});
                // console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.status(900);
                res.send(JSON.stringify(err));
            } else {
                // console.log(datas);
                // res.render('gethybk', {title: common.TITLE_GET_HYBK,datas:datas});
                res.setHeader('Content-Type', 'application/json');
                // res.send(JSON.stringify(datas));
                res.send(JSON.stringify(commfunc.converthybkgroupdata(datas)));
            }
        });
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    // var code = req.body['code']
    // var ymd = req.body['ymd']
    // console.log('router code:' + code);
    // console.log('router ymd:' + ymd);
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