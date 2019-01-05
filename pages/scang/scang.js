var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ims: '' //评价
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:60/api/user/showsc',
      method: 'get',
      data: {
        id: app.globalData.userid,
      },
      success: function (resp) {
        // console.log(resp.data)
        that.setData({
          ims: resp.data
        })
      }
    })
  },
  remove: function (e) {
    var kid = e.currentTarget.dataset.id
    // console.log(kid)
    wx.request({
      url: 'http://127.0.0.1:60/api/remove/commands',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: kid
      },
      success: function (resp) {
        // console.log(resp)
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      }

    })
  }
})