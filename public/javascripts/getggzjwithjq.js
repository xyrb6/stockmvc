/**
 * Created by Yu.S.Z on 2017/1/17.
 */

$(document).ready(function () {

    $("#frmgetggzj").submit(function (event) {
        // 阻止表单自动提交
        event.preventDefault();
        // 获取参数
        var code = $("#selcode").val();
        var ymdfrom = $("#txtymd").val();
        // 表示div初始化
        $("#selData").html("");
        $("#selRlt").html("");
        $("#chartData").html("");
        $("#chartData2").html("");
        // 获取数据
        $.ajax({
            // The URL for the request
            url: "/getggzj",
            // The data to send (will be converted to a query string)
            data: {code: code, ymdfrom: ymdfrom},
            // Whether this is a POST or GET request
            type: "POST",
            // The type of data we expect back
            dataType: "json",
            cache: false,
            async: true
        })
        // Code to run if the request succeeds (is done);
        // The response is passed to the function
            .done(function (json, textStatus, jqXHR) {

                // 有数据就显示图表
                if (json != "") {
                    var echtdata = new Array();
                    var echtseriesdata = new Array();
                    var echtseriesdataOfPacent = new Array();
                    // alert(json.length);
                    for (var i = 0; i < json.length; i++) {
                        // alert(jsondata);
                        if (code) {
                            // 查询股票个股资金流入详细
                            echtdata.push(json[i].date);
                            echtseriesdata.push(json[i].curprice);
                            echtseriesdataOfPacent.push(json[i].parcent);
                        } else {
                            // 查询个股资金流入次数最多的前50只股票
                            echtdata.push(json[i].name);
                            echtseriesdata.push(json[i].count);
                        }
                    }

                    // 指定股票代码时就显示股票详细信息
                    if (code) {
                        ggzjechartOfErea({
                            // displayobj: document.getElementById('chartData'),
                            displayobj: $('#chartData')[0],
                            title: "价格走势(单位:元)",
                            xAxisdata: echtseriesdata,
                            seriesname: '收盘价',
                            seriesdata: echtdata
                        });

                        ggzjechartOfErea({
                            // displayobj: document.getElementById('chartData2'),
                            displayobj: $('#chartData2')[0],
                            title: "个股资金流向走势(单位:%)",
                            xAxisdata: echtseriesdataOfPacent,
                            seriesname: '流入率',
                            seriesdata: echtdata
                        });
                    } else {
                        // 没有指定股票代码时就显示统计信息
                        // 动态添加数据div
                        var innerHtml = "<table>"
                        for (var i = 0; i < json.length; i++) {
                            // 被10整除就重新生成一个tr
                            if (i % 10 == 0) {
                                innerHtml = innerHtml + "<tr>";
                            }
                            // 添加td
                            innerHtml = innerHtml + "<td><input type='radio' name='rdocodelist' value='" +
                                json[i].code + "' />" + json[i].name + "[" + json[i].count + "]</td>";
                            // 被10整除就重新生成一个tr(初次从1开始计算)
                            if ((i + 1) % 10 == 0) {
                                innerHtml = innerHtml + "</tr>";
                            }
                        }
                        innerHtml = innerHtml + "<tr><td><input type='submit' name='btncodelist' value='个股详细'/></td><td colspan='9'/></tr>";
                        innerHtml = innerHtml + "</table>";
                        $("#selData").html(innerHtml);

                        // chartdiv
                        ggzjechartOfColumn({
                            title: "资金流入前50强次数",
                            legend: ['次数'],
                            data: echtdata,
                            seriesname: ['次数'],
                            seriestype: 'bar',
                            seriesdata: echtseriesdata
                        });
                    }
                } else {
                    $('#selRlt').html("没有数据。");
                }
            })
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            .fail(function (xhr, status, errorThrown) {
                $('#selRlt').html("数据取得失败。" + xhr.responseText);
            })
            // Code to run regardless of success or failure;
            .always(function (xhr, status) {
                // alert("The request is complete!");
            });
    });

    // 显示个股详细信息
    $("#frmgetggzjggdetail").submit(function (event) {
        // 阻止表单自动提交
        event.preventDefault();
        // 获取参数
        var code = $("input[name='rdocodelist']:checked").val();

        // 表示div初始化
        // $("#selData").html("");
        $("#selRlt").html("");
        $("#chartData").html("");
        $("#chartData2").html("");

        // 验证是否有选中股票
        if (!code) {
            $("#selRlt").html("必须选中一只股票。");
            return false;
        }
        // 获取数据
        $.ajax({
            // The URL for the request
            url: "/getggzj",
            // The data to send (will be converted to a query string)
            data: {code: code, ymdfrom: ""},
            // Whether this is a POST or GET request
            type: "POST",
            // The type of data we expect back
            dataType: "json",
            cache: false,
            async: true
        })
        // Code to run if the request succeeds (is done);
        // The response is passed to the function
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
                    // displayobj: document.getElementById('chartData'),
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
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            .fail(function (xhr, status, errorThrown) {
                $('#selRlt').html("数据取得失败。" + xhr.responseText);
            })
            // Code to run regardless of success or failure;
            .always(function (xhr, status) {
                // alert("The request is complete!");
            });
    });
});
