import axios from 'axios';
import qs from 'qs';

function ajax(params){
    if(!params || !params.url){
        return console.log('ajax参数有误');
    }
    let opt = {
        type: 'get',
        dataType: 'json',
        timeout: 10000,
        ...params
    };
    let dataString = qs.stringify(opt.data);
    return axios({
        url: opt.type === 'post' ? opt.url : `${opt.url}?${dataString}`,
        method: opt.type,
        responseType: opt.responseType,
        timeout: opt.timeout,
        headers: opt.type === 'post' ? {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        } : {},
        data: dataString
    });
};

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, '');
};

function strLen(str){
    return Math.round(str.replace(/[\u0100-\uFFFF]/ig, 'ab').length/2);
};

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
    ajax,
    trim,
    strLen,
    getCookie,
    setCookie
}