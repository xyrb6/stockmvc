/**
 * Created by Yu.S.Z on 2017/1/11.
 */
var common = require('../routes/common');
var mongodb=require('./mongodb');
var Schema=mongodb.mongoose.Schema;

var sttzlzjSchema=new Schema({
    no:Number,
    date:String,
    market:String,
    code:String,
    curprice:String,//停牌股票没有当日价格 数据表示为【-】
    parcent: Number,
    hybkcode: String,
    hybkname: String
},{versionKey:false});


var sttzlzj=mongodb.mongoose.model(common.TBL_sttzlzj, sttzlzjSchema, common.TBL_sttzlzj);
var sttzlzjDao=function(){};

/*******
 保存
 ********/
sttzlzjDao.prototype.save=function(obj,callback){
    // console.log('插入一条数据');
    var instance = new sttzlzj(obj);
    instance.save(function(err){
        callback(err);
    })
};

/*******
 批量保存
 ********/
sttzlzjDao.prototype.create=function(obj,callback){
    // console.log('批量插入，以下是插入数据:');
    // console.log(obj);
    sttzlzj.create(obj, function(err){
        callback(err);
    })
};

/**
 按照条件查询
 **/
sttzlzjDao.prototype.findByConditons=function(code, ymdfrom, callback){
    // console.log('code:' + code + '  ymdfrom:' + ymdfrom);
    var query = sttzlzj.find();
    if (code) query.where('code').equals(code);
    if (ymdfrom) query.where('date').gte(ymdfrom);
    query.select('date curprice parcent -_id');
    query.sort({date: 1, curprice: 1});
    query.exec(callback);
};

/**
 所有code求和
 **/
sttzlzjDao.prototype.groupBefore50=function(ymdfrom, callback){
    if (ymdfrom) {
        sttzlzj.aggregate(
            [
                { $match: { $and: [{date: { $gte: ymdfrom }},{no: { $lte: common.selectCnt }}]}}
                , { $group: { _id : "$code" , count: { $sum: 1 }}}
                , { $sort: {count: -1}}
                , { $limit: common.selectCnt}
            ]
            , function (err, res) {
                callback(err, res);
            }
        );
    } else {
        sttzlzj.aggregate(
            [
                { $match: {no: { $lte: common.selectCnt }}}
                , { $group: { _id : "$code" , count: { $sum: 1 }}}
                , { $sort: {count: -1}}
                , { $limit: common.selectCnt}
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
sttzlzjDao.prototype.update = function (code, hybkcode, hybkname, callback) {
    // console.log('code:' + code + ' hybkcode:' + hybkcode + ' hybkname:' + hybkname);
//    var conditions = {'code': code, 'hybkcode': ""};
    var conditions = {'code': code};
    var doc = {$set: {'hybkcode': hybkcode, 'hybkname': hybkname}};
    var options = {multi: true};

    sttzlzj.update(conditions, doc, options, function (err, res) {
        callback(err, res);
    });
};

module.exports=new sttzlzjDao();
