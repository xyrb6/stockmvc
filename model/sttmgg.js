/**
 * Created by Yu.S.Z on 2017/1/11.
 */
var common = require('../routes/common');
var mongodb=require('./mongodb');
var Schema=mongodb.mongoose.Schema;

var sttmggSchema=new Schema({
    code:String,
    name:String
},{versionKey:false});


var sttmgg=mongodb.mongoose.model(common.TBL_sttmgg, sttmggSchema, common.TBL_sttmgg);
var sttmggDao=function(){};

/*******
 保存
 ********/
sttmggDao.prototype.save=function(obj,callback){
    // console.log('插入一条数据');
    var instance = new sttmgg(obj);
    instance.save(function(err){
        callback(err);
    })
}

/*******
 删除全部数据
 ********/
sttmggDao.prototype.remove = function (callback) {
    sttmgg.remove(callback);
};

/*******
 批量保存
 ********/
sttmggDao.prototype.create=function(obj,callback){
    // console.log('批量插入，以下是插入数据:');
    // console.log(obj);
    sttmgg.create(obj, function(err){
        callback(err);
    })
}

/**
 按照代码精确查询
 **/
sttmggDao.prototype.findByCode=function(code,callback){
    sttmgg.findOne({code:code},function(err,obj){
        callback(err,obj);
    });
}

/**
 查询所有数据。只抽出code,name。
 **/
sttmggDao.prototype.findCodeAndName=function(callback){
    sttmgg.find().sort({code: 1}).select({code: 1, name: 1, _id: 0}).exec(function(err,obj){
        callback(err,obj);
    });
}

/**
 * 根据指定条件查询数据
 **/
sttmggDao.prototype.findCodeAndNameWithNameLike = function (name, callback) {
    sttmgg.find({name: {$regex: name, $options: 'i'}}, 'code name -_id', function (err, docs) {
        callback(err, docs);
    })
}

module.exports=new sttmggDao();
