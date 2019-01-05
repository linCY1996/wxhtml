// pages/personal/person.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lis: {},
    blog: [],
    num: 1,
    msgguan: '已关注'
  },
  guan: function () {
    var num = this.data.num;
    var msgguan = (num % 2 == 0) ? '已关注' : '取消关注';
    this.setData({
      msgguan: msgguan
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // var id = e.kid
    // console.log(id)
    var that = this
    wx.request({
      url: 'http://127.0.0.1:60/api/user/detail',
      method: 'get',
      data: {
        id: app.globalData.userid
      },
      // header: {
      //   'Content-Type': 'application/json'
      // },

      success: function (resp) {
        // console.log(app.globalData.userid)
        // console.log(resp.data)
        that.setData({
          blog: resp.data
        })
      }
    });
    wx.request({
      url: 'http://127.0.0.1:60/api/user/msgs',
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
          lis: resp.data
        })
      }
    });
  },

})