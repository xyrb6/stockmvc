/**
 * Created by Yu.S.Z on 2017/1/15.
 */

var hybkechart = function(options) {
    var options = options || {};
    var title   = options.title    || '资金状况图(单位:万元)';
    var legend    = options.legend    || ['金额'];
    var data   = options.data   || new Array();
    var seriesname   = options.seriesname   || '';
    var seriestype   = options.seriestype   || 'bar';
    var seriesdata   = options.seriesdata   || new Array();

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chartData'));

// 指定图表的配置项和数据
    var option = {
        title: {
            text: title
        },
        tooltip: {},
        legend: {
            data: legend
        },
        xAxis: {
            type : 'category',
            axisLabel:{
                interval:0, //强制设置坐标轴分割间隔。
                rotate:80, //坐标轴名字旋转，角度值。
                margin:1,
                textStyle:{
                    color:"#222"
                }},
            data: data
        },
        yAxis: {},
        series: [{
            name: seriesname,
            type: seriestype,
            data: seriesdata
        }]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

window.hybkechart = hybkechart;
