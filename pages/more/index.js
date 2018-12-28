// pages/more/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabList: [
          
      ],
      result:true,
      swiperHeight:"0px",
      loadingState:true,
      currentMuLuID:0
  },
  //目录改变的方法
  changeMulu:function(e){
      this.setData({
          result: true
      });
      var muluID = e.detail.muluID;
      var muluList=this.data.tabList;
      var flagMulu=[];
      for (var i = 0; i < muluList.length; i++) {
          if (muluList[i]['id'] == muluID) {
              flagMulu = muluList[i];
              break;
          }
      }
      this.getArticleList(1, muluID, muluList, "change");
  },

  //通过左右滑动执行方法
    changeMuluS:function(e){
        this.setData({
            result: true
        });
        var index = e.detail.index;
        var muluList = this.data.tabList;
        var flagMulu = [];
        for (var i = 0; i < muluList.length; i++) {
            if (index == i) {
                flagMulu = muluList[i];
                break;
            }
        }
        var muluID=flagMulu['id'];
        this.getArticleList(1, muluID, muluList,"change");
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var title = options.name;
      wx.showNavigationBarLoading();
     
      wx.setNavigationBarTitle({
          title: title + " · 查看更多"
      })
      var that=this;
      wx.request({
          url: api.getRestMuLuList(),
          data: { idArr: options.muluArr},
          success:function(res){
              if (res.data[0]['articleList'].length<1){
                  //获取该页的文章列表
                  var muluID = res.data[0]['id'];
                  that.getArticleList(1, muluID, res.data,"change");
                  wx.hideNavigationBarLoading();
              }
              that.setData({
                  tabList:res.data,
              });
          }
      })
      //获取对应的数据内容
      //this.getRowsList(1,type);
  },

    //获取某个目录下的文章列表
    getArticleList:function(page,muluID,muluList,flag){
        if (page>0){
            wx.showLoading({
                title: '正在加载...',
            })
            var that = this;
            wx.request({
                url: api.getArticleList(),
                data: { page: page, muluID: muluID },
                success: function (res) {
                    //把文章列表赋值到对应的目录下
                    var swiperHeight = 0;
                    for (var i = 0; i < muluList.length; i++) {
                        if (muluList[i]['id'] == muluID) {
                            if(flag=="change"){
                                muluList[i]['articleList'] = res.data.articleList;
                            }else{
                                muluList[i]['articleList'] = muluList[i]['articleList'].concat(res.data.articleList);
                            }
                            muluList[i]['pageData'] = res.data.page;
                            swiperHeight = ((muluList[i]['articleList'].length) * 108) + "px";
                        }
                    }
                    if (swiperHeight=="0px"){
                        var result=false;
                    }else{
                        var result = true;
                    }
                    that.setData({
                        tabList: muluList,
                        loadingState: false,
                        currentMuLuID: muluID,
                        swiperHeight: swiperHeight,
                        result:result
                    });
                    wx.hideLoading();
                }
            })
        }else{
            wx.showToast({
                title: '没有了',
                icon:"none"
            })
        }
    },
    xiangxi: function (e) {
        var articleID = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/xiangxi/index?articleID=' + articleID,
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
      console.log("执行了");
      //this.getArticleList: function(page, muluID, muluList);
      var muluList = this.data.tabList;
      var muluID = this.data.currentMuLuID;
      for (var i = 0; i < muluList.length; i++) {
          if (muluList[i]['id'] == muluID) {
              var page = muluList[i]['pageData']['nextPage'];
              
          }
      }
      this.getArticleList(page, muluID, muluList,"add");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})