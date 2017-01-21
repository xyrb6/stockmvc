/**
 * Created by Yu.S.Z on 2017/1/14.
 */
getmst = function(){
    var rdotypes = document.getElementsByName("rdotype");
    for(var i=0;i<rdotypes.length;i++){
        if(rdotypes[i].checked) {
            rdotype = rdotypes[i].value
        }
    }

    // alert(rdotype);
    // 清空div=selRlt
    document.getElementById('selRlt').innerHTML='';

    getmstajax({
        url: '/getmst',
        method: 'POST',
        sync: true,
        data: {type: rdotype},
        done: function(xhr){
            document.getElementById('selRlt').innerHTML = '数据插入成功。<br />' + xhr.responseText;
        },
        fail: function(err){
            document.getElementById('selRlt').innerHTML = '数据插入失败。<br />' + err;
        },
        type: 'json'
    });
};
