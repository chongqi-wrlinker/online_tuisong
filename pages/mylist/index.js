// pages/mylist/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      articleList:[],
      page:[],
      url:"",
      articleState:true,
      noContent:"您暂时为添加喜欢的文章，去阅读添加吧!"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var flagName=options.flagName;
      if (flagName =="favorite"){
          var title="我的收藏";
          var url = api.getUserShouChangData();
          var state=1;
      } else if (flagName == "like"){
          var title = "我喜欢";
          var url = api.getUserLikeOrNotList();
          var state = 1;
      } else if (flagName == "dontlike") {
          var title = "我不喜欢";
          var url = api.getUserLikeOrNotList();
          var state = 2;
      }
      wx.setNavigationBarTitle({
          title: title 
      })
      var userID=wx.getStorageSync("userID");
      var page=1;
      var that=this;
      wx.request({
          url: url,
          data:{userID:userID,page:page,state:state},
          success:function(res){
              console.log(res.data);
              that.setData({
                  articleList:res.data.articleList,
                  page:res.data.page,
                  url:url,
                  state: state,
                  articleState: res.data.articleList.length > 0 ? true : false
              });
          }
      })
  },
    //跳转到搜索页面
    toSearch: function (e) {
        wx.navigateTo({
            url: '/pages/search/index',
        })
    },
    //查看详细信息
    xiangxi: function (e) {
        var articleID = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/xiangxi/index?articleID=' + articleID,
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
      var userID=wx.getStorageSync("userID");
      var pageData = this.data.page;
      var url=this.data.url;
      var state=this.data.state;
      if (pageData.nextPage != 0) {
          wx.showLoading({
              title: '正在加载...',
          })
          var that = this;
          var articleList = this.data.articleList;
          wx.request({
              url: url,
              data: { userID: userID, page: pageData.nextPage,state:state },
              success: function (res) {
                  that.setData({
                      articleList: articleList.concat(res.data.articleList),
                      page: res.data.page,
                  });
                  wx.hideLoading();
                  wx.showToast({
                      title: '加载成功',
                      icon: "success",
                      duration: 500
                  })
              }
          })
      } else {
          wx.showToast({
              title: '对不起，已经没有了',
              icon: "none"
          })
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})