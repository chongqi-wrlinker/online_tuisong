// pages/more/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageData: {
          currentPage:1,
          totalPage:2,
          totalCount:1,
      },
      nextPage:"",
      listData:[],
      showtoast:1,//1:不显示触底提示，2：显示等待加载，3：显示这是最后一页的提示
      type:"",//1：热门，2：最新
  },
  xiangxi: function (e) {
    wx.navigateTo({
      url: '/pages/xiangxi/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showNavigationBarLoading();
      var nextPage = parseInt(this.data.currentPage)+1;
      this.setData({
          nextPage: nextPage
      });
      var type=options.type;
      if(type==1){
          var title ="热门 · 查看更多";
      }else{
          var title = "最新 · 查看更多";
      }
      wx.setNavigationBarTitle({
          title: title
      })
      
      //获取对应的数据内容
      this.getRowsList(1,type);
  },

  getRowsList:function(page,flag){
      var userID=wx.getStorageSync("userID");
      var that=this;
      wx.request({
          url: api.getMoreContentData(),
          data: { page: page, flag: flag,userID:userID},
          success:function(data){
              var listData = that.data.listData;
              var finalList = listData.concat(data.data.msg.listData);
              that.setData({
                    pageData:data.data.msg.pageData,
                    listData: finalList,
                    type:flag,
              });
              wx.hideNavigationBarLoading();
          }
      })
  },

  yuedu: function (e) {
    wx.navigateTo({
      url: '/pages/yuedu/index',
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
      wx.showNavigationBarLoading();
      var pageData = this.data.pageData;
      var nextPage = parseInt(pageData.currentPage) + 1;
      if (nextPage<=pageData.totalPage){
          var flag=2;
      }else{
          var flag=3;
      }
      this.setData({
          showtoast: flag
      });
      this.getRowsList(nextPage, this.data.type);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})