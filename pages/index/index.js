// pages/newindex/newindex.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: '/image/toutu.gif ' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    list: [{
      id: 1,
      name: '名言警句',
      count: [
        {
          leveid: 1,
          levename: '名人名言'
        },
        {
          leveid: 2,
          levename: '格言警句'
        },
        {
          leveid: 3,
          levename: '民间谚语'
        },
      ]
    }, {
      id: 2,
      name: '精彩文章',
      count: [
        {
          leveid: 1,
          levename: '小说'
        }, {
          leveid: 2,
          levename: '散文'
        }, {
          leveid: 3,
          levename: '剧本'
        }, {
          leveid: 4,
          levename: '剧小说'
        },
      ]
    }, {
      id: 3,
      name: '诗词歌赋',
      count: [
        {
          leveid: 1,
          levename: '诗'
        }, {
          leveid: 2,
          levename: '词'
        }
      ]
    }, {
      id: 4,
      name: '科学百科',
      count: [
        {
          leveid: 1,
          levename: '无限个为什么'
        }, {
          leveid: 2,
          levename: '生活常识小妙招'
        }
      ]
    }],
    tuijian:true,
    fenlei:false,
    wode:false,
  },
  more: function (e) {
    wx.navigateTo({
      url: '/pages/more/index',
    })
  },
  tuijian: function (e) {
    this.setData({
      tuijian: true,
      fenlei: false,
      wode: false,
    })
  },
  lishi: function (e) {
    wx.navigateTo({
      url: '/pages/lishi/index',
    })
  },
  shezhi: function (e) {
    wx.navigateTo({
      url: '/pages/shezhi/index',
    })
  },
  fenlei: function (e) {
    this.setData({
      tuijian: false,
      fenlei: true,
      wode: false,
    })
  },
  wode: function (e) {
    this.setData({
      tuijian: false,
      fenlei: false,
      wode: true,
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