// pages/gzhu/gzhu.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    supervideoItem: {},
    blog:'',
    num: 1,
    
    msgguan: '已关注'
  },

  guan: function (e) {
    var that = this
    // console.log(e.currentTarget.dataset.gzid)
    var num = this.data.num;
    var msgguan = (num % 2 == 0) ? '已关注' : '取消关注';
    this.setData({
      msgguan: msgguan
    })
    wx.request({
      url: 'http://127.0.0.1:60/api/new/removegz',
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        id: e.currentTarget.dataset.gzid
      },
      success:function(resp) {
        that.onLoad()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // console.log(app.globalData.userid)
    wx.request({
      url: 'http://127.0.0.1:60/api/new/gzuser',
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
      url: 'http://127.0.0.1:60/api/new/gzusershow',
      method: 'get',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        id: app.globalData.userid
      },
      success: function (resp) {
        // console.log(resp)
        that.setData({
          blog: resp.data
        })
        
      }
    });
    
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