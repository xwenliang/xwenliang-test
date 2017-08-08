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
    getCategory         : `/getCategory`,
    getPostInfo         : `${domain}/getPostInfo`
};

let routers = {
    login               : `${domain}/login.html`,
    reg                 : `${domain}/reg.html`,
    index               : `${domain}/index.html`,
    water               : `${domain}/water.html`
};

export {
    apis,
    routers
};