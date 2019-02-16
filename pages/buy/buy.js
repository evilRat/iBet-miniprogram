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
    betSites: [{
        "id": "1",
        "name": "翠福园投注站",
        "betTypes": [1,2,3]
      }],
    betConfig: [{
      "name": "双色球",
      "picName": "shuangseqiu",
    }, {
      "name": "七乐彩",
      "picName": "qilecai",
    }, {
      "name": "3D",
      "picName": "3D"
    }]
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
    var that=this
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
                url: 'http://localhost:8765/iBet/wechat/login',
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
                        url: 'http://localhost:8765/iBet/wechat/betSites',
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
    var betSiteIndex = Number(this.data.betSiteIndex) + 1;
    wx.navigateTo({
      url: '/pages/bet/bet?betTypeId=' + betTypeId + "&betSiteId=" + betSiteIndex
    })
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