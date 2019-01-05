var app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    

    // 模块一
    navbar: ['首页', '最新', '个人'],
    currentTab: 0,
    autoplay: true,
    indicatorDots: true,
    duration: 1000,
    interval: 2000,
    beforeColor: "gray",
    afterColor: "orange",
    supervideoItem: {},
    imss: '',
    num: 1,
    msgguan: '关注一个',
    count: '0',
    sccount: '0'


  },
  // 顶部导航选项卡
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });

  },
  guan: function (e) {
    var that = this
    // console.log(e.currentTarget.dataset.userid)
    var num = this.data.num;
    var msgguan = (num % 2 == 0) ? '关注一个' : '已关注';
    this.setData({
      msgguan: msgguan
    })

    // console.log(priceBefore)
    wx.request({
      url: 'http://127.0.0.1:60/api/user/gzhu',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: app.globalData.userid,
        gid: e.currentTarget.dataset.userid
      },
      success: function (resp) {
        that.onLoad()
      }
    })
  },
  
  onLoad: function() {
    var that = this
    //在个人中心显示用户头像昵称
    wx.request({
      url: 'http://127.0.0.1:60/api/getgoods',
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
      url: 'http://127.0.0.1:60/api/new/usershow',
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (resp) {
        // console.log(resp)
        that.setData({
          blog: resp.data
        })
      }
    });
    wx.request({
      url: 'http://127.0.0.1:60/api/shou/lun',
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

      url: 'http://127.0.0.1:60/api/new/user',
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        id: app.globalData.userid
      },
      success: function (resp) {
        // console.log(resp.data)
        that.setData({
          supervideoItem: resp.data
        })
      }
    });
    wx.request({
      url: 'http://127.0.0.1:60/api/new/gzcount',
      method: 'get',
      data: {
        id: app.globalData.userid
      },
      success: function (resp) {
        // console.log(resp)
        that.setData({
          count: resp.data
        })
      }
    });
    wx.request({
      url: 'http://127.0.0.1:60/api/new/sccount',
      method: 'get',
      data: {
        id: app.globalData.userid
      },
      success: function (resp) {
        // console.log(resp.data)
        that.setData({
          sccount: resp.data
        })
      }
    })
  },
  onShow: function () {
    this.onLoad()
  }


})