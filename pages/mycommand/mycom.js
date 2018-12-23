var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ims:'' //评价
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://47.107.34.107:60/api/user/command',
      method:'get',
      data:{
        id: app.globalData.userid,
      },
      success:function(resp) {
        // console.log(resp.data)
        that.setData({
          ims:resp.data
        })
      }
    })
  },
  remove:function(e) {
    var kid = e.currentTarget.dataset.id
    // console.log(kid)
    wx.request({
      url: 'http://47.107.34.107:60/api/remove/command',
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