//获取用户的openid
function getOpenID(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getOpenID";
}

//获取首页的推送内容
function getIndexPageData(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getIndexPageData";
}

//获取分类目录列表
function getRestMuluList(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getRestMuluList";
}

//添加一个用户信息
function addUserInfo(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/addUserInfo";
}

//获取用户可能设置偏好后的文章列表（时间倒叙）
function getUserLikeContentList(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getUserLikeContentList";
}

//获取用户的收藏记录
function getUserShouChangData(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getUserShouChangData";
}

//获取查看更多的数据
function getMoreContentData(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getMoreContentData";
}

//获取查看更多中的目录列表
function getRestMuLuList(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getRestMuLuList";
}

//获取某个目录下的文章列表
function getArticleList(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getArticleList";
}

//获取文章的详细信息
function getOneArticleInfo(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getOneArticleInfo";
}

//添加或者删除用户对谋篇文章的收藏
function dealShouChang(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/dealShouChang";
}

//添加或者删除用户对文章的喜欢或者不喜欢
function dealListArticle(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/dealListArticle";
}

//获取设置偏好的剩余目录列表
function getRestMuLuList1(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getRestMuLuList1";
}

//获取用户喜欢或者不喜欢的文章列表
function getUserLikeOrNotList(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getUserLikeOrNotList";
}

module.exports.getOpenID = getOpenID;
module.exports.getRestMuluList = getRestMuluList;
module.exports.addUserInfo = addUserInfo;
module.exports.getUserLikeContentList = getUserLikeContentList;
module.exports.getUserShouChangData = getUserShouChangData;
module.exports.getMoreContentData = getMoreContentData;
//---------------------------------------------
module.exports.getIndexPageData = getIndexPageData;
module.exports.getRestMuLuList = getRestMuLuList;
module.exports.getArticleList = getArticleList;
module.exports.getOneArticleInfo = getOneArticleInfo;
module.exports.dealShouChang = dealShouChang;
module.exports.dealListArticle = dealListArticle;
module.exports.getRestMuLuList1 = getRestMuLuList1;
module.exports.getUserLikeOrNotList = getUserLikeOrNotList;