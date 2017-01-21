/**
 * 日期格式化
 *
 * @param format 格式
 * @returns {*}
 */
Date.prototype.format = function (format) {
		var o = { 
				"M+" : this.getMonth()+1, //month 
				"d+" : this.getDate(), //day 
				"h+" : this.getHours(), //hour 
				"m+" : this.getMinutes(), //minute 
				"s+" : this.getSeconds(), //second 
				"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
				"S" : this.getMilliseconds() //millisecond 
        };
		
		if(/(y+)/.test(format)) { 
			format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		} 
		
		for(var k in o) { 
			if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
    return format;
};
/* URL */
URL_HOST = 'http://nufm.dfcfw.com/';
// 个股实时资金流向排行
exports.URL_ONE_STOCK = URL_HOST + '/EM_Finance2014NumericApplication/JS.aspx/JS.aspx?type=ct&st=(BalFlowMain)&sr=-1&p=1&ps=5000&js=var%20QMsmWwkK={pages:(pc),date:%222014-10-22%22,data:[(x)]}&token=894050c76af8597a853f5b408b759f5d&cmd=C._A&sty=DCFFITA&rt=49459287';
// 主力净流入排名
exports.URL_MAIN = URL_HOST + '/EM_Finance2014NumericApplication/JS.aspx/JS.aspx?type=ct&st=(FFARank)&sr=1&p=1&ps=5000&js=var%20snuBccRz={pages:(pc),data:[(x)]}&token=894050c76af8597a853f5b408b759f5d&cmd=C._A&sty=DCFFITAMA&rt=49459294';
// 行业板块资金流向排行
exports.URL_HANGYE = URL_HOST + '/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=C._BKHY&sty=DCFFPBFM&st=(BalFlowMain)&sr=-1&p=1&ps=999&js=&token=894050c76af8597a853f5b408b759f5d&cb=callback05309356034309072&callback=callback05309356034309072&_=1483778961948';

/* TBL */
// 个股实时资金流向排行
exports.TBL_sttggzj = 'sttggzj';
// 主力净流入排名
exports.TBL_sttzlzj = 'sttzlzj';
// 行业板块资金流向排行
exports.TBL_stthybk = 'stthybk';
// 个股股票表
exports.TBL_sttmgg = 'sttmgg';
// 行业板块代码表
exports.TBL_sttmhybk = 'sttmhybk';
/* FORMAT */
exports.FMT_YYYYMMDD = 'yyyyMMdd';

/* TITLE */
exports.TITLE_GET_DATA = '获取资金流入数据';
exports.TITLE_GET_HYBK = '行业板块历史数据';
exports.TITLE_GET_ZLZJ = '主力资金历史数据';
exports.TITLE_GET_GGZJ = '个股资金历史数据';
exports.TITLE_GET_MST = '获取股票代码以及行业板块表';

// 基础数据MAP
exports.hybkmap = new Map();
exports.ggmap = new Map();

// 股票资金流入选取数量
exports.selectCnt = 75;

// 项目取值范围
exports.type = {
    ggzj: '1', // 个股资金
	zlzj: '2', // 主力资金
    hybk: '3'  // 行业板块
};