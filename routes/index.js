var express = require('express');
var router = express.Router();
var common = require('./common');
var sttmhybk=require('./../model/sttmhybk');
var sttmgg=require('./../model/sttmgg');

/* GET home page. */
router.get('/', function(req, res, next) {
  sttmhybk.findALL(function(err, data) {
    if (err) {
      res.render('index', { title: 'Express', err:'初期数据查询失败。' + err });
    } else {
      // 初期化行业板块列表（后续code to name的时候使用）
      data.forEach(function (item, index, array) {
        // console.log(item.code, item.name);
        common.hybkmap.set(item.code, item.name);
      });
      // res.render('index', { title: 'Express'});
    }
  });

    sttmgg.findCodeAndName(function(err, data) {
        if (err) {
            res.render('index', { title: 'Express', err:'初期数据查询失败。' + err });
        } else {
            // 初期化股票列表（后续code to name的时候使用）
            data.forEach(function (item, index, array) {
                // console.log(item.code, item.name);
                common.ggmap.set(item.code, item.name);
            });
            // res.render('index', { title: 'Express'});
        }
    });
    res.render('index', { title: 'Express'});
});

module.exports = router;
