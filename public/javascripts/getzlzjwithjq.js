/**
 * Created by Yu.S.Z on 2017/1/17.
 */

$(document).ready(function () {

    $("#frmgetzlzj").submit(function (event) {

        // 注释部分是例子
        // var inputtedPhoneNumber = $( "#phone" ).val();
        //
        // // Match only numbers
        // var phoneNumberRegex = /^\d*$/;
        //
        // // If the phone number doesn't match the regex
        // if ( !phoneNumberRegex.test( inputtedPhoneNumber ) ) {
        //
        //     // Usually show some kind of error message here
        //
        // Prevent the form from submitting 阻止对表单的提交。
        event.preventDefault();
        // } else {
        //
        //     // Run $.ajax() here
        // }

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
            url: "/getzlzj",
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
                // $("<h1>").text(json.title).appendTo("body");
                // $("<div class=\"content\">").html(json.html).appendTo("body");

                // alert(json[0].date);
                // alert(jqXHR.responseText);
                // alert(json);
                if (json != "") {
                    var echtdata = new Array();
                    var echtseriesdata = new Array();
                    var echtseriesdataOfPacent = new Array();
                    // alert(json.length);
                    for (var i = 0; i < json.length; i++) {
                        // alert(jsondata);
                        if (code) {
                            // 查询股票主力资金流入详细
                            echtdata.push(json[i].date);
                            echtseriesdata.push(json[i].curprice);
                            echtseriesdataOfPacent.push(json[i].parcent);
                        } else {
                            // 询主力资金流入次数最多的前50只股票
                            echtdata.push(json[i].name);
                            echtseriesdata.push(json[i].count);
                        }
                    }

                    // alert(echtdata);
                    // alert(echtseriesdata);

                    if (code) {
                        zlzjechartOfErea({
                            displayobj: document.getElementById('chartData'),
                            title: "价格走势(单位:元)",
                            xAxisdata: echtseriesdata,
                            seriesname: '收盘价',
                            seriesdata: echtdata
                        });

                        zlzjechartOfErea({
                            displayobj: document.getElementById('chartData2'),
                            title: "主力资金流向走势(单位:%)",
                            xAxisdata: echtseriesdataOfPacent,
                            seriesname: '流入率',
                            seriesdata: echtdata
                        });
                    } else {
                        // 数据div
                        var innerHtml = "<table>"
                        for (var i = 0; i < json.length; i++) {
                            //
                            if (i % 10 == 0) {
                                innerHtml = innerHtml + "<tr>";
                            }
                            //
                            innerHtml = innerHtml + "<td><input type='radio' name='rdocodelist' value='" +
                                json[i].code + "' />" + json[i].name + "[" + json[i].count + "]</td>";
                            //
                            if ((i + 1) % 10 == 0) {
                                innerHtml = innerHtml + "</tr>";
                            }
                        }
                        innerHtml = innerHtml + "<tr><td><input type='submit' name='btncodelist' value='个股详细'/></td><td colspan='9'/></tr>";
                        innerHtml = innerHtml + "</table>";
                        // alert(innerHtml);
                        // document.getElementById('selRlt').innerHtml = innerHtml;
                        $("#selData").html(innerHtml);

                        // chartdiv
                        zlzjechartOfColumn({
                            title: "资金流入前50强次数",
                            legend: ['次数'],
                            data: echtdata,
                            seriesname: ['次数'],
                            seriestype: 'bar',
                            seriesdata: echtseriesdata
                        });
                    }
                } else {
                    alert("没有数据。");
                    document.getElementById('err').innerHTML = "没有数据。";
                }
            })
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            .fail(function (xhr, status, errorThrown) {
                // alert("Sorry, there was a problem!");
                // alert("Error: " + errorThrown);
                // alert("Status: " + status);
                alert("数据取得失败。" + xhr.responseText);
                // $("#err").text("数据取得失败。" + JSON.parse(xhr).MongoError);
                // $("#err").text("数据取得失败。" + xhr.responseText);
                document.getElementById('err').innerHTML = "数据取得失败。" + xhr.responseText;
            })
            // Code to run regardless of success or failure;
            .always(function (xhr, status) {
                // alert("The request is complete!");
            });
    });

    //
    $("#frmgetzlzjggdetail").submit(function (event) {
        // 阻止表单自动提交
        event.preventDefault();
        // 获取参数
        var code = $("input[name='rdocodelist']:checked").val();

        if (!code) {
            $("#err").text("必须选中一只股票。");
        } else {
            // 表示div初始化
            // $("#selData").html("");
            $("#selRlt").html("");
            $("#chartData").html("");
            $("#chartData2").html("");
        }
        // 获取数据
        $.ajax({
            // The URL for the request
            url: "/getzlzj",
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
                var echtseriesdata = new Array();
                var echtseriesdataOfPacent = new Array();
                for (var i = 0; i < json.length; i++) {
                    // 查询股票主力资金流入详细
                    echtdata.push(json[i].date);
                    echtseriesdata.push(json[i].curprice);
                    echtseriesdataOfPacent.push(json[i].parcent);
                }

                zlzjechartOfErea({
                    displayobj: document.getElementById('chartData'),
                    title: "价格走势(单位:元)",
                    xAxisdata: echtseriesdata,
                    seriesname: '收盘价',
                    seriesdata: echtdata
                });

                zlzjechartOfErea({
                    displayobj: document.getElementById('chartData2'),
                    title: "主力资金流向走势(单位:%)",
                    xAxisdata: echtseriesdataOfPacent,
                    seriesname: '流入率',
                    seriesdata: echtdata
                });
            })
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            .fail(function (xhr, status, errorThrown) {
                // $("#err").text("数据取得失败。" + xhr.responseText);
                // $("#err").text("数据取得失败。" + xhr.responseText);
                alert("数据取得失败。" + xhr.responseText);
                document.getElementById('err').innerHTML = "数据取得失败。" + xhr.responseText;
            })
            // Code to run regardless of success or failure;
            .always(function (xhr, status) {
                // alert("The request is complete!");
            });
    });
});
