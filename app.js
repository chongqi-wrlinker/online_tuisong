//app.js
var api=require("api/api.js");
App({
  onLaunch: function () {
      wx.showNavigationBarLoading();
      wx.login({
          success: function (res) {
              //发起网络请求openid
               //用户登录成功,当用户存在数据就返回用户id,不存在就创建新的返回新用户的id
              wx.request({
                  url: api.addUserInfo(),
                    data: { code: res.code },
                    success: function (res1) {
                        wx.setStorageSync("userID", res1.data.msg);
                    }
              })
          }
      });
  },
  globalData: {
    userInfo: null
  }
})