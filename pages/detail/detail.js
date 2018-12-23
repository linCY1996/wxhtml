var app = getApp()
Page({
    
    data: {
        navbar: ['商品详情', '评价'],
        currentTab: 0,
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        circular: true,
        interval: 2000,
        duration: 500,
        previousMargin: 0,
        nextMargin: 0,

        titleTxt:'',
        prcieNow:'',
        imgs:'',

        // 数量加减
        // input默认是1
        num: 1,
        messmsg:'收藏',
        // 使用data数据对象设置样式名
        minusStatus: 'disabled',
    },
    /*点击收藏*/
    btns :function(){
      var num = this.data.num;
      // for(var i = 0;i<num;i++){
        var messmsg = (num%2==0)? '收藏':'已收藏';
        this.setData({
          messmsg: messmsg,
        });
      // }
    },
  // 顶部导航选项卡
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });

  },

    /* 点击减号 */
    bindMinus: function() {
        var num = this.data.num;
        // 如果大于1时，才可以减
        if (num > 1) {
            num--;
        }
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 点击加号 */
    bindPlus: function() {
        var num = this.data.num;
        // 不作过多考虑自增1
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num < 1 ? 'disabled' : 'normal';
        // 将数值与状态写回
        this.setData({
            num: num,
            minusStatus: minusStatus
        });
    },
    /* 输入框事件 */
    bindManual: function(e) {
        var num = e.detail.value;
        // 将数值与状态写回
        this.setData({
            num: num
        });
    },
    
    onLoad:function(e) {
      var that = this
      var id=e.kid
      // console.log(id)
      wx.request({
        url: 'http://47.107.34.107:60/api/single/singlede',
        method:'get',
        // header:{
        //   'Content-Type':'application/json'
        // },
        data:{kid:id},
        success:function(resp) {
          // console.log(resp)
          that.setData({
            background: resp.data
          })
        }
      });
      wx.request({
        url: 'http://47.107.34.107:60/api/detail/viewbig',
        method:'get',
        data:{kid:id},     
        success:function(resp){
          that.setData({
            detailImg: resp.data
          })
        }
      }),
      wx.request({
        url: 'http://47.107.34.107:60/api/deta/msgs',
        method: 'get',
        data: { kid: id },
        success: function (resp) {
          that.setData({
            titleTxt: resp.data.name,
            priceNow: resp.data.price,
            priceBefore: resp.data.oldprice,
            imgs: resp.data.imgs,
            id: resp.data.id,
          })
        }
      })
    },
    inergwc: function (e) {
        var price = this.data.priceNow
        var name = this.data.titleTxt
        var imgs = this.data.imgs
        var num = this.data.num
        var gid = e.currentTarget.dataset.id
      // console.log(e.currentTarget.dataset.id)
      // console.log(num)
      wx.request({
        url: 'http://47.107.34.107:60/api/insert/gwc',
        method:'post',
        header:{
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          id: app.globalData.userid,
          price:price,
          imgs:imgs,
          name : name,
          goodsid:gid,
          nums:num
        },
        success:function(resp){
          wx.showToast({

            title: '成功',

            icon: 'success',

            duration: 2000//持续的时间

          })
        }
      })
    },

  //立即购买
  nowbuy: function (e) {
    var price = this.data.priceNow
    var name = this.data.titleTxt
    var imgs = this.data.imgs
    var num = this.data.num
    var gid = e.currentTarget.dataset.id
    // console.log(e.currentTarget.dataset.id)
    // console.log(num)
    wx.request({
      url: 'http://47.107.34.107:60/api/now/buy',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        price: price,
        imgs: imgs,
        name: name,
        goodsid: gid,
        nums: num
      },
      success: function (resp) {
        wx.showToast({

          title: '购买成功',

          icon: 'success',

          duration: 2000//持续的时间

        })
      }
    })
  }



})