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
    parcent:Number
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
}

/*******
 批量保存
 ********/
sttggzjDao.prototype.create=function(obj,callback){
    // console.log('批量插入，以下是插入数据:');
    // console.log(obj);
    sttggzj.create(obj, function(err){
        callback(err);
    })
}

/**
 按照代码精确查询
 **/
sttggzjDao.prototype.findByCode=function(code,callback){
    sttggzj.findOne({code:code},function(err,obj){
        callback(err,obj);
    });
}

module.exports=new sttggzjDao();
