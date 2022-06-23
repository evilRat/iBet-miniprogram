//app.js
import config from 'config.js';
import { noServer } from './config';
App({
  onLaunch: function() {
    var that = this;
    // 判断是否为无服务器，第一版先上线，没有server
    if(config.noServer) {
      wx.reLaunch({
        url: '/pages/experience/experience'
      })
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("app.js onLanch")

    wx.getSetting({
      success: function(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          console.log("before getSetting isNotAuthorized=" + that.globalData.isNotAuthorized)
          that.globalData.isNotAuthorized = false;
          console.log("getSetting isNotAuthorized=" + that.globalData.isNotAuthorized)
          if (that.getSettingCallback != null) {
            that.getSettingCallback(that.globalData.isNotAuthorized)
          }
        } else {
          console.log('scope.userInfo_fuck')
          that.globalData.isNotAuthorized = true;
          console.log('scope.userInfo_fucked')
          if (that.getSettingCallback) {
            console.log('scope.userInfo_else_callback')
            that.getSettingCallback(that.globalData.isNotAuthorized)
          }
        }
        
      }
    })
  },
  PrefixInteger: function(num, n) {
    return(Array(n).join(0) + num).slice(-n);
  },

  globalData: {
    userInfo: null,
    isNotAuthorized: null,
    userId: null,
    currentSite: null
  },
  serverUrl: config.serverUrl,
  noServer: config.noServer
})