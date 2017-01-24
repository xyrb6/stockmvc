/**
 * Created by Yu.S.Z on 2017/1/21.
 */
/**
 * YYYYMMDD格式日期选择器
 */
$(function () {
    $("#txtymd").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "yymmdd"
    });

    $("#txtymdfrom").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "yymmdd"
    });
});

/**
 * 取数组中最大值
 * @returns {*} 最大值
 */
Array.prototype.min = function () {
    if (this[0] == '-') {
        var min = 999;
    } else {
        var min = parseFloat(this[0]);
    }

    var len = this.length;
    for (var i = 1; i < len; i++) {
        if (this[i] == '-') {
            var element = 999;
        } else {
            var element = parseFloat(this[i]);
        }

        if (element < min) {
            min = element;
        }
    }
    return min;
};

/**
 * 取数组中最小值
 * @returns {*} 最小值
 */
Array.prototype.max = function () {

    if (this[0] == '-') {
        var max = -999;
    } else {
        var max = parseFloat(this[0]);
    }

    var len = this.length;
    for (var i = 1; i < len; i++) {
        if (this[i] == '-') {
            var element = -999;
        } else {
            var element = parseFloat(this[i]);
        }

        if (element > max) {
            max = element;
        }
    }
    return max;
};
