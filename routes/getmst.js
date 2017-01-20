var express = require('express');
var router = express.Router();

// var request = require('request');
var common = require('./common');
var getNetDataComm = require('./getNetDataComm');
var sttmgg=require('./../model/sttmgg');
var sttmhybk=require('./../model/sttmhybk');

/* GET home page. */
router.post('/', function(req, res, next) {
    var type = req.body['type'];
    // console.log('router:' + type);
    var data = getNetDataComm.dataMasterStartup(type, function (err, data) {
        // console.log('数据插入前:' + data);
        if (err) {
            res.render('getmst', {title: common.TITLE_GET_MST,isgetdata:true,success:false,err:err});
        } else {
            //insert
            // 个股实时资金流向排行
            if (type === common.type.ggzj) {
                console.log('sttmgg insert.')
                sttmgg.create(data,function(err){
                    if(err){
                        res.setHeader('Content-Type', 'application/json');
                        res.status(900);
                        res.send(err);
                    }else{
                        res.setHeader('Content-Type', 'application/json');
                        res.send(data);
                    }
                });
            // 行业板块资金流向排行
            } else if (type === common.type.hybk) {
                console.log('sttmhybk insert.')
                sttmhybk.create(data,function(err){
                    if(err){
                        res.setHeader('Content-Type', 'application/json');
                        res.status(900);
                        res.send(err);
                    }else{
                        res.setHeader('Content-Type', 'application/json');
                        res.send(data);
                    }
                });
            } else {
                // 什么都没有
            }
        }
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('getmst', {title: common.TITLE_GET_MST});
});

module.exports = router;