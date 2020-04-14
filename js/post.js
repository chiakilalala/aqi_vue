function ajax(options) {
    options = options || {};
    options.data = options.data || {};
    options.type = options.type || "GET";
    options.url = options.url || "https://fathomless-brushlands-42339.herokuapp.com/todo3/";
    options.router = options.router || ""; //ID

    let arr = [];
    for (let key in options.data) {
        // xx=uu&oo=ww
        arr.push(`${key}=${options.data[key]}`);
    }
    dataStr = arr.join(`&`);
    if (options.router) {
        options.url = options.url + options.router;
    }
    let xhr = new XMLHttpRequest();

    if (options.type == `GET`) {
        xhr.open(options.type, options.url, true);
        xhr.send();
    } else {
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(dataStr);
    }
    //promise+ jQuery的底層寫法
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                // console.log();
                options.success && options.success(JSON.parse(xhr.responseText));
                options.count && options.count(JSON.parse(xhr.responseText));
            } else {
                options.error && options.error(xhr.status);
            }
        }
    }

}