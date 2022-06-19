// pages/buyed/buyed.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    that.getOrderList(false)
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

  },
  /**
   * 获取订单
   */
  getOrderList: function (justCurrentSite) {
    let that = this;
    //获取用户订单
    wx.request({
      url: app.serverUrl + '/order/getByUserAndSite',
      data: {
        userId: app.globalData.userId,
        siteId: justCurrentSite ? app.globalData.currentSite.id : -1,
      },
      success(getUserOrderRes) {
        console.log(getUserOrderRes)
        if (!!getUserOrderRes.data) {
          if (!!getUserOrderRes.data.data) {
            that.setData({
              orderList: getUserOrderRes.data.data
            })
          } else {
            wx.showModal({
              title: '信息',
              content: getUserOrderRes.data.message,
            })
          }
        } else {
          wx.showModal({
            title: '信息',
            content: getUserOrderRes.errMsg,
          })
        }
      }
    })
  },
})