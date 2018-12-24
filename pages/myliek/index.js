// pages/lishi/index.js
var api = require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLogin: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userID = wx.getStorageSync("userID");
    if (userID < 1) {
      var showLogin = false;
    } else {
      var showLogin = true;
      //获取用户的收藏记录
    }
    this.setData({
      showLogin: showLogin
    });
  },

  //点击授权的返回方法
  doGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户同意授权(添加用户记录)
      wx.setStorageSync("userInfo", true);
      this.onShow();

    } else {
      //用户不同意授权
      wx.showToast({
        title: '我需要根据您的个人信息进行对应保存您的收藏记录',
        icon: "none"
      })
    }
  },


  yuedu: function (e) {
    wx.navigateTo({
      url: '/pages/yuedu/index',
    })
  },
  click: function (e) {
    wx.navigateTo({
      url: '/pages/liebiao/index',
    })
  },
  xiangxi: function (e) {
    wx.navigateTo({
      url: '/pages/xiangxi/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var checkState = wx.getStorageSync("userInfo");
    if (checkState) {
      var that = this;
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo;

          //获取用户的openid
          wx.showLoading({
            title: '等待加载数据...',
          })

        }
      })
    }
    this.setData({
      userInfoState: checkState
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})