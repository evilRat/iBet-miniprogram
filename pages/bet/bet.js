// pages/bet/bet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    betTypeId: 0,
    betLoopMax: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],
    betConfig: {
      "redNum": "33",
      "blueNum": "16"
    },
    choseBalls: [],
    choseBallIndex: 0,
    tapCurrentIndex: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      betTypeId: options.betTypeId
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
   * 用户点击选号
   */
  tapBall: function(e) {
    var ballnum = e.currentTarget.dataset.ballnum;
    if (this.data.choseBalls.indexOf(ballnum) == -1) {
      this.data.choseBalls[this.data.choseBallIndex++] = ballnum;
      this.data.tapCurrentIndex = ballnum - 1;
      console.info("chose : " + ballnum);
      console.info("choseBalls : " + this.data.choseBalls);
    } else {
      this.data.choseBalls.splice(this.data.choseBalls.indexOf(ballnum),1);
      this.data.choseBallIndex--;
      console.info("unchose : " + ballnum);
      console.info("choseBalls : " + this.data.choseBalls);
    }
    
  }

})