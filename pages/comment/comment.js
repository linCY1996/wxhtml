var app = getApp()
Page({
    data: {
        flag: 0,
        noteMaxLen: 300, // 最多放多少字
        info: "",
        noteNowLen: 0, //备注当前字数
        ims:'', //商品头像
        ceshi:'',   //用户评价内容

        stars: [{
                flag: 1,
                bgImg: "../../img/comment/xingxing.png",
                bgfImg: "../../img/comment/huangxing.png",
               
            },
            {
                flag: 1,
                bgImg: "../../img/comment/xingxing.png",
                bgfImg: "../../img/comment/huangxing.png"
            },
            {
                flag: 1,
                bgImg: "../../img/comment/xingxing.png",
                bgfImg: "../../img/comment/huangxing.png"
            },
            {
                flag: 1,
                bgImg: "../../img/comment/xingxing.png",
                bgfImg: "../../img/comment/huangxing.png"
            },
            {
                flag: 1,
                bgImg: "../../img/comment/xingxing.png",
                bgfImg: "../../img/comment/huangxing.png"
            },
           
        ]

    },
    // 监听字数
    bindTextAreaChange: function(e) {
        var that = this
        var value = e.detail.value,
            len = parseInt(value.length);
        if (len > that.data.noteMaxLen)
            return;
        that.setData({
            info: value,
            noteNowLen: len
        })

    },
    score: function(e) {
        var that = this;
        for (var i = 0; i < that.data.stars.length; i++) {
            var allItem = 'stars[' + i + '].flag';
            that.setData({
                [allItem]: 1
            })
        }
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i <= index; i++) {
            var item = 'stars[' + i + '].flag';
            that.setData({
                [item]: 2
            })
        }
    },

  bindTextAreaChange: function (e) {
    this.setData({
      ceshi: e.detail.value
    });
  },  

    // 提交清空当前值
    bindSubmit: function() {
        var that = this;
      // console.log(this.data.ims.imgs)

        wx.request({
          url: 'http://47.107.34.107:60/api/detail/com',
          method:'post',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            id: app.globalData.userid,
            msg: this.data.ceshi,
            imgs: this.data.ims.imgs
          },
          success: function(resp) {
            wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 1500,
                mask: false,
                success: function() {
                    that.setData({
                        info: '',
                        noteNowLen: 0,
                        flag: 0
                    })
                }
            })
          }
        })  
    },
  onLoad:function(e) {
    var that = this
    var id = e.kid
    // console.log(id)

    wx.request({
      url: 'http://47.107.34.107:60/api/user/judge',
      method:'get',
      data:{
        kid:id
      },
      success:function(resp){
        that.setData({
          ims:resp.data
        })
      }
    })
  }


})