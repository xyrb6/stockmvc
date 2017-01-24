/**
 * Created by Yu.S.Z on 2017/1/16.
 */
var common = require('./common');

/**
 * 根据从stthybk里面获取的JSON{code,total}数组转换成JSON{name,total}数组
 *
 * @param datas SON{code,total}数组
 * @returns {Array} JSON{name,total}数组
 */
module.exports.converthybkgroupdata = function(datas) {
    var rtnarr = new Array();
    datas.forEach(function (item, index, array) {
        var jsondata = {
            name: common.hybkmap.get(item._id),
            total: item.total
        };
        rtnarr.push(jsondata);
    });
    return rtnarr;
}

/**
 * 根据从sttzlzj/sttggzj里面获取的JSON{code,count}数组转换成JSON{code,name,count}数组
 *
 * @param datas SON{code,total}数组
 * @returns {Array} JSON{name,total}数组
 */
module.exports.convertgroupdata = function (datas) {
    var rtnarr = new Array();
    datas.forEach(function (item, index, array) {
        var jsondata = {
            code: item._id,
            name: common.ggmap.get(item._id),
            count: item.count
        };
        rtnarr.push(jsondata);
    });
    return rtnarr;
}

/**
 * 根据从stthybk里面获取的code变化成code:name形式的数组
 *
 * @param datas code数组
 * @returns {Array} code:name数组
 */
module.exports.converthybklisthavename = function(datas) {
    var rtnarr = new Array();
    datas.forEach(function (item, index, array) {
        rtnarr.push(item + ':' + common.hybkmap.get(item));
    });
    return rtnarr;
}

/**
 * 根据从sttmgg里面获取的JSON{code,name}数组转换成code:name数组
 *
 * @param datas JSON{code,name}数组
 * @returns {Array} code:name数组
 */
module.exports.convertsttmggwithcodename = function(datas) {
    var rtnarr = new Array();
    datas.forEach(function (item, index, array) {
        rtnarr.push(item.code + ':' + item.name);
    });
    return rtnarr;
}