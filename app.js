//app.js
App({
  onLaunch: function() {
    let that = this
    console.log("App onLaunch")
    wx.cloud.init()
    // 调用云函数获取用户信息
    wx.cloud.callFunction({
      name: 'login',
      success: function(res) {
        console.log("login cloud function res: " + JSON.stringify(res))
        that.globalData.userInfo = res.result
        console.log("globalData setting values: : " + JSON.stringify(that.globalData))
        wx.setStorageSync("curOpenid", that.globalData.userInfo.openid)
      }
    })
  },
  getUuid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  globalData: {
    userInfo: null,
    cloudEnvId: 'test-3ge6sdgq51a3723d',
    cloudStorageId: '7465-test-3ge6sdgq51a3723d-1258271813',
    nickname: '',
    avatarUrl: '',
    endTime: 1700303441000,
  },
})