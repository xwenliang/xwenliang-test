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
    updatePost          : `${domain}/updatePost`,
    getCategory         : `${domain}/getCategory`,
    getPostInfo         : `${domain}/getPostInfo`,
    comment             : `${domain}/comment`
};

let routers = {
    login(){
        return `${domain}/login`;
    },
    reg(){
        return `${domain}/reg`;
    },
    index(){
        return `${domain}/`;
    },
    water(){
        return `${domain}/water`;
    },
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