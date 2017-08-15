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
    getPostInfo         : `${domain}/getPostInfo`
};

let routers = {
    login               : `${domain}/login`,
    reg                 : `${domain}/reg`,
    index               : `${domain}/`,
    water               : `${domain}/water`
};

export {
    apis,
    routers
};