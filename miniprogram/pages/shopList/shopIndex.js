// miniprogram/pages/shopList/shopIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listSelectIndex: 0,
    detailSelectIndex: -1,
    totalPrice: 0,
    shopingJson: {},
    array: [{
      message: '猪肉',
    }, {
      message: '鸡'
    }, {
      message: '油'
    }],

    shopDetail: [{
      id: '1',
      shoppingTitle: '猪肉500g',
      price: 10.25,
      number: 0,
    }, {
      id: '2',
      shoppingTitle: '鸡300g',
      price: 15.3,
      number: 0,
    }, {
      id: '3',
      shoppingTitle: '油300g',
      price: 17.5,
      number: 0,
    },{
      id: '4',
      shoppingTitle: '猪肉1kg',
      price: 18.6,
      number: 0,
    }, {
      id: '5',
      shoppingTitle: '鸡2kg',
      price: 31,
      number: 0,
    }, {
      id: '6',
      shoppingTitle: '油2kg',
      price: 34,
      number: 0,
    }]
  },

  shopListViewTap: function(view) {
      this.setData({
        listSelectIndex: view.target.dataset.current,
        detailSelectIndex: -1
      })
      if (view.target.dataset.current == 1) {
          this.setData({
            shopDetail: [{
              message: '鹅',
            }, {
              message: '鹅'
            }, {
              message: '鹅'
            },{
              message: '鸡',
            }, {
              message: '鸡'
            }, {
              message: '鸡'
            }]
          })
      } else {
        this.setData({
          shopDetail: [{
            message: '猪肉',
          }, {
            message: '鸡'
          }, {
            message: '油'
          },{
            message: '猪肉',
          }, {
            message: '鸡'
          }, {
            message: '油'
          }]
        })
      }
  },

  addNumber: function (view) {
    var index = view.target.dataset.current;
    //获取当前商品对象
    var shop =  this.data.shopDetail[index];
    //计算当前商品添加的数量
    var number = shop.number + 1;
    var str = "shopDetail[" + index + "].number"
    //获取当前总价格
    var totalPriceStr = this.data.totalPrice;
    //购物车对象存储
    var shopingId = shop.id;
    var objectJson = this.data.shopingJson[shopingId];
    if (objectJson == undefined || objectJson == null) {
      shop.shopTotalPrice = Math.round((number*shop.price)*100)/100;
      this.data.shopingJson[shopingId] = shop;
    } else {
      objectJson.number = number;
      this.data.shopingJson[shopingId] = objectJson;
      //单个商品总价格计算
      objectJson.shopTotalPrice = Math.round((number*shop.price)*100)/100;
    }
    //总价格计算
    totalPriceStr = Math.round((totalPriceStr+shop.price)*100)/100; 
    this.setData({
      [str]: number,
      totalPrice: totalPriceStr
    })
    this.saveShoppingJson();
  },

  subNumber: function (view) {
    var index = view.target.dataset.current;
    //获取当前商品对象
    var shop =  this.data.shopDetail[index];
    //计算当前商品数量
    var number = shop.number - 1;
    if (number < 0) {
      number = 0;
    }
    var str = "shopDetail[" + index + "].number"
    //购物车对象存储
    var shopingId = shop.id;
    var objectJson = this.data.shopingJson[shopingId];
    if (objectJson == undefined || objectJson == null) {
      // this.data.shopingJson[shopingId] = shop;
      console.log("当前商品不存在");
    } else {
      objectJson.number = number;
      this.data.shopingJson[shopingId] = objectJson;
      objectJson.shopTotalPrice = Math.round((number*shop.price)*100)/100;
      //如果数量为0，清除购物车中的对象
      if (number == 0 ) {
        delete this.data.shopingJson[shopingId]; 
      }
    }
    //获取当前总价格
    var totalPriceStr = this.data.totalPrice;
    //计算总价格
    totalPriceStr = Math.round((totalPriceStr-shop.price)*100)/100;
    if (totalPriceStr < 0) {
      totalPriceStr = 0;
    }
    this.setData({
      [str]: number,
      totalPrice: totalPriceStr
    })
    this.saveShoppingJson();
  },

  saveShoppingJson: function() {
    try {
      wx.setStorageSync('shoppingJson', JSON.stringify(this.data.shopingJson));
      wx.setStorageSync('totalPrice', this.data.totalPrice);
    } catch (e) { 
      console.log(e);
    }
  },

  //跳转去购物车
  navShopingCart: function() {
    wx.switchTab({
      url: '../shopingCart/shopingCart'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    wx.getStorage({
      key: 'shoppingJson',
      success (res) {
        console.log(res.data);
        var json = JSON.parse(res.data);
        var shopDetaiArray = [];
        //同步购物车对象的数量
        for (var i in that.data.shopDetail) {
          //获取当前页面的商品详情对象
          var shopDetail = that.data.shopDetail[i];
          var shopId = shopDetail.id;
          //获取购物车商品详情的对象
          var shopDeatailCell = json[shopId];
          if (shopDeatailCell != null && shopDeatailCell != undefined) {
            shopDetail =  shopDeatailCell;
          } else {
            shopDetail.number = 0;
            shopDetail.totalPrice = 0;
          }
          shopDetaiArray.push(shopDetail);
        }
        console.log(shopDetaiArray);
        that.setData({
          shopingJson: json,
          shopDetail: shopDetaiArray
        });
      }
    });
    wx.getStorage({
      key: 'totalPrice',
      success (res) {
        var price = res.data;
        that.setData({
          totalPrice: price,
        });
      }
    })
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