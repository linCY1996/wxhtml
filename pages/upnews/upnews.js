// pages/upnews/upnews.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tempFilePaths:[]
    imgs:[],
    cecshi:'',  //输入文字
    // tempFilePaths:[]  //图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  // 上传图片
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(tempFilePaths[0])
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  // // 删除图片
  // deleteImg: function (e) {
  //   var imgs = this.data.imgs;
  //   var index = e.currentTarget.dataset.index;
  //   imgs.splice(index, 1);
  //   this.setData({
  //     imgs: imgs
  //   });
  // },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  bindinput: function (e) {
    this.setData({
      ceshi: e.detail.value
    });
  },  
  send:function(e){
    // console.log(e)
    // console.log(this.data.ceshi)
    // console.log(app.globalData.city)
    // console.log(this.data.imgs)
    wx.request({
      url: 'http://47.107.34.107:60/api/up/news',
      method:'POST',
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        id: app.globalData.userid,
        msg: this.data.ceshi,
        imgs: this.data.imgs,
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl,
        city: app.globalData.city
      },
      success:function(resp){
        // console.log(resp)
        wx.showToast({

          title: '上传成功',

          icon: 'success',

          duration: 1000//持续的时间

        })
      }
    })
  },
  
})