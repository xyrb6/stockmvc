/**
 * Created by Yu.S.Z on 2017/1/14.
 */
getByCode = function(){
    var selcode = document.getElementById("selcode").value;
    var txtymd = document.getElementById("txtymd").value;
    var ishybkdetail = document.getElementById("chkhybkdetail").checked;
    // alert('javascript exe');
    // alert(selcode + ":" + txtymd);

    gethybkajax({
        url: '/gethybk',
        method: 'POST',
        sync: true,
        data: {code: selcode,ymd: txtymd,ishybkdetail:ishybkdetail},
        done: function(xhr){
            // alert('done: ');
            // alert(xhr.responseText);
            var datas = xhr.responseText
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

                document.getElementById('data').innerHTML='';
                hybkechart({
                    title : '',
                    legend : ['金额'],
                    data : echtdata,
                    seriesname : ['金额'],
                    seriestype : 'bar',
                    seriesdata :  echtseriesdata
                });
            } else {
                document.getElementById('data').innerHTML='没有数据。';
                document.getElementById('chartData').innerHTML='';
            }
        },
        fail: function(err){
            // alert('failed: ');
            // alert(err);
            document.getElementById('err').innerHTML='数据插入失败。<br />' + err;
        },
        type: 'json'
    });
}
