/**
 * Created by Yu.S.Z on 2017/1/14.
 */
getmst = function(){
    var rdotypes = document.getElementsByName("rdotype");
    // var rdotype = rdotypes.map(function(val,index,arr){
    //     if (arr[index].checked) return arr[index].value;
    // })
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
            document.getElementById('selRlt').innerHTML='<h3>数据插入成功。</h3><br />' + xhr.responseText;
        },
        fail: function(err){
            document.getElementById('selRlt').innerHTML='<h3>数据插入失败。</h3><br />' + err;
        },
        type: 'json'
    });
}
