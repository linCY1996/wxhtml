// page/component/new-pages/cart/cart.js
var app = getApp()
Page({
    data: {
        carts: [], // 购物车列表
        hasList: false, // 列表是否有数据
        totalPrice: 0, // 总价，初始为0
        selectAllStatus: true, // 全选状态，默认全选
        obj: {
            name: "hello"
        }
    },
    onLoad:function(){
      var that = this
      wx.request({
        url: 'http://127.0.0.1:60/api/show/goods',
        method:'get',
        data:{
          id: app.globalData.userid
        },
        success:function(resp){
          // console.log(resp.data)
          that.setData({
            carts: resp.data
          })
          
        }
      })
    },
    onShow() {
        this.setData({
            hasList: true,
            
        });
        this.getTotalPrice();
    },
    /**
     * 当前商品选中事件
     */
    selectList(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        const selected = carts[index].selected;
        carts[index].selected = !selected;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 删除购物车当前商品
     */
    deleteList(e) {
        var index = e.currentTarget.dataset.id;
       
        wx.request({
          url: 'http://127.0.0.1:60/api/remove/goods',
          method:'post',
          header:{
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            index:index
          },
          success:function(resp){
            console.log(resp)
            if (getCurrentPages().length != 0) {
              //刷新当前页面的数据
              getCurrentPages()[getCurrentPages().length - 1].onLoad()
            }
          }
        })
    },

    /**
     * 购物车全选事件
     */
    selectAll(e) {
        let selectAllStatus = this.data.selectAllStatus;
        selectAllStatus = !selectAllStatus;
        let carts = this.data.carts;

        for (let i = 0; i < carts.length; i++) {
            carts[i].selected = selectAllStatus;
        }
        this.setData({
            selectAllStatus: selectAllStatus,
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 绑定加数量事件
     */
    addCount(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = carts[index].num;
        num = num + 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 绑定减数量事件
     */
    minusCount(e) {
        const index = e.currentTarget.dataset.index;
        const obj = e.currentTarget.dataset.obj;
        let carts = this.data.carts;
        let num = carts[index].num;
        if (num <= 1) {
            return false;
        }
        num = num - 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 计算总价
     */
    getTotalPrice() {
        let carts = this.data.carts; // 获取购物车列表
        let total = 0;
        for (let i = 0; i < carts.length; i++) { // 循环列表得到每个数据
            if (carts[i].selected) { // 判断选中才会计算价格
                total += carts[i].num * carts[i].price; // 所有价格加起来
            }
        }
        this.setData({ // 最后赋值到data中渲染到页面
            carts: carts,
            totalPrice: total.toFixed(2)
        });
    }

})