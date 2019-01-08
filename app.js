//app.js
var api=require("api/api.js");
var common=require("api/common.js");
App({
  onLaunch: function () {
      
      wx.showNavigationBarLoading();
      var that=this;
      wx.login({
          success: function (res) {
              //发起网络请求openid
               //用户登录成功,当用户存在数据就返回用户id,不存在就创建新的返回新用户的id
              wx.request({
                  url: api.addUserInfo(),
                    data: { code: res.code },
                    success: function (res1) {
                        wx.setStorageSync("userID", res1.data.msg);
                        var userID = wx.getStorageSync("userID");
                        wx.request({
                            url: api.getRestMuLuList1(),
                            data: { userID: userID },
                            success: function (res) {
                                var fianlArr = common.dealRestMuluList(res.data);
                                that.globalData.restMuluList = fianlArr;
                                that.globalData.restMuluListState=true;
                            }
                        })
                    }
              })
          }
      });

      wx.getSetting({
          success(res) {
              if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.setStorageSync("getUserInfoState", true);
                  wx.getUserInfo({
                      success(res){
                          wx.setStorageSync("userInfo", res.userInfo);
                      }
                  })
                 
              } else {
                  wx.setStorageSync("getUserInfoState", false);
              }
          }
      })
      
  },
  globalData: {
    userInfo: null,
    restMuluList:[],
    restMuluListState:false,
  }
})