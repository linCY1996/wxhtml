// pages/personal/person.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
    lis:{},
    blog:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // var id = e.kid
    // console.log(id)
    var that = this
    wx.request({
      url: 'http://47.107.34.107:60/api/user/detail',
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
      url: 'http://47.107.34.107:60/api/user/msgs',
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

  remove:function(e) {
    var kids = e.currentTarget.dataset.id
    // console.log(kid)
    wx.request({
      url: 'http://47.107.34.107:60/api/remove/usershow',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: kids
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