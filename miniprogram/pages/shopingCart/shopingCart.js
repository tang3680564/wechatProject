// miniprogram/pages/shopingCart/shopingCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopCartJson: {},
      totalPrice: 0
  },

  addNumber: function (view) {
      var index = view.target.dataset.current;
      var shopCartJson = this.data.shopCartJson;
      var cellJson = shopCartJson[index];
      cellJson.number = cellJson.number + 1;
      cellJson.shopTotalPrice = Math.round((cellJson.number*cellJson.price)*100)/100;
      var totalPrice = Math.round((cellJson.price + this.data.totalPrice)*100)/100;
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
    cellJson.shopTotalPrice = Math.round((cellJson.number*cellJson.price)*100)/100;
    var totalPrice = Math.round((this.data.totalPrice - cellJson.price)*100)/100;
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
        var price = res.data;
        that.setData({
          totalPrice: price,
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