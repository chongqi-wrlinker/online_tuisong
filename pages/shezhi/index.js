// pages/shezhi/index.js
var api=require("../../api/api.js");
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    likeList:[],
    dianjis:false,
    _dianji:1,
  },
  check: function (e) {
    this.setData({
      _dianji: e.target.dataset.num
    })
  },
  checkboxChange: function (e) {
    this.setData({
        likeList: e.detail.value,
        dianjis:true
    });
    //console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  
  //保存设置
    saveConfig:function(e){
        var dianjis = this.data.dianjis;
        if (dianjis){
            wx.showLoading({
                title: '正在保存数据...',
            })
            var allList = this.data.list;
            var userLike = this.data.likeList;
            //取2者的差集，计算出用户不喜欢的目录
            var allIdArr = new Array();
            for (var i = 0; i < allList.length; i++) {
                for (var j = 0; j < allList[i]['children'].length; j++) {
                    allIdArr[allIdArr.length] = allList[i]['children'][j]['id'];
                }
            }
            var userNotList = util.getDiffArr(allIdArr, userLike);
            var fianlIdStr = userNotList.join("-");
            //保存用户不喜欢的目录到数据库中
            var userID = wx.getStorageSync("userID");
            wx.request({
                url: api.updateUserHoppy(),
                data: { userID: userID, idArr: fianlIdStr},
                success:function(res){
                    wx.hideLoading();
                    wx.showToast({
                        title: '数据更新成功',
                        icon: "success",
                        duration:500
                    })
                }
            })
        }else{
            wx.showToast({
                title: '数据更新成功',
                icon:"success"
            })
        }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取系统所有的目录，并且获取用户已经设置了偏好的目录
    var userID=wx.getStorageSync("userID");
    var that=this;
    wx.request({
        url: api.getHobbyMuLuList(),
        data:{userID:userID},
        success:function(res){
            console.log(res.data);
            that.setData({
                list:res.data
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})