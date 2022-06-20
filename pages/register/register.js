// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realName: null,
    phoneNo: null,
    idCardNo: null,
    verificationCode: null,
    isAgree: null,
    canSubmit: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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
  /**
   * 尝试体验版
   * @param {} e 
   */
  tryExperienceVersion: function() {
    wx.redirectTo({
      url: '../experience/experience',
    })
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
    console.log("isAgree=" + this.data.isAgree)
  },
  bindRealNameChange: function(e) {
    this.setData({
      realName: e.detail.value
    });
    console.log("realName=" + this.data.realName)
  },
  bindPhoneNoChange: function(e) {
    this.setData({
      phoneNo: e.detail.value
    });
    console.log("phoneNo=" + this.data.phoneNo)
  },
  bindIdCardNoChange: function(e) {
    this.setData({
      idCardNo: e.detail.value
    });
    console.log("idCardNo=" + this.data.idCardNo)
  },
  bindVerificationCodeChange: function(e) {
    this.setData({
      verificationCode: e.detail.value
    });
    console.log("verificationCode=" + this.data.verificationCode)
  },
  registerSubmit: function(e) {
    console.log("realName=" + this.data.realName)
    if (null == this.data.realName || "" == this.data.realName) {
      wx.showModal({
        title: '请填写真实姓名',
        content: '为了您能正常使用本程序,请填写完整您的个人信息',
        showCancel: false
      })
    } else if (null == this.data.phoneNo || "" == this.data.phoneNo) {
      wx.showModal({
        title: '请填写手机号码',
        content: '为了您能正常使用本程序,请填写完整您的个人信息',
        showCancel: false
      })
    } else if (!this.isPoneAvailable(this.data.phoneNo)) {
      wx.showModal({
        title: '输入有误！',
        content: '请输入正确的手机号码',
        showCancel: false
      })
    } else if (null == this.data.idCardNo || "" == this.data.idCardNo) {
      wx.showModal({
        title: '请填写身份证号码',
        content: '为了您能正常使用本程序,请填写完整您的个人信息',
        showCancel: false
      })
    } else if (!this.checkIdCardNo(this.data.idCardNo)) {
      wx.showModal({
        title: '输入有误！',
        content: '请输入正确的身份证号码',
        showCancel: false
      })
    } else if (null == this.data.isAgree || "" == this.data.isAgree) {
      wx.showModal({
        title: '警告!',
        content: '您没有同意我们的相关条款',
        showCancel: false
      })
    } else {
      wx.request({
        url: app.serverUrl + '/wechat/register',
        data: {
          userId: app.globalData.userId,
          userName: this.data.realName,
          phoneNo: this.data.phoneNo,
          idCardNo: this.data.idCardNo
        },
        success(registerRes) {
          console.log(registerRes)
          switch (registerRes.data.rtnCode) {
            case "999":
              wx.showModal({
                title: '注册失败',
                content: '接口调用异常：' + registerRes.data.rtnCode,
                showCancel: false
              })
              break;
            case "0":
              wx.switchTab({
                url: "../buy/buy"
              })
              break;
            case "1":
              wx.showModal({
                title: '注册失败',
                content: '注册失败：' + registerRes.data.rtnCode,
                showCancel: false
              })
              break;
            default:
              wx.showModal({
                title: '注册失败',
                content: '系统故障：' + registerRes.data.rtnCode,
                showCancel: false
              })
          }
        }
      })
    }
  },
  getVerificationCode: function() {
    this.setData({
      canSubmit: false
    })
  },
  isPoneAvailable: function(phoneNo) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phoneNo)) {
      return false;
    } else {
      return true;
    }
  },
  checkIdCardNo: function(id) {
    this.isOK = false;
    this.error = '';

    if (!id || typeof(id) != 'string' || id.length != 18 ||
      !id.match(/^[0-9]{17}[0-9xX]$/) || "111111111111111" == id) {
      this.error = '输入不是18位有效字符串';
      return false;
    }

    var area = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };

    this.areaName = area[id.substr(0, 2)];
    if (!this.areaName) {
      this.error = '前2位不是有效的行政区划代码';
      return false;
    };


    this.year = parseInt(id.substr(6, 4));
    this.month = parseInt(id.substr(10, 2));
    this.day = parseInt(id.substr(12, 2));

    this.error = '出生日期不正确';
    if (this.month > 12) {
      return false;
    }
    if (this.day > 31) {
      return false;
    }
    // February can't be greater than 29 (leap year calculation comes later)
    if ((this.month == 2) && (this.day > 29)) {
      return false;
    }
    // check for months with only 30 days
    if ((this.month == 4) || (this.month == 6) || (this.month == 9) ||
      (this.month == 11)) {
      if (this.day > 30) {
        return false;
      }
    }
    // if 2-digit year, use 50 as a pivot date
    if (this.year < 100) {
      this.year += 1900;
    }
    if (this.year > 9999) {
      return false;
    }
    // check for leap year if the month and day is Feb 29
    if ((this.month == 2) && (this.day == 29)) {
      var div4 = this.year % 4;
      var div100 = this.year % 100;
      var div400 = this.year % 400;
      // if not divisible by 4, then not a leap year so Feb 29 is invalid
      if (div4 != 0) {
        return false;
      }
      // at this point, year is divisible by 4. So if year is divisible by
      // 100 and not 400, then it's not a leap year so Feb 29 is invalid
      if ((div100 == 0) && (div400 != 0)) {
        return false;
      }
    }
    this.yearStr = '' + this.year;
    this.monthStr = (this.month < 10 ? '0' : '') + this.month;
    this.dayStr = (this.day < 10 ? '0' : '') + this.day;

    // date is valid
    var birthDay = new Date(this.year, this.month - 1, this.day);

    if (birthDay - new Date() >= 0 || birthDay - new Date(1850, 1, 1) <= 0) {
      return false;
    }

    this.error = '';
    this.isOK = true;
    return true;
  }
})