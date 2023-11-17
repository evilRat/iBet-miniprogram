// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCheck: false,
    endTime: null,
    seconds: 0,
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
      },
      {
        "id": 4,
        "betName": "大乐透",
        "redBallNum": 5,
        "blueBallNum": 2,
        "redBallRange": 35,
        "blueBallRange": 12,
        "icon": "daletou",
        "createTime": "2022-05-01T12:12:21+08:00",
        "updateTime": "2022-05-01T12:12:21+08:00",
        "createUser": "1",
        "createUserName": "孔征",
        "updateUser": "1",
        "updateUserName": "孔征"
      },
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
    let newTime = new Date().getTime()
    if (newTime > app.globalData.endTime) {
      this.setData({
        isCheck: true
      })
    } else {
      // 倒计时
      let date = new Date(app.globalData.endTime);
      this.setData({
        endTime: date.getFullYear()+
        "/"+(date.getMonth()+1)+
        "/"+date.getDate()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds(),
      })
      console.log(this.data.endTime)
      setInterval(() => {
        let leftTime = app.globalData.endTime - new Date()
        let day = Math.floor(leftTime/1000/60/60/24)
        let hour = Math.floor(leftTime/1000/60/60%24)
        let minute = Math.floor(leftTime/1000/60%60)
        let second = Math.floor(leftTime/1000%60)
        let time = day + "天" + hour + "时" + minute + "分" + second + "秒";
        this.setData({
          seconds: time
        })
      }, 1000)
    }
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