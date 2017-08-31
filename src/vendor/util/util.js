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
    if(typeof window === 'undefined'){
        return function(){ return '';};
    }
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
    if(typeof window === 'undefined'){
        return function(){ return '';};
    }
    if(getCookie(key) !== null){
        return console.log(`there are already have ${key} in cookie.`);
    }
    let exDate = new Date();
    exDate.setDate(exDate.getDate() + expiredays ? expiredays : 0);
    document.cookie = `${key}=${escape(val)};expires=${exDate.toGMTString()}`;
};

function convertDate(date){
    let diff = new Date().getTime() - new Date(date).getTime();
    let time = '';
    //小于5分钟->刚刚
    if(diff < 5*60*1000){
        time = '刚刚';
    }
    //小于1小时->xx分钟前
    else if(diff < 1*60*60*1000){
        time = parseInt(diff/1000/60) + '分钟前';
    }
    //小于24小时->xx小时前
    else if(diff < 24*60*60*1000){
        time = parseInt(diff/1000/60/60) + '小时前';
    }
    //小于30天->xx天前
    else if(diff < 30*24*60*60*1000){
        time = parseInt(diff/1000/60/60/24) < 2 ? '昨天' : (parseInt(diff/1000/60/60/24) + '天前');
    }
    //小于1年->xx个月前
    else if(diff < 365*24*60*60*1000){
        time = parseInt(diff/1000/60/60/24/30) + '个月前';
    }
    //x年x月前
    else{
        let days = parseInt(diff/1000/60/60/24);
        time = parseInt(days/365) + '年' + (parseInt(days%365/30) ? (parseInt(days%365/30) + '个月前') : '前');
    }
    return time;
};

export {
    ajax,
    trim,
    strLen,
    getCookie,
    setCookie,
    convertDate
};