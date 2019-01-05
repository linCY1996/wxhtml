var app = getApp()
Page({
  data: {
    cecshi: '', 
    tempFilePath: '',
    savedFilePath: wx.getStorageSync('savedFilePath') || '',
    dialog: {
      hidden: true
    }
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          tempFilePath: res.tempFilePaths[0]
        })
      }
    })
  },
  bindinput: function (e) {
    this.setData({
      ceshi: e.detail.value
    });
  },  
  saveFile: function (e) {
    // console.log(this.data.tempFilePath)
    // console.log(this.data.ceshi)
    if (this.data.tempFilePath.length > 0) {
      // var that = this
      wx.request({
        url: 'http://127.0.0.1:60/api/up/news',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          id: app.globalData.userid,
          msg: this.data.ceshi,
          imgs: this.data.tempFilePath,
          nickName: app.globalData.nickName,
          avatarUrl: app.globalData.avatarUrl,
          city: app.globalData.city
        },
        success: function (resp) {
          // console.log(resp)
          wx.showToast({

            title: '上传成功',

            icon: 'success',

            duration: 1000//持续的时间

          })
        }
      })
    }
  },
  clear: function () {
    wx.setStorageSync('savedFilePath', '')
    this.setData({
      tempFilePath: '',
      savedFilePath: ''
    })
  },
  confirm: function () {
    this.setData({
      'dialog.hidden': true
    })
  }
})
