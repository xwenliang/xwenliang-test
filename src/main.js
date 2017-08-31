let domain = '';//http://xwenliang.cn
let apis = {
    login               : `${domain}/login`,
    reg                 : `${domain}/reg`,
    getLogout           : `${domain}/getLogout`,
    getLoginStatus      : `${domain}/getLoginStatus`,
    getPosts            : `${domain}/getPosts`,
    getWater            : `${domain}/getWater`,
    postWater           : `${domain}/postwater`,
    publishPost         : `${domain}/publishPost`,
    getCategory         : `${domain}/getCategory`,
    getPostInfo         : `${domain}/getPostInfo`,
    comment             : `${domain}/comment`
};

let routers = {
    login               : `${domain}/login`,
    reg                 : `${domain}/reg`,
    index               : `${domain}/`,
    water               : `${domain}/water`,
    post(id){
        return `${domain}/p/${id}`;
    },
    user(id){
        return `${domain}/u/${id}`;
    },
    category(id){
        return `${domain}/c/${id}`;
    }
};

export {
    apis,
    routers
};