/**
 * Created by Yu.S.Z on 2017/1/14.
 */
getByCode = function(){
    var selcode = document.getElementById("selcode").value;
    var txtymd = document.getElementById("txtymd").value;
    var ishybkdetail = document.getElementById("chkhybkdetail").checked;
    var txtymdfrom = document.getElementById("txtymdfrom").value;

    // 初始化
    document.getElementById('selRlt').innerHTML = '';
    document.getElementById('selData').innerHTML = '';
    document.getElementById('chartData').innerHTML = '';

    // 检查日期
    if (txtymd && txtymdfrom) {
        document.getElementById('selRlt').innerHTML = '数据日期和开始日期只能有一个可以指定。';
        return false;
    }

    // 板块详情时不能指定数据日期
    if (txtymd && ishybkdetail && txtymd) {
        document.getElementById('selRlt').innerHTML = '板块详情时不能指定数据日期。';
        return false;
    }

    // 取数据
    gethybkajax({
        url: '/gethybk',
        method: 'POST',
        sync: true,
        data: {code: selcode, ymd: txtymd, ishybkdetail: ishybkdetail, ymdfrom: txtymdfrom},
        done: function(xhr){
            var datas = xhr.responseText;
            // document.getElementById('data').innerHTML=datas;
            // alert(datas);
            if (datas != '[]') {
                // alert(datas);
                datas = datas.replace('[','').replace(']','').replace(/},/g,'}@').split('@');
                var echtdata = new Array();
                var echtseriesdata =  new Array();
                for(var i = 0; i < datas.length; i++) {
                    var jsondata = JSON.parse(datas[i]);
                    if (selcode && ishybkdetail && !txtymd) {
                        // 查询行业板块明细
                        echtdata.push(jsondata.date);
                        echtseriesdata.push(jsondata.money);
                    } else {
                        // 查询行业板块统计数据
                        echtdata.push(jsondata.name);
                        echtseriesdata.push(jsondata.total);
                    }
                }

                hybkechart({
                    title : '',
                    legend : ['金额'],
                    data : echtdata,
                    seriesname : ['金额'],
                    seriestype : 'bar',
                    seriesdata :  echtseriesdata
                });
            } else {
                document.getElementById('selRlt').innerHTML = '没有数据。';
            }
        },
        fail: function(err){
            document.getElementById('selRlt').innerHTML = '数据插入失败。<br />' + err;
        },
        type: 'json'
    });
};
