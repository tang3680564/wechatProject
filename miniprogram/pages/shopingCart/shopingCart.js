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

  },

  subNumber: function (view) {

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