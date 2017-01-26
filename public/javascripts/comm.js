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
 * 导航栏固定于page上部
 */
$(function () {
    var navOffset = $("#menu").offset().top;
    $(window).scroll(function () {
        var scrollPos = $(window).scrollTop();
        if (scrollPos >= navOffset) {
            $("#menu").addClass("fixed");
        } else {
            $("#menu").removeClass("fixed");
        }
    });
});

/**
 * 股票名称(模糊查询) 自动补全
 */
$(function () {
    $('#txtstockname').autocomplete({
        source: function (req, res) {
            $.ajax({
                url: "/getmst",
                type: "POST",
                data: {name: req.term},
                dataType: "json",
                success: function (data) {
                    // 返回{code,name}转换成[code:name]
                    var arr = new Array();
                    for (var i = 0; i < data.length; i++) {
                        // arr.push(data[i].code + ":" + data[i].name);
                        arr.push(data[i].name);
                    }
                    res(arr);
                },
                error: function (xhr, ts, err) {
                    res(['']);
                }
            });
        },
        autoFocus: true,
        delay: 100,
        minLength: 1
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
