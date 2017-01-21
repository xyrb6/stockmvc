/**
 * Created by Yu.S.Z on 2017/1/11.
 */
var common = require('../routes/common');
var mongodb=require('./mongodb');
var Schema=mongodb.mongoose.Schema;

var stthybkSchema=new Schema({
    no:Number,
    date:String,
    code:String,
    money:Number
},{versionKey:false});


var stthybk=mongodb.mongoose.model(common.TBL_stthybk, stthybkSchema, common.TBL_stthybk);
var stthybkDao=function(){};

/*******
 保存
 ********/
stthybkDao.prototype.save=function(obj,callback){
    console.log('插入一条数据');
    var instance = new stthybk(obj);
    instance.save(function(err){
        callback(err);
    })
}

/*******
 批量保存
 ********/
stthybkDao.prototype.create=function(obj,callback){
    // console.log('批量插入，以下是插入数据:');
    // console.log(obj);
    stthybk.create(obj, function(err){
        callback(err);
    })
}

/**
 按照代码精确查询
 **/
stthybkDao.prototype.findByCode = function (code, ymdfrom, callback) {
    if (ymdfrom) {
        stthybk.find({$and: [{code: code}, {date: {$gte: ymdfrom}}]}, {date: 1, money: 1, _id: 0}, function (err, obj) {
            callback(err, obj);
        });
    } else {
        // console.log("code:" + code + " ymdfrom:" + ymdfrom);
        stthybk.find({code: code}, {date: 1, money: 1, _id: 0}, function (err, obj) {
            callback(err, obj);
        });
    }
}

/**
 按照条件查询
 **/
stthybkDao.prototype.find=function(code, ymd, callback){
    // stthybk.find(where,function(err,obj){
    //         callback(err,obj);
    // });
    // console.log('router code:' + code);
    // console.log('router ymd:' + ymd);
    var query = stthybk.find();
    if (code) query.where('code').equals(code);
    if (ymd) query.where('date').equals(ymd);
    // query.select('no date code money -_id');
    query.sort({code: 1, date: 1});
    // console.log(query);
    query.exec(callback);
}

/**
 按照code求和
 **/
stthybkDao.prototype.groupByConditons = function (code, ymd, ymdfrom, callback) {
    if (code && ymd && !ymdfrom) {
        // 指定板块&指定日
        stthybk.aggregate(
            [
                {$match: {$and: [{code :  code },{date:  ymd }]}}
                , { $group: { _id : "$code" , total: { $sum: '$money' }}}
                , { $sort: {_id: 1}}
                // , { $project: { _id: 1, total: 1 }}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
    } else if (code && !ymd && !ymdfrom) {
        // 仅指定板块
        stthybk.aggregate(
            [
                {$match: {code : code }}
                , { $group: { _id : "$code" , total: { $sum: '$money' }}}
                , { $sort: {_id: 1}}
                // , { $project: { _id: 1, total: 1 }}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
    } else if (code && !ymd && ymdfrom) {
        // 指定板块&指定开始日
        stthybk.aggregate(
            [
                {$match: {$and: [{code: code}, {date: {$gte: ymdfrom}}]}}
                , { $group: { _id : "$code" , total: { $sum: '$money' }}}
                , { $sort: {_id: 1}}
                // , { $project: { _id: 1, total: 1 }}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
    } else {
        // 什么都没有
    }
}

/**
 所有code求和
 **/
stthybkDao.prototype.groupAll = function (ymd, ymdfrom, callback) {
    if (ymdfrom) {
        // 仅指定了开始日期
        stthybk.aggregate(
            [
                {$match: {date: {$gte: ymdfrom}}}
                , {$group: {_id: "$code", total: {$sum: '$money'}}}
                , {$sort: {_id: 1}}
                // , { $project: { _id: 1, total: 1 }}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
        // 仅指定了数据日期
    } else if (ymd) {
        stthybk.aggregate(
            [
                {$match: {date: ymd}}
                , {$group: {_id: "$code", total: {$sum: '$money'}}}
                , {$sort: {_id: 1}}
                // , { $project: { _id: 1, total: 1 }}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
    } else {
        // 什么项目都没有指定
        stthybk.aggregate(
            [
                {$group: {_id: "$code", total: {$sum: '$money'}}}
                , {$sort: {_id: 1}}
                // , { $project: { _id: 1, total: 1 }}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
    }
}

/**
 查询代码列表
 **/
stthybkDao.prototype.findCodeList=function(callback){
    // With a JSON doc
    var query = stthybk.distinct('code');
    query.exec(callback);
    }

module.exports=new stthybkDao();
