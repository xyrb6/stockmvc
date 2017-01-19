/**
 * Created by Yu.S.Z on 2017/1/15.
 */

var zlzjechartOfColumn = function(options) {

    // alert(1);
    var options = options || {};
    var title   = options.title    || '资金状况图(单位:万元)';
    var legend    = options.legend    || ['金额'];
    var data   = options.data   || new Array();
    var seriesname   = options.seriesname   || '';
    var seriestype   = options.seriestype   || 'bar';
    var seriesdata   = options.seriesdata   || new Array();

    // alert(data);
    // alert(seriesdata);

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chartData'));
    // var myChart = echarts.init($('#chartData'));

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

var zlzjechartOfErea = function(options) {
    var options = options || {};
    var displayobj   = options.displayobj   || document.getElementById('chartData');
    var title   = options.title    || '资金状况图(单位:万元)';
    var xAxisdata   = options.xAxisdata   || new Array();
    var seriesname   = options.seriesname   || '';
    var seriesdata   = options.seriesdata   || new Array();

    // alert(displayobj.id);
    // alert(xAxisdata);
    // alert(seriesdata);

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(displayobj);
    // var myChart = echarts.init($('#chartData'));

// 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'left',
            text: title,
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: seriesdata
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
        }, {
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name:seriesname,
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    }
                },
                data: xAxisdata
            }
        ]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

window.zlzjechartOfErea = zlzjechartOfErea;
window.zlzjechartOfColumn = zlzjechartOfColumn;
