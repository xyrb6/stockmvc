/**
 * Created by Yu.S.Z on 2017/1/11.
 */
var common = require('../routes/common');
var mongodb=require('./mongodb');
var Schema=mongodb.mongoose.Schema;

var sttggzjSchema=new Schema({
    no:Number,
    date:String,
    market:String,
    code:String,
    curprice:String,//停牌股票没有当日价格 数据表示为【-】
    parcent: Number,
    hybkcode: String,
    hybkname: String,
    money: Number
},{versionKey:false});


var sttggzj=mongodb.mongoose.model(common.TBL_sttggzj, sttggzjSchema, common.TBL_sttggzj);
var sttggzjDao=function(){};

/*******
 保存
 ********/
sttggzjDao.prototype.save=function(obj,callback){
    // console.log('插入一条数据');
    var instance = new sttggzj(obj);
    instance.save(function(err){
        callback(err);
    })
};

/*******
 批量保存
 ********/
sttggzjDao.prototype.create=function(obj,callback){
    // console.log('批量插入，以下是插入数据:');
    // console.log(obj);
    sttggzj.create(obj, function(err){
        callback(err);
    })
};

/**
 按照代码精确查询
 **/
sttggzjDao.prototype.findByCode=function(code,callback){
    sttggzj.findOne({code:code},function(err,obj){
        callback(err,obj);
    });
};

/**
 按照条件查询
 **/
sttggzjDao.prototype.findByConditons = function (code, ymdfrom, callback) {
    // console.log('code:' + code + '  ymdfrom:' + ymdfrom);
    var query = sttggzj.find();
    if (code) query.where('code').equals(code);
    if (ymdfrom) query.where('date').gte(ymdfrom);
    query.select('no date curprice parcent -_id');
    query.sort({date: 1, curprice: 1});
    query.exec(callback);
};

/**
 所有code求和
 **/
sttggzjDao.prototype.groupBefore50 = function (ymdfrom, callback) {
    if (ymdfrom) {
        sttggzj.aggregate(
            [
                {$match: {$and: [{date: {$gte: ymdfrom}}, {no: {$lte: common.selectCnt}}]}}
                , {$group: {_id: "$code", count: {$sum: 1}}}
                , {$sort: {count: -1}}
                , {$limit: common.selectCnt}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
    } else {
        sttggzj.aggregate(
            [
                {$match: {no: {$lte: common.selectCnt}}}
                , {$group: {_id: "$code", count: {$sum: 1}}}
                , {$sort: {count: -1}}
                , {$limit: common.selectCnt}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
    }
};

/**
 更新行业板块数据
 **/
sttggzjDao.prototype.update = function (code, hybkcode, hybkname, callback) {
    console.log('code:' + code + ' hybkcode:' + hybkcode + ' hybkname:' + hybkname);
//    var conditions = {'code': code, 'hybkcode': ""};
    var conditions = {'code': code};
    var doc = {$set: {'hybkcode': hybkcode, 'hybkname': hybkname}};
    var options = {multi: true};

    sttggzj.update(conditions, doc, options, function (err, res) {
        callback(err, res);
    });
};

/**
 查询指定行业板块+指定开始日期的个股主力流入资金统计情况
 **/
sttggzjDao.prototype.groupByHybk = function (hybkcode, ymdfrom, callback) {
    hybkcode = hybkcode + "1";
    console.log("hybk:[" + hybkcode + "],ymdfrom:[" + ymdfrom + "]");
    if (ymdfrom) {
        sttggzj.aggregate(
            [
                {$match: {$and: [{date: {$gte: ymdfrom}}, {hybkcode: hybkcode}]}}
                , {$group: {_id: "$code", total: {$sum: "$money"}}}
                , {$sort: {total: -1}}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
    } else {
        sttggzj.aggregate(
            [
                {$match: {hybkcode: hybkcode}}
                , {$group: {_id: "$code", total: {$sum: "$money"}}}
                , {$sort: {total: -1}}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
    }
};

module.exports=new sttggzjDao();
