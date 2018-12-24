// pages/newindex/newindex.js
var api=require("../../api/api.js");
var common=require("../../api/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: '/image/toutu.gif ' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    clickList:[],//点击排序文章列表
    timeList:[],//时间排序文章列表
    restMuluList: [],//分类目录类别
    likedList:[],//用户可能喜欢的内容
    tuijian:true,
    fenlei:false,
    wode:false,
  },

  //查询更多的方法
  more: function (e) {
      var type = e.currentTarget.dataset.type;
      wx.navigateTo({
          url: '/pages/more/index?type='+type,
      })
  },
  tuijian: function (e) {
    this.setData({
      tuijian: true,
      fenlei: false,
      wode: false,
    })
  },
  xiangxi: function (e) {
    wx.navigateTo({
      url: '/pages/xiangxi/index',
    })
  },
  wyShouChang: function (e) {
      wx.navigateTo({
          url: '/pages/shouchang/index',
      })
  },
  mylike: function (e) {
    wx.navigateTo({
      url: '/pages/myliek/index',
    })
  },
  shezhi: function (e) {
    wx.navigateTo({
      url: '/pages/shezhi/index',
    })
  },
  fenlei: function (e) {
      //获取用户的设置偏好后的目录列表
     var userID=wx.getStorageSync("userID");
     var that=this;
     wx.request({
         url: api.getRestMuluList(),
         data: { userID: userID },
         success:function(res){
            var fianlArr = common.dealRestMuluList(res.data.msg);
            that.setData({
                restMuluList: fianlArr,
                tuijian: false,
                fenlei: true,
                wode: false,
            });
         }
     })
  },
  wode: function (e) {
    //获取用户可能喜欢的文章
    var userID=wx.getStorageSync("userID");
    var that=this;
    wx.request({
        url: api.getUserLikeContentList(),
        data:{page:1,userID:userID},
        success:function(res){
            that.setData({
                likedList:res.data,
                tuijian: false,
                fenlei: false,
                wode: true,
            })
        }
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //填充推送内容信息
    var userID=wx.getStorageInfoSync("userID");
    var that=this;
    wx.request({
        url: api.getContentListByClick(),
        data: { userID: userID},
        success:function(e){
            var clickList = e.data.msg.click;
            var timeList = e.data.msg.time;
            that.setData({
                clickList: clickList,
                timeList: timeList
            });
            wx.hideNavigationBarLoading();
        }
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
      //获取用户的
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来答题啊',
      path: '/pages/newindex/newindex'
    }
  },
  //跳转页面（开始答题）

  getUserInfo:function(e){
    if (e.detail.errMsg == "getUserInfo:ok"){
      wx.showLoading({
        title:"等待数据加载..."
      });
      //授权成功（修改用户的用户名和头像信息）
      var userOpen= wx.getStorageSync('userOpen');
      var url = e.detail.userInfo.avatarUrl;
      var nickname = e.detail.userInfo.nickName;
      wx.request({
        url: api.updateUserInfo(),
        data: { type: "updateUrl", openid: userOpen.openid, url: url, nickname:nickname},
        success:function(data){
          if(data.data){
            wx.hideLoading();
            wx.navigateTo({
              url: '/pages/newpaihang/index',
            })
          }else{
            wx.showToast({
              title: '答题后才能查看',
              icon: 'none',
              duration: 1000,
              mask: true
            })
          }
          
        }
      })
    } 
  },
})