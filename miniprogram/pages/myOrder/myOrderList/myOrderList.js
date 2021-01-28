// miniprogram/pages/myOrder/myOrderList/myOrderList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderListArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getUserOrderList',
      // 传给云函数的参数
      data: {},
      success: function(res) {
        console.log(res);
        var orderListArray = res.result.data;
        that.setData({
          orderListArray: orderListArray
        })
      },
      fail: console.error
    });
  },

  gotoOrderDetail: function(views) {
      var index = views.currentTarget.dataset.current;
      var json = this.data.orderListArray[index];
      wx.navigateTo({
        url: '../myOrderDetail/myOrderDetail',
        success: function(res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', { orderDetail: JSON.stringify(json)})
        }
      });
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