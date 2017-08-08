function getCookie(key){
    let cookie = document.cookie;
    let cookieArr = cookie.split('; ');
    let value = null;
    if(!cookieArr.length || cookie.indexOf(key) < 0){
        return value = null;
    }
    cookieArr.forEach(function(tar){
        if(tar.indexOf(key) > -1){
            value = tar.split('=')[1];
        }
    });
    return unescape(value);
};

function setCookie(key, val, expiredays){
    if(getCookie(key) !== null){
        return console.log(`there are already have ${key} in cookie.`);
    }
    let exDate = new Date();
    exDate.setDate(exDate.getDate() + expiredays ? expiredays : 0);
    document.cookie = `${key}=${escape(val)};expires=${exDate.toGMTString()}`;
};

export {
    getCookie,
    setCookie
}