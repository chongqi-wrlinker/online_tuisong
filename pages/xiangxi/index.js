//logs.js
var api=require("../../api/api.js");
let wxparse = require("../../wxParse/wxParse.js");
var util = require('../../utils/util.js')
var touchDot = 0;//触摸时的原点 
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
Page({
  data: {
      articleInfo:[],
    scroll_top: 0,
    Text: "",
    initFontSize: '14',
    bodyColor: '#e9dfc7',
    daynight: false,
    zitiaction:false,
    zj: 'none',
    nav: 'none',
    shoucang:false,
    sc:0,
    like:0,
    nolike:0,
    tsk:false,
    tsks: false,
  },
  onLoad: function (options) {
      var that=this;
      //var articleID=9461;
      var articleID = options.articleID;
      var userID=wx.getStorageSync("userID");
      wx.request({
          url: api.getOneArticleInfo(),
          data: { articleID: articleID, userID: userID},
          success:function(res){
              console.log(res);
              if (res.data[0]['muLuInfo'][0]['pid']==21){
                  //该类型是诗词模板，需要断句
                  res.data[0]['content']=util.duanJu(res.data[0]['content']);
                  res.data[0]['des'] = util.desDuanJu(res.data[0]['des']);
                  
              }

              that.setData({
                  articleInfo:res.data[0]
              });
          }
      })
    
    
  },
  
  
  //点击中间区域显示底部导航
  midaction: function () {
    if (this.data.nav == 'none') {
      this.setData({
        nav: 'block'
      })
    } else {
      this.setData({
        nav: 'none',
        ziti: 'none'
      })

    }
  },
  
 //收藏方法
  shoucang: function () {
        var articleInfo = this.data.articleInfo;
        articleInfo.shouChangState = !articleInfo.shouChangState;
        if (articleInfo.shouChangState) {
            var count = parseInt(articleInfo.shouChangCount)+1;
            var flag=1;
        } else {
            var count = parseInt(articleInfo.shouChangCount)- 1;
            var flag=2;
        }
        console.log(flag);
        //添加或者删除收藏记录
        var userID=wx.getStorageSync("userID");
        var articleID=articleInfo.id;
        wx.request({
            url: api.dealShouChang(),
            data: { userID: userID, articleID: articleID, flag: flag},
            success:function(res){
                console.log(res);
            }
        })
        articleInfo.shouChangCount=count;
        this.setData({
          articleInfo: articleInfo
        });
  },
  //喜欢方法
    zitiaction: function () {
        var articleInfo=this.data.articleInfo;
        if (articleInfo.likeState == 0) {
            var state=1;
            articleInfo.likeState=1;
            articleInfo.likeCount = parseInt(articleInfo.likeCount)+1;
        } else if (articleInfo.likeState == 1){
            var state = 0;
            articleInfo.likeState = 0;
            articleInfo.likeCount = parseInt(articleInfo.likeCount) - 1;
        } else if (articleInfo.likeState==2){
            articleInfo.likeState = 1;
            articleInfo.likeCount = parseInt(articleInfo.likeCount) + 1;
            articleInfo.dontLikeCount = parseInt(articleInfo.dontLikeCount) - 1;
            var state = 1;
        }
        this.setData({
            articleInfo: articleInfo
        });
        //修改喜欢的数量
        var userID=wx.getStorageSync("userID");
        var articleID=articleInfo.id;
        wx.request({
            url: api.dealListArticle(),
            data: { userID: userID, articleID: articleID, state: state},
            success:function(res){
                console.log(res);
            }
        })

    },
 
  //切换白天夜晚
  dayNight: function () {
      var articleInfo = this.data.articleInfo;
      if (articleInfo.likeState == 0) {
          var state = 2;
          articleInfo.likeState = 2;
          articleInfo.dontLikeCount = parseInt(articleInfo.dontLikeCount) + 1;
      } else if (articleInfo.likeState == 1) {
          var state = 2;
          articleInfo.likeState = 2;
          articleInfo.likeCount = parseInt(articleInfo.likeCount) - 1;
          articleInfo.dontLikeCount = parseInt(articleInfo.dontLikeCount) + 1;
      } else if (articleInfo.likeState == 2) {
          articleInfo.likeState = 0;
          articleInfo.dontLikeCount = parseInt(articleInfo.dontLikeCount) - 1;
          var state = 0;
      }
      this.setData({
          articleInfo: articleInfo
      });
      //修改喜欢的数量
      var userID = wx.getStorageSync("userID");
      var articleID = articleInfo.id;
      wx.request({
          url: api.dealListArticle(),
          data: { userID: userID, articleID: articleID, state: state },
          success: function (res) {
              console.log(res);
          }
      })
  },
  //滚动隐藏窗口
  scrollContain: function () {
    this.setData({
      nav: 'none',
      ziti: 'none',
      zj: 'none'
    })
  },
  //滚动到底部
  bindscrolltolower: function () {
    this.setData({
      zj: 'block',
    })
  },
  //上一页下一页
  /*lastPage: function () {
    var that=this;
    that.setData({
      Text: '和婚礼相比，顾千城更秦云楚见顾国公久久不给准话，再次威胁道：“顾公国，新娘换不换？本世子还等着新娘上花轿，至于顾千城这残疾，你们爱嫁给谁就嫁让她嫁给谁，总之本世子不要。”关心自己受伤的脚，她现在只希望这场闹剧早点结束，不然她的脚撑不住。顾千城冷眼扫过观礼的客人，这些人纷纷别过脸，一脸尴尬。一伙看看秦云楚、一伙看看顾千城，无人开口。喜堂安静得吓人，似乎连针落地的声道都能听清这个时候，全福夫人收到示意，上前一步打破寂静：“顾国公，这身有残疾的女子确实不能嫁入皇家，顾家执意要大小姐嫁过去，只怕亲家结不成，反倒结成仇家了。”“荒唐，这哪里荒唐了，难道要本世子吃这个哑巴亏，把一个残废娶回家？”秦云楚一脸骄横，残疾二字越说越顺口，看顾千城的眼神，也是一脸嫌恶。',
      scroll_top: 0
    })
  },
  nextPage: function () {
    var that=this;
    that.setData({
      Text: '这一对翁婿，直接越过顾千城，也不管顾千城的意愿，三言两语就同意了换新娘达成所愿，秦云楚满意的停下脚步，笑容满面的转身：“国公爷早同意不就没事，至于我父王和母妃那边，国公爷不必担心，本世子自会解释。”一事。和婚礼相比，顾千城更秦云楚见顾国公久久不给准话，再次威胁道：“顾公国，新娘换不换？本世子还等着新娘上花轿，至于顾千城这残疾，你们爱嫁给谁就嫁让她嫁给谁，总之本世子不要。”关心自己受伤的脚，她现在只希望这场闹剧早点结束，不然她的脚撑不住。顾千城冷眼扫过观礼的客人，这些人纷纷别过脸，一脸尴尬。一伙看看秦云楚、一伙看看顾千城，无人开口。喜堂安静得吓人，似乎连针落地的声道都能听清这个时候，全福夫人收到示意，上前一步打破寂静：“顾国公，这身有残疾的女子确实不能嫁入皇家，顾家执意要大小姐嫁过去，只怕亲家结不成，反倒结成仇家了。”“荒唐，这哪里荒唐了，难道要本世子吃这个哑巴亏，把一个残废娶回家？”秦云楚一脸骄横，残疾二字越说越顺口，看顾千城的眼神，也是一脸嫌恶。',
      scroll_top: 0
    })
    console.log(that.data.Text);
    let winPage = this;
    wxparse.wxParse('Text', 'html', that.data.Text, this, 0);
  },*/
  // 触摸开始事件 
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点 
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件 
  touchMove: function (e) {
    var that=this;
    var touchMove = e.touches[0].pageX;
    // console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
    // 向左滑动  
    if (touchMove - touchDot <= -40 && time < 10) {
      // wx.switchTab({
      //   url: '../左滑页面/左滑页面'
      // });
      // console.log("left")
      that.setData({
        Text: '和婚礼相比，顾千城更秦云楚见顾国公久久不给准话，再次威胁道：“顾公国，新娘换不换？本世子还等着新娘上花轿，至于顾千城这残疾，你们爱嫁给谁就嫁让她嫁给谁，总之本世子不要。”关心自己受伤的脚，她现在只希望这场闹剧早点结束，不然她的脚撑不住。顾千城冷眼扫过观礼的客人，这些人纷纷别过脸，一脸尴尬。一伙看看秦云楚、一伙看看顾千城，无人开口。喜堂安静得吓人，似乎连针落地的声道都能听清这个时候，全福夫人收到示意，上前一步打破寂静：“顾国公，这身有残疾的女子确实不能嫁入皇家，顾家执意要大小姐嫁过去，只怕亲家结不成，反倒结成仇家了。”“荒唐，这哪里荒唐了，难道要本世子吃这个哑巴亏，把一个残废娶回家？”秦云楚一脸骄横，残疾二字越说越顺口，看顾千城的眼神，也是一脸嫌恶。',
        scroll_top: 0
      })
      let winPage = this;
      wxparse.wxParse('Text', 'html', that.data.Text, this, 0);
    }
    // 向右滑动 
    if (touchMove - touchDot >= 40 && time < 10) {
      // console.log('right');
      // wx.switchTab({
      //   url: '../右滑页面/右滑页面'
      // });
      that.setData({
        Text: '这一对翁婿，直接越过顾千城，也不管顾千城的意愿，三言两语就同意了换新娘达成所愿，秦云楚满意的停下脚步，笑容满面的转身：“国公爷早同意不就没事，至于我父王和母妃那边，国公爷不必担心，本世子自会解释。”一事。和婚礼相比，顾千城更秦云楚见顾国公久久不给准话，再次威胁道：“顾公国，新娘换不换？本世子还等着新娘上花轿，至于顾千城这残疾，你们爱嫁给谁就嫁让她嫁给谁，总之本世子不要。”关心自己受伤的脚，她现在只希望这场闹剧早点结束，不然她的脚撑不住。顾千城冷眼扫过观礼的客人，这些人纷纷别过脸，一脸尴尬。一伙看看秦云楚、一伙看看顾千城，无人开口。喜堂安静得吓人，似乎连针落地的声道都能听清这个时候，全福夫人收到示意，上前一步打破寂静：“顾国公，这身有残疾的女子确实不能嫁入皇家，顾家执意要大小姐嫁过去，只怕亲家结不成，反倒结成仇家了。”“荒唐，这哪里荒唐了，难道要本世子吃这个哑巴亏，把一个残废娶回家？”秦云楚一脸骄横，残疾二字越说越顺口，看顾千城的眼神，也是一脸嫌恶。',
        scroll_top: 0
      })
      let winPage = this;
      wxparse.wxParse('Text', 'html', that.data.Text, this, 0);
    }
  },
  // 触摸结束事件 
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval 
    time = 0;
  }
})