/**
 * Created by Yu.S.Z on 2017/1/15.
 */

var ggzjechartOfColumn = function (options) {

    // alert(1);
    var options = options || {};
    var title = options.title || '资金状况图(单位:万元)';
    var legend = options.legend || ['金额'];
    var data = options.data || new Array();
    var seriesname = options.seriesname || '';
    var seriestype = options.seriestype || 'bar';
    var seriesdata = options.seriesdata || new Array();

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
            type: 'category',
            axisLabel: {
                interval: 0, //强制设置坐标轴分割间隔。
                rotate: 80, //坐标轴名字旋转，角度值。
                margin: 1,
                textStyle: {
                    color: "#222"
                }
            },
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

var ggzjechartOfErea = function (options) {
    var options = options || {};
    var displayobj = options.displayobj || document.getElementById('chartData');
    var title = options.title || '资金状况图(单位:万元)';
    var xAxisdata = options.xAxisdata || new Array();
    var seriesname = options.seriesname || '';
    var seriesdata = options.seriesdata || new Array();

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
                name: seriesname,
                type: 'line',
                smooth: true,
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

var ggzjechartOfEreaMultiY = function (options) {
    var options = options || {};
    var displayobj = options.displayobj || document.getElementById('chartData');
    var legends = options.legends || new Array(); // ['蒸发量','降水量','平均温度']
    var xAxisdataOfDate = options.xAxisdataOfDate || new Array(); // ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    var yAxisdataOfPercent = options.yAxisdataOfPercent || new Array(); // 资金流入占比 %
    var yAxisdataOfCurrenPrice = options.yAxisdataOfCurrenPrice || new Array(); // 当前价格 元
    var yAxisdataOfRanking = options.yAxisdataOfRanking || new Array(); // 资金流入排行 位
    var yAxisdataOfPercentMax = options.yAxisdataOfPercentMax || 100;
    var yAxisdataOfMin = options.yAxisdataOfMin || 0;
    var yAxisdataOfCurrenPriceMax = options.yAxisdataOfCurrenPriceMax || 100;
    var yAxisdataOfRankingMax = options.yAxisdataOfRankingMax || 100;

    // 如果最小值大于0那么当前价格和排行在0到最小值区间的话就显示不出来
    if (yAxisdataOfMin > 0) {
        yAxisdataOfMin = 0;
    } else {
        yAxisdataOfMin = parseInt(yAxisdataOfMin) - 10;
    }
    ;

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(displayobj);

    // 三类数据的颜色指定
    var colors = ['#5793f3', '#d14a61', '#675bba'];
    // 指定图表的配置项和数据
    var option = {
        color: colors,

        tooltip: {
            trigger: 'axis'
        },
        grid: {
            right: '20%'
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data: legends
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: xAxisdataOfDate
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: legends[0],
                min: yAxisdataOfMin,
                max: yAxisdataOfPercentMax,
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value} %' // 资金流入占比 %
                }
            },
            {
                type: 'value',
                name: legends[1],
                min: yAxisdataOfMin,
                max: yAxisdataOfCurrenPriceMax,
                position: 'right',
                offset: 80,
                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value} 元' // 当前价格 元
                }
            },
            {
                type: 'value',
                name: legends[2],
                min: yAxisdataOfMin,
                max: yAxisdataOfRankingMax,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value} 位' // 资金流入排行 位
                }
            }
        ],
        series: [
            {
                name: legends[0],
                type: 'bar',
                data: yAxisdataOfPercent
            },
            {
                name: legends[1],
                type: 'bar',
                yAxisIndex: 1,
                data: yAxisdataOfCurrenPrice
            },
            {
                name: legends[2],
                type: 'line',
                yAxisIndex: 2,
                data: yAxisdataOfRanking
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
};

window.ggzjechartOfErea = ggzjechartOfErea;
window.ggzjechartOfEreaMultiY = ggzjechartOfEreaMultiY;
window.ggzjechartOfColumn = ggzjechartOfColumn;
