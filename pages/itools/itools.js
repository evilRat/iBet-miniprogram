// pages/itools/itools.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.toItools()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.toItools()
  },
  toItools() {
    wx.navigateToMiniProgram({
      appId: 'wxaa5dfcb172d83a99',
      path: '',
      envVersion: "release",
      success(res) {
        // 打开成功
        console.log("跳转小程序成功")
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})