// pages/buy/buy.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isNotAuthorized: null,
    betSiteIndex: 0,
    betIndex: 0,
    betSites: [],
    bets: [],
    userSite: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("app.globalData.isNot=" + app.globalData.isNotAuthorized)
    if (app.globalData.isNotAuthorized == null) {
      console.log("app.globalData.isNotAuthorized is null")
      app.getSettingCallback = isNotAuthorized => {
        console.log("app.getSettingCallback is defind")
        if (isNotAuthorized != null) {
          this.setData({
            isNotAuthorized: app.globalData.isNotAuthorized
          })
        }
      }
    }
    console.log("buy_onLoad before setData isNotAuthorized=" + this.data.isNotAuthorized)
    this.setData({
      isNotAuthorized: app.globalData.isNotAuthorized
    })
    console.log("buy_onLoad after setData isNotAuthorized=" + this.data.isNotAuthorized)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        //获取用户信息
        wx.getUserInfo({
          success(userRes) {
            console.log(userRes)
            app.globalData.userInfo = userRes.userInfo
            console.log("app.globalData.userInfo=" + app.globalData.userInfo)
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              wx.request({
                url: app.serverUrl + '/wechat/login',
                data: {
                  jsCode: res.code,
                  iv: userRes.iv,
                  encryptedData: userRes.encryptedData
                },
                success(loginRes) {
                  console.log(loginRes)
                  app.globalData.userId = loginRes.data.userId
                  console.log("login_app.globalData.userId=" + app.globalData.userId)
                  switch (loginRes.data.rtnCode) {
                    case '999':
                      wx.showToast({
                        title: loginRes.data.rtnMessage,
                        icon: 'none',
                        duration: 5000
                      })
                      break;
                    case '0':
                      wx.redirectTo({
                        url: '../register/register',
                      })
                      break;
                    case '1':
                      wx.request({
                        url: app.serverUrl + '/wechat/betSites',
                        data: {
                          userId: app.globalData.userId
                        },
                        success(betSitesRes) {
                          console.log("betSites_app.globalData.userId=" + app.globalData.userId)
                          if (!!betSitesRes.data.data) {
                            that.setData({
                              betSites: betSitesRes.data.data
                            })
                            app.globalData.userBetSites = betSitesRes.data.betSites
                            console.log(that.data.betSites)
                            // 获取玩法
                            that.getBetByTypes(that.data.betSites[that.data.betSiteIndex].betTypes)
                            // 获取用户在当前投注站的配置
                            that.getUserSiteBySiteId()
                          }
                        }
                      })
                      break;
                    default:
                      break;
                  }
                }
              })
              console.log("success")
            } else {
              console.log("fail" + res.errMsg)
            }
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    if (!app.globalData.userId) {
      return;
    }
    wx.request({
      url: app.serverUrl + '/wechat/betSites',
      data: {
        userId: app.globalData.userId
      },
      success(betSitesRes) {
        console.log("betSites_app.globalData.userId=" + app.globalData.userId)
        if (betSitesRes.data.betSites != null && betSitesRes.data.betSites != "") {
          that.setData({
            betSites: betSitesRes.data.betSites
          })
          app.globalData.userBetSites = betSitesRes.data.betSites
          console.log(that.data.betSites)
          // 获取玩法
          that.getBetByTypes(that.data.betSites[that.data.betSiteIndex].betTypes)
          // 获取用户在当前投注站的配置
          that.getUserSiteBySiteId()
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

  },
  bindBetSiteChange: function(e) {
    let that = this
    console.log('picker betSite 发生选择改变，携带值为', e.detail.value);
    that.setData({
      betSiteIndex: e.detail.value
    })
    // 获取玩法
    that.getBetByTypes(that.data.betSites[that.data.betSiteIndex].betTypes)
    // 获取用户在当前投注站的配置
    that.getUserSiteBySiteId()
  },

  /**
   * 根据betTypes获取玩法
   * @param {*} e 
   */
  getBetByTypes: function(types) {
    let that = this
    // 获取对应投注站的玩法的信息
    wx.request({
      url: app.serverUrl + '/wechat/bet',
      method: "GET",
      data: {
        ids: types
      },
      success(betRes) {
        if (!!betRes.data) {
          that.setData({
            bets: betRes.data.data
          })
          console.log('根据选择投注站获取了它的玩法:' + JSON.stringify(that.data.betSites))
        }
      }
    })
  },
  /**
   * 获取用户在当前投注站的信息
   * @param {*} e 
   */
  getUserSiteBySiteId: function() {
    let that = this
    // 获取对应投注站的玩法的信息
    wx.request({
      url: app.serverUrl + '/wechat/userSite',
      method: "GET",
      data: {
        userId: app.globalData.userId,
        siteId: that.data.betSites[that.data.betSiteIndex].id,
      },
      success(userSiteRes) {
        if (!!userSiteRes.data) {
          that.setData({
            userSite: userSiteRes.data.data
          })
          console.log('当前投注站的用户信息:' + JSON.stringify(that.data.userSite))
        }
      }
    })
  },

  clickBetTypeBtn: function(e) {
    console.log("betType-id: " + e.currentTarget.dataset.betTypeId)
    if (this.data.betSites[this.data.betSiteIndex].balance < 2) {
      wx.showModal({
        title: '提示',
        content: '您在此投注站的余额不足，请在此投注站充值，或选择余额大于2元的投注站进行投注',
      })
    } else {
      var betTypeId = e.currentTarget.dataset.betTypeId;
      var betSiteIndex = Number(this.data.betSiteIndex) + 1;
      wx.navigateTo({
        url: '/pages/bet/bet?betTypeId=' + betTypeId + "&betSiteId=" + betSiteIndex
      })
    }
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isNotAuthorized 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isNotAuthorized: false
      });
      app.globalData.userInfo = e.detail.userInfo
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isNotAuthorized 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})