// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bets: [{
        "id": 1,
        "betName": "双色球",
        "redBallNum": 6,
        "blueBallNum": 1,
        "redBallRange": 33,
        "blueBallRange": 16,
        "icon": "shuangseqiu",
        "createTime": "2022-05-01T12:12:21+08:00",
        "updateTime": "2022-05-01T12:12:21+08:00",
        "createUser": "1",
        "createUserName": "孔征",
        "updateUser": "1",
        "updateUserName": "孔征"
      },
      {
        "id": 2,
        "betName": "七乐彩",
        "redBallNum": 7,
        "blueBallNum": 0,
        "redBallRange": 30,
        "blueBallRange": 0,
        "icon": "qilecai",
        "createTime": "2022-05-01T12:12:21+08:00",
        "updateTime": "2022-05-01T12:12:21+08:00",
        "createUser": "1",
        "createUserName": "孔征",
        "updateUser": "1",
        "updateUserName": "孔征"
      },
      {
        "id": 3,
        "betName": "3D",
        "redBallNum": 3,
        "blueBallNum": 0,
        "redBallRange": 0,
        "blueBallRange": 0,
        "icon": "3D",
        "createTime": "2022-05-01T12:12:21+08:00",
        "updateTime": "2022-05-01T12:12:21+08:00",
        "createUser": "1",
        "createUserName": "孔征",
        "updateUser": "1",
        "updateUserName": "孔征"
      }
    ],
  },

  clickBetTypeBtn: function (e) {
    console.log("experience-clickBetTypeBtn: " + JSON.stringify(e))
    let currentBet = e.currentTarget.dataset.currentBet;
    wx.navigateTo({
      url: '/pages/bet/bet?currentBetId=' + currentBet.id
    })
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

})