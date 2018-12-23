// pages/addre/addre.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add:[],   //用户地址信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://47.107.34.107:60/api/addr/show',
      method:'get',
      data: {
        id: app.globalData.userid
      },
      header:{
        'Content-Type':'application/json'
      },
      success:function(resp){
        // console.log(resp)
        that.setData({
          add :resp.data
        })
      }
    })  
  },
  remove:function(e){
    // var $this = this;
    // console.log(e.currentTarget.id)
    // console.log()
    var kid = e.currentTarget.dataset.id
    wx.request({
      url: 'http://47.107.34.107:60/api/remove/addre',
      method:'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        id:kid
      },
      success:function(resp){
        // console.log(resp)
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      }

    })
  },
  onShow:function(){
    this.onLoad()
  }
  
})