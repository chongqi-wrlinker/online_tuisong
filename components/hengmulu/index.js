// components/hengmulu/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      tabList: {
          type: Array,//类型
          value: 'default value'//默认值
      },
      loadingState:{
          type: Boolean,
          value:true
      },
      swiperHeight:{
          type: String,
          value:"0px"
      },
      result:{
          type: Boolean,
          value:true
      },
      noContent:{
          type:String,
          value:""
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
        curTab: 0,
        current: 0,
        funcState:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
        
        selectTab(e) {
            let index = e.target.dataset.index;
            var muluID = e.target.dataset.id;
            this.triggerEvent('changeMulu', { muluID: muluID});
            this.setData({
                curTab: index,
                current: index,
                funcState:true
            })
        },
        xiangxi(e){
            var articleID = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: '/pages/xiangxi/index?articleID=' + articleID,
            })
        },
        swiperChange(e) {
            let index = e.detail.current;
            var funcState = this.data.funcState;
           if(!funcState){
               this.triggerEvent('changeMuluS', { index: index });
           }
            
            this.setData({
                curTab: index,
                current: index,
                funcState:false
            })
        },
        //搜索方法
      toSearch:function(e){
          this.triggerEvent('toSearch');
        }
  }
})
