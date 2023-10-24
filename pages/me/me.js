// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCheck: false,
    avatarUrl: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
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
    let newTime = new Date().getTime()
    if (newTime > 1698228378000) {
      this.setData({
        isCheck: true
      })
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
    console.log('分享')
    let title = '看看怎么样？'
    let owner = null
    let params = {
      currentBetId: this.data.currentBetId,
      currentBet: this.data.currentBet,
      choseRedBalls: this.data.choseRedBalls,
      choseBlueBalls: this.data.choseBlueBalls,
      chosethreeDFirst: this.data.chosethreeDFirst,
      chosethreeDSecond: this.data.chosethreeDSecond,
      chosethreeDThird: this.data.chosethreeDThird,
      owner: owner,
      orderCode: this.data.orderCode,
      isPrintShare: options.target.dataset.info == '1'
    }
    console.log("share params: " + JSON.stringify(params))
    return {
      title: title,
      path: 'pages/bet/bet?params=' + encodeURIComponent(JSON.stringify(params))
    }

  },
  help: function() {
    wx.navigateTo({
      url: '/pages/help/help'
    })
  },
  handleUrl(t) {
    var e = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    return e.test(t)
  },
  toShareHtml: function () {
    wx.cloud.init()
    wx.getClipboardData({
      success: (option) => {
        let result = this.handleUrl(option.data);
        if (!result) {
          return;
        } else {
          wx.cloud.callFunction({
            name: 'getHtmlFromUrl',
            data: {
              url: option.data
            },
            success: function(res) {
              console.log("getHtmlFormUrl cloud function res: " + JSON.stringify(res))
              wx.navigateTo({
                url: '/pages/generatedHtml/generatedHtml?html=' + encodeURIComponent(res.result)
              })
            }
          })
        }
      },
    })
  }
})