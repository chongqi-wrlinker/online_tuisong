// pages/search/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      searchType:"article",
      actionSheetHidden: true,
      actionSheetItems: [
          { flag: 'author', txt: '作者' },
          { flag: 'article', txt: '文章' },
      ],
      hotArticleList:[],
  },
    //出现上拉弹出框选择类型
    changeSearchType: function () {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        })
    },
    //上拉弹出框改变后执行的方法
    bindaction: function (e) {
        var flag=e.currentTarget.dataset.flag;
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden,
            searchType: flag
        })
    },

    //提交搜索方法
    search:function(e){
        var keyword=e.detail.value.keyword;
        if(keyword==""){
            wx.showToast({
                title: '请输入关键字',
                icon:"none"
            })
            return false
        }else{
            //跳转到搜索结果页面
            var flag = this.data.searchType;
            wx.navigateTo({
                url: '/pages/searchResult/index?flag='+flag+"&keyword="+keyword,
            })
        }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //获取热门文章的列表
      var that=this;
      wx.request({
          url: api.getArticleListBySort(),
          data:{param:"click",flag:"desc"},
          success:function(res){
              that.setData({
                  hotArticleList: res.data
              });
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})