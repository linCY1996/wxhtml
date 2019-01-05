//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    appid:'wxf9039eee7c43a2ff',
    secert:'5b3967385115a5e3da5bc1e9ad9b1d1e'
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    // console.log(e)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.login({
        success:function(resp){
          wx.request({
            url: 'http://127.0.0.1:60/api/user/login',
            method:'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              js_code: resp.code,
              appid: that.data.appid,
              secret: that.data.secert,
              grant_type: "authorization_code",
              nickName: e.detail.userInfo.nickName,
              avatarUrl: e.detail.userInfo.avatarUrl,
              province: e.detail.userInfo.province,
              city: e.detail.userInfo.city
            },
            
            success: function (res) {
              //从数据库获取用户信息
              // console.log(res)
              app.globalData.userid=res.data.data[0]
              app.globalData.city = e.detail.userInfo.city
              app.globalData.nickName = e.detail.userInfo.nickName
              app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
              wx.redirectTo({
                url: '../index/index'
              })
            

              // console.log(app.globalData.userid)
              // 
              // console.log("插入小程序登录用户信息成功！");
            }
          });
        }
      })
   
      //授权成功后，跳转进入小程序首页
     

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  // //获取用户信息接口
  // queryUserInfo: function () {
  //   // console.log(app.globalData.openid)
    
  //   wx.request({
  //     url: 'http://127.0.0.1:60/api/user/show',
  //     data: {
  //       openid: app.globalData.openid
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       // console.log(res.data);
  //       app.globalData.userInfo = res.data;
  //     }
  //   }) ;
  // },
// 
})
