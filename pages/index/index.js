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
        { url: '/image/toutu.gif' }
    ],
    articleList:[],//首页推荐内容列表
    clickList:[],//点击排序文章列表
    timeList:[],//时间排序文章列表
    restMuluList: [],//分类目录类别
    likedList:[],//用户可能喜欢的内容
    tuijian:true,
    fenlei:false,
    wode:false,
    myData:{
        gridList: [
            { enName: 'favorite', zhName: '收藏' },
            { enName: 'like', zhName: '喜欢' },
            { enName: 'dontlike', zhName: '不喜欢' },
            { enName: 'setting', zhName: '偏好设置' }
        ],
        skin: 'https://static.sesine.com/wechat-weapp-movie/images/user_bg_2.jpg',
        userInfoState:false,
        userInfo: [],
    },
  },

  //查询更多的方法
  more: function (e) {
      var name = e.currentTarget.dataset.name;
      var id = e.currentTarget.dataset.id;

      //获取已经筛选出来设置了偏好的目录
      var articleList = this.data.articleList;
      var muluArr=new Array();
      for(var i=0;i<articleList.length;i++){
          if (articleList[i]['id']==id){
              muluArr = articleList[i]['children'];
              break;
          }
      }
      wx.navigateTo({
          url: '/pages/more/index?name=' + name + '&muluArr=' + muluArr,
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
      var articleID = e.currentTarget.dataset.id;
      wx.navigateTo({
          url: '/pages/xiangxi/index?articleID='+articleID,
      })
  },
  //用来分发地址（收藏，喜欢，不喜欢，设置）
  tumpUrl:function(e){
      var flagName=e.currentTarget.dataset.url;
      if (flagName == "setting") {
          //跳转到偏好设置页面
          wx.navigateTo({
              url: '/pages/shezhi/index',
          })
      }else{
          //跳转到列表页面
          wx.navigateTo({
              url: '/pages/mylist/index?flagName=' + flagName
          })
      }
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
         url: api.getRestMuLuList1(),
         data: { userID: userID },
         success:function(res){
            var fianlArr = common.dealRestMuluList(res.data);
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
    var muluID=e.currentTarget.dataset.muluid;
      var name = e.currentTarget.dataset.name;
    wx.navigateTo({
        url: '/pages/liebiao/index?muluID=' + muluID+"&name="+name,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (cb) {
      //获取用户设置偏好后的目录推文章列表，每个目录10篇文章
      var getUserInfoState = wx.getStorageSync("getUserInfoState");
      var myData = this.data.myData;
      myData.userInfoState = getUserInfoState;
      myData.userInfo=wx.getStorageSync("userInfo");
      this.setData({
          myData: myData
      });
      var userID = wx.getStorageInfoSync("userID");
      var that = this;
      wx.request({
          url: api.getIndexPageData(),
          data: { userID: userID },
          success: function (e) {
              that.setData({
                  articleList: e.data
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