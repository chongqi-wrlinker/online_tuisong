// pages/shezhi/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    itemss: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    dianjis:false,
    _dianji:1,
  },
  check: function (e) {
    this.setData({
      _dianji: e.target.dataset.num
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  checke: function (e) {
    var that = this;
    that.setData({
      dianjis: (!that.data.dianjis)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
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