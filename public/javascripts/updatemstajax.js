/**
 * Created by Yu.S.Z on 2017/1/14.
 */
var updatemstajax = function (options) {
    var options = options || {};
    var method = options.method || 'GET';
    var sync = options.sync || false;
    var url = options.url || window.location.pathname;
    var done = options.done || function () {
        };
    var fail = options.fail || function () {
        };
    var data = options.data || null;
    var type = options.type || 'uri';

    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        return fail(e);
    }

    xhr.open(method, url, sync);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            done(xhr);
        } else {
            // document.getElementById('err').innerHTML='数据插入失败。<br />' + xhr.responseText;
            fail(xhr.responseText);
        }
    };

    var query = '?';
    if (type === 'json') {
        // alert('type = json');
        data = JSON.stringify(data);
        xhr.setRequestHeader('Content-type', 'application/json');
    } else if (type === 'uri') {
        for (var key in data) {
            query += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }
    } else {
        fail('Type not supported: ' + type);
    }

    try {
        if (method === 'POST' && type === 'json') {
            // alert('method : ' + method);
            // alert('sync : ' + sync);
            // alert('url : ' + url);
            // alert('type : ' + type);
            // --以下代码会出现返回值=400 - Bad Request 请求出现语法错误。
            // xhr.send(url, done, 'POST', data, sync);
            xhr.send(data);
        } else if (method === 'POST' && type === 'uri') {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(url, done, 'POST', data, sync);
        } else if (method === 'GET') {
            // alert('get');
            xhr.send(url + query, done, 'GET', null, sync);
        } else {
            fail('Type not supported: ' + type);
        }
    } catch (err) {
        fail(err);
    }
    ;
}

window.updatemstajax = updatemstajax;
