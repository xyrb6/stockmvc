/**
 * Created by Yu.S.Z on 2017/1/11.
 */
var common = require('../routes/common');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var sttmhybkggSchema = new Schema({
    hybkcode: String,
    hybkname: String,
    stockcode: String,
    stockname: String,
    marketdate: String
}, {versionKey: false});


var sttmhybkgg = mongodb.mongoose.model(common.TBL_sttmhybkgg, sttmhybkggSchema, common.TBL_sttmhybkgg);
var sttmhybkggDao = function () {
};

/*******
 保存
 ********/
sttmhybkggDao.prototype.save = function (obj, callback) {
    // console.log('插入一条数据');
    var instance = new sttmhybkgg(obj);
    instance.save(function (err) {
        callback(err);
    })
}

/*******
 删除全部数据
 ********/
sttmhybkggDao.prototype.remove = function (callback) {
    sttmhybkgg.remove(callback);
};

/*******
 批量保存
 ********/
sttmhybkggDao.prototype.create = function (obj, callback) {
    // console.log('批量插入，以下是插入数据:');
    // console.log(obj);
    sttmhybkgg.create(obj, function (err) {
        callback(err);
    })
}

/**
 按照代码精确查询
 **/
sttmhybkggDao.prototype.findByCode = function (code, callback) {
    sttmhybkgg.findOne({code: code}, function (err, obj) {
        callback(err, obj);
    });
}

/**
 查询所有数据。只抽出stockcode,hybkcode,hybkname。
 **/
sttmhybkggDao.prototype.find = function (callback) {
    sttmhybkgg.find(null, {stockcode: 1, hybkcode: 1, hybkname: 1, _id: 0}, function (err, obj) {
        callback(err, obj);
    });
}

module.exports = new sttmhybkggDao();
