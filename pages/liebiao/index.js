// pages/more/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      articleState:true,
      articleList:[],
      pageData:[],
      muluID:0,
      noContent: "当前目录暂时没有添加数据，敬请期待！！"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //var muluID = 36
      var muluID = options.muluID;
      var name=options.name;
      wx.showNavigationBarLoading();
      wx.setNavigationBarTitle({
          title: name
      })
      var that=this;
      wx.request({
          url: api.getArticleList(),
          data:{muluID:muluID,page:1},
          success:function(e){
              that.setData({
                  articleList:e.data.articleList,
                  pageData:e.data.page,
                  muluID: muluID,
                  articleState: e.data.articleList.length>0?true:false
              });
              wx.hideNavigationBarLoading();
          }
      })
  },
  
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
      var pageData=this.data.pageData;
      var muluID = this.data.muluID;
      if(pageData.nextPage!=0){
          wx.showLoading({
              title: '正在加载...',
          })
          var that=this;
          var articleList = this.data.articleList;
          wx.request({
              url: api.getArticleList(),
              data: { muluID: muluID, page: pageData.nextPage },
              success: function (e) {
                  that.setData({
                      articleList: articleList.concat(e.data.articleList),
                      pageData: e.data.page,
                      muluID: muluID
                  });
                  wx.hideLoading();
                  wx.showToast({
                      title: '加载成功',
                      icon:"success",
                      duration:500
                  })
              }
          })
      }else{
          wx.showToast({
              title: '对不起，已经没有了',
              icon:"none"
          })
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})