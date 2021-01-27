// miniprogram/pages/shopingCart/shopingCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopCartJson: {},
      totalPrice: 0,
      comfrimAlertFlag:false,
      buttons: [{text: '取消'}, {text: '确定'}],
      oneButton: [{text: '确定'}],
      userSelectAddress: "",
      alertInfoFlag: false,
      successOrderFlag: false,
      userInfoSelectJson: {}
  },

  addNumber: function (view) {
      var index = view.target.dataset.current;
      var shopCartJson = this.data.shopCartJson;
      var cellJson = shopCartJson[index];
      cellJson.number = cellJson.number + 1;
      cellJson.shopTotalPrice = Math.round((cellJson.number*cellJson.shop_price)*100)/100;
      var totalPrice = Math.round((cellJson.shop_price + this.data.totalPrice)*100)/100;
      this.setData({
        shopCartJson: shopCartJson,
        totalPrice: totalPrice
      });
      this.saveShoppingJson();
  },

  subNumber: function (view) {
    var index = view.target.dataset.current;
    var shopCartJson = this.data.shopCartJson;
    var cellJson = shopCartJson[index];
    cellJson.number = cellJson.number - 1;
    if (cellJson.number < 0) {
        cellJson.number = 0;
    } 
    cellJson.shopTotalPrice = Math.round((cellJson.number*cellJson.shop_price)*100)/100;
    var totalPrice = Math.round((this.data.totalPrice - cellJson.shop_price)*100)/100;
    if (totalPrice < 0) {
      totalPrice = 0;
    }
    //数量为0，清除购物车中的对象
    if (cellJson.number == 0) {
      delete shopCartJson[index];
    }
    this.setData({
      shopCartJson: shopCartJson,
      totalPrice: totalPrice
    })
    this.saveShoppingJson();
  },

  saveShoppingJson: function() {
    try {
      wx.setStorageSync('shoppingJson', JSON.stringify(this.data.shopCartJson));
      wx.setStorageSync('totalPrice', this.data.totalPrice);
    } catch (e) { 
      console.log(e);
    }
  },

  alertInfoTap: function() {
      this.setData({
          alertInfoFlag: false
      });
  },

  chooseAddress: function() {
    if (this.data.totalPrice <= 0) {
      this.setData({
          alertInfoFlag: true
      })
      return;
    }
    var that = this;
     wx.chooseAddress({
      success (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        that.setData({
          comfrimAlertFlag: true,
          userSelectAddress: res.detailInfo,
          userInfoSelectJson: res
        });
      }
    });
  },

  comfrimTap: function(button) {
    var index = button.detail.index;
    ///点击了确定
    if (index == 1) {
        this.saveUserOrder();
    };
    this.setData({
        comfrimAlertFlag: false
    });
  },

  saveUserOrder: function() {
    let totalPrice = this.data.totalPrice;
    let shopCartJson = this.data.shopCartJson;
    let userInfoJson = this.data.userInfoSelectJson;
    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'userOrderAdd',
      // 传给云函数的参数
      data: {
        totalPrice: totalPrice,
        shopCartJson: shopCartJson,
        userInfoJson: userInfoJson
      },
      success: function(res) {
        
        console.log(res) // 3
        wx.clearStorageSync()
        that.setData({
          successOrderFlag: true
        })
      },
      fail: console.error
    });
  },

  //下单成功
  successOrder: function() {
    wx.navigateTo({
      url: '../myOrder/myOrderList/myOrderList',
    });
      this.setData({
        successOrderFlag: false,
        shopCartJson: {},
        totalPrice: 0
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'shoppingJson',
      success (res) {
        console.log(res.data);
        var json = JSON.parse(res.data);
        that.setData({
          shopCartJson: json,
        });
      }
    });
    wx.getStorage({
      key: 'totalPrice',
      success (res) {
        var shop_price = res.data;
        that.setData({
          totalPrice: shop_price,
        });
      }
    })
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
        var json = JSON.parse(res.data);
        that.setData({
          shopCartJson: json,
        });
      }
    });
    wx.getStorage({
      key: 'totalPrice',
      success (res) {
        var shop_price = res.data;
        that.setData({
          totalPrice: shop_price,
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