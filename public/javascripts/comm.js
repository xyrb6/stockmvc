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
    // 自动补齐主力资金板块里面 股票名称(模糊查询)
    $('#txtstockname').autocomplete({
        source: function (req, res) {
            $.ajax({
                url: "/getmst",
                type: "POST",
                data: {name: req.term},
                dataType: "json",
                success: function (data) {
                    // 返回{code,name}转换成[name]
                    var arr = new Array();
                    for (var i = 0; i < data.length; i++) {
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

    // 自动补齐个股资金板块里面 股票名称(模糊查询)
    $('#txtstocknameOfgg').autocomplete({
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
                        arr.push(data[i].code + ":" + data[i].name);
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
        minLength: 1,
        select: function (e, ui) {
            // 表示div初始化
            $("#selcode").val("");
            $("#txtymd").val("");
            $("#selData").html("");
            $("#selRlt").html("");
            $("#chartData").html("");
            $("#chartData2").html("");

            // 获取数据
            $.ajax({
                url: "/getggzj",
                data: {code: ui.item.value, ymdfrom: ""},
                type: "POST",
                dataType: "json",
                cache: false,
                async: true
            })
                .done(function (json, textStatus, jqXHR) {
                    var echtdata = new Array();
                    var echtRanking = new Array();
                    var echtseriesdata = new Array();
                    var echtseriesdataOfParcent = new Array();
                    for (var i = 0; i < json.length; i++) {
                        // 查询股票个股资金流入详细
                        echtRanking.push(json[i].no);
                        echtdata.push(json[i].date);
                        echtseriesdata.push(json[i].curprice);
                        echtseriesdataOfParcent.push(json[i].parcent);
                    }

                    ggzjechartOfErea({
                        displayobj: $('#chartData')[0],
                        title: "价格走势(单位:元)",
                        xAxisdata: echtseriesdata,
                        seriesname: '收盘价',
                        seriesdata: echtdata
                    });

                    ggzjechartOfEreaMultiY({
                        displayobj: $('#chartData2')[0],
                        legends: ['资金流入占比', '收盘价', '资金流入排行'],
                        xAxisdataOfDate: echtdata,
                        yAxisdataOfPercent: echtseriesdataOfParcent,
                        yAxisdataOfCurrenPrice: echtseriesdata,
                        yAxisdataOfRanking: echtRanking,
                        yAxisdataOfPercentMax: echtseriesdataOfParcent.max() + 20, // 为了让图表更好看加了20的偏移量
                        yAxisdataOfMin: echtseriesdataOfParcent.min(), // 资金流入占比会出现负数，所以最小值以资金流入占比最小值为准。
                        yAxisdataOfCurrenPriceMax: echtseriesdata.max() + 20,
                        yAxisdataOfRankingMax: echtRanking.max() + 20
                    });
                })
                .fail(function (xhr, status, errorThrown) {
                    $('#selRlt').html("数据取得失败。" + xhr.responseText);
                })
                .always(function (xhr, status) {
                    // alert("The request is complete!");
                });
        }
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
