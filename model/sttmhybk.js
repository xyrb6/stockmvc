/**
 * Created by Yu.S.Z on 2017/1/11.
 */
var common = require('../routes/common');
var mongodb=require('./mongodb');
var Schema=mongodb.mongoose.Schema;

var sttmhybkSchema=new Schema({
    code:String,
    name:String
},{versionKey:false});


var sttmhybk=mongodb.mongoose.model(common.TBL_sttmhybk, sttmhybkSchema, common.TBL_sttmhybk);
var sttmhybkDao=function(){};

/*******
 保存
 ********/
sttmhybkDao.prototype.save=function(obj,callback){
    // console.log('插入一条数据');
    var instance = new sttmhybk(obj);
    instance.save(function(err){
        callback(err);
    })
}

/*******
 删除全部数据
 ********/
sttmhybkDao.prototype.remove = function (callback) {
    sttmhybk.remove(callback);
};

/*******
 批量保存
 ********/
sttmhybkDao.prototype.create=function(obj,callback){
    // console.log('批量插入，以下是插入数据:');
    // console.log(obj);
    sttmhybk.create(obj, function(err){
        callback(err);
    })
}

/**
 按照代码精确查询
 **/
sttmhybkDao.prototype.findByCode=function(code,callback){
    sttmhybk.findOne({code:code},function(err,obj){
        callback(err,obj);
    });
}

/**
 查询所有数据。只抽出code,name。
 **/
sttmhybkDao.prototype.findALL=function(callback){
    sttmhybk.find(null, {code: 1, name: 1, _id: 0},function(err,obj){
        callback(err,obj);
    });
}

module.exports=new sttmhybkDao();
