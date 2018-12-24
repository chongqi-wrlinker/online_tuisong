//获取用户的openid
function getOpenID(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getOpenID";
}

//获取首页的推送内容
function getContentListByClick(){
    return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Tuisong/index/getContentListByClick";
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


module.exports.getOpenID = getOpenID;
module.exports.getContentListByClick = getContentListByClick;
module.exports.getRestMuluList = getRestMuluList;
module.exports.addUserInfo = addUserInfo;
module.exports.getUserLikeContentList = getUserLikeContentList;
module.exports.getUserShouChangData = getUserShouChangData;
module.exports.getMoreContentData = getMoreContentData;