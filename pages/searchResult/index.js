// pages/searchResult/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      keyword:"",
      pageData:{},
      articleList:[],
      articleState:true,
      noContent:"暂时为收录你要查询的关键词内容..."
  },
    //查看详细信息
    xiangxi: function (e) {
        var articleID = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/xiangxi/index?articleID=' + articleID,
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var flag=options.flag;
      var keyword=options.keyword;
      wx.setNavigationBarTitle({
          title: "关键词 · " + keyword
      })
      var that=this;
      wx.request({
          url: api.search(),
          data: { flag: flag, keyword: keyword },
          success: function (e) {
              if(e.data.articleList.length>0){
                  var articleState = true;
              }else{
                  var articleState = false;
              }
              that.setData({
                  articleList:e.data.articleList,
                  pageData:e.data.page,
                  articleState: articleState,
                  keyword: keyword,
                  flag: flag
              });
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
      var keyword=this.data.keyword;
      var page=this.data.pageData.nextPage;
      if(page<1){
          wx.showToast({
              title: '对不起，已经没有了',
              icon:"none"
          })
      }else{
          wx.showLoading({
              title: '正在加载...',
          })
          var that = this;
          var articleList=this.data.articleList;
          var flag=this.data.flag;
          wx.request({
              url: api.search(),
              data: { flag: flag, keyword: keyword ,page:page},
              success: function (e) {
                  that.setData({
                      articleList: articleList.concat(e.data.articleList),
                      pageData: e.data.page,
                  });
                  wx.hideLoading();
                  wx.showToast({
                      title: '数据加载成功',
                      duration:500
                  })
              }
          })
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})