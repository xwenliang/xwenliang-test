let domain = '';//http://xwenliang.cn
let apis = {
    login       : `${domain}/login`,
    reg         : `${domain}/reg`,
    getLogout   : `${domain}/getLogout`,
    getPosts    : `${domain}/getPosts`,
    getWater    : `${domain}/getWater`,
    postWater   : `${domain}/postwater`,
    publishPost : `${domain}/publishPost`,
    getCategory : `/getCategory`,
    getPostInfo : `${domain}/getPostInfo`
};

let routers = {
    water       : `${domain}/water`
};

export {
    apis,
    routers
};