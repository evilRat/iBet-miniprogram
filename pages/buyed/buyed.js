// pages/buyed/buyed.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [{
      "buyedId": "1000000001",
      "buyedType": "七乐彩",
      "buyedBetSite": "翠福园投注站",
      "buyedNums": "1,12,15,19,20,31-06"
    }, {
      "buyedId": "1000000001",
      "buyedType": "双色球",
      "buyedBetSite": "草房投注站",
      "buyedNums": "1,12,15,19,20,31-06"
    }, {
      "buyedId": "1000000001",
      "buyedType": "3D",
      "buyedBetSite": "常营投注站",
      "buyedNums": "1,12,15,19,20,31-06"
    }],
    betConfig: [{
      "name": "双色球",
      "picName": "shuangseqiu",
      "redNum": "33",
      "blueNum": "16"
    }, {
      "name": "七乐彩",
      "picName": "qilecai",
      "redNum": "30",
      "blueNum": "0"
    }, {
      "name": "3D",
      "picName": "3D",
      "redNum": "0",
      "blueNum": "0"
    }],
    userBetSites: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userBetSites: app.globalData.userBetSites
    })
    

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
    var that = this;
    //获取用户订单
    wx.request({
      url: 'http://localhost:8765/iBet/order/userOrder',
      data: {
        userId: app.globalData.userId,

      },
      success(getUserOrderRes) {
        console.log(getUserOrderRes)
        if (getUserOrderRes.data.rtnCode == 0) {
          that.setData({
            orderList: getUserOrderRes.data.userOrderList
          })
        } else {
          wx.showModal({
            title: '信息',
            content: getUserOrderRes.data.rtnMessage,
          })
        }
      }
    })
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

  }
})