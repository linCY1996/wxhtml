var app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    

    // 模块一
    navbar: ['首页', '最新', '个人中心'],
    currentTab: 0,
    autoplay: true,
    indicatorDots: true,
    duration: 1000,
    interval: 2000,
    beforeColor: "gray",
    afterColor: "orange",
    supervideoItem: {},
    imss:'',
    
    // 模块三
    userBox: [{
        userBox: "收藏夹",
        userNum: "6"
      },
      {
        userBox: "关注",
        userNum: "25"
      },
      {
        userBox: "粉丝",
        userNum: "2万"
      }

    ]


  },
  // 顶部导航选项卡
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });

  },
  onLoad: function() {
    var that = this
    //在个人中心显示用户头像昵称
    wx.request({
      url: 'http://47.107.34.107:60/api/getgoods',
      method: 'get',
      
      header: {
        'Content-Type': 'application/json'
      },
      success: function(resp) {
        that.setData({
          array: resp.data
        })
      }
    });
    wx.request({
      url: 'http://47.107.34.107:60/api/shou/lun',
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(resp) {
        that.setData({
          swiperList: resp.data
        })
      }
    });
    wx.request({
      url: 'http://47.107.34.107:60/api/new/user',
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        id: app.globalData.userid
      },
      success: function(resp) {
        // console.log(resp.data)
        that.setData({
          supervideoItem: resp.data
        })
      }
    });
    wx.request({
      url: 'http://47.107.34.107:60/api/new/usershow',
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(resp) {
        // console.log(resp)
        that.setData({
          blog: resp.data
        })
      }
    });
  },
  onShow: function () {
    this.onLoad()
  }


})