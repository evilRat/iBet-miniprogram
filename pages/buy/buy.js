// pages/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    betSites: ["翠福园投注站", "常营投注站", "东坝投注站"],
    betSiteIndex: 0,
    betTypeList: [{
      "picName": "shuangseqiu",
      "name": "双色球",
      "id": 0
    }, {
      "picName": "qilecai",
      "name": "七乐彩",
      "id": 1
    }, {
      "picName": "3D",
      "name": "3D",
      "id": 2
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindBetSiteChange: function(e) {
    console.log('picker betSite 发生选择改变，携带值为', e.detail.value);

    this.setData({
      betSiteIndex: e.detail.value
    })
  },

  clickBetTypeBtn: function(e) {
    console.log("betType-id: " + e.currentTarget.dataset.betTypeId)
    var betTypeId = e.currentTarget.dataset.betTypeId;
    wx.navigateTo({
      url: '/pages/bet/bet?betTypeId=' + betTypeId
    })
  }
})