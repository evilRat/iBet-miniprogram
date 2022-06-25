// pages/bet/bet.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShared: true,
    noServer: null,
    currentBetId: null,
    currentBet: null,
    canOrder: true,
    betLoopMax: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
    threeBalls: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    choseRedBalls: [],
    choseRedBallIndex: 0,
    choseBlueBalls: [],
    choseBlueBallIndex: 0,
    tapCurrentIndex: [],
    chosethreeDFirst: [],
    chosethreeDSecond: [],
    chosethreeDThird: [],
    chosethreeDFirstIndex: 0,
    chosethreeDSecondIndex: 0,
    chosethreeDThirdIndex: 0,
    times: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!!options.params) {
      // 如果携带参数，直接展示
      let params = JSON.parse(decodeURIComponent(options.params))
      this.setData({
        currentBetId: params.currentBetId,
        currentBet: params.currentBet,
        choseRedBalls: params.choseRedBalls,
        choseBlueBalls: params.choseBlueBalls,
        chosethreeDFirst: params.chosethreeDFirst,
        chosethreeDSecond: params.chosethreeDSecond,
        chosethreeDThird: params.chosethreeDThird,
        noServer: app.noServer,
        isShared: true
      })
    } else {
      this.setData({
        currentBetId: options.currentBetId,
        noServer: app.noServer,
        isShared: false
      })
      this.getBetInfo()
    }
  },

  /**
   * 获取玩法配置
   */
  getBetInfo: function () {
    let that = this;
    if (app.noServer) {
      switch (that.data.currentBetId) {
        case "1":
          that.setData({
            currentBet: {
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
            }
          })
          break
        case "2":
          that.setData({
            currentBet: {
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
            }
          })
          break;
        case "3":
          that.setData({
            currentBet: {
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
          })
          break;
        default:
          break;
      }
    } else {
      wx.request({
        url: app.serverUrl + '/wechat/bet/' + that.data.currentBetId,
        data: null,
        success(betRes) {
          if (!!betRes.data) {
            if (!!betRes.data.data) {
              that.setData({
                currentBet: betRes.data.data
              })
            } else {
              wx.showModal({
                title: '抱歉！',
                content: '系统问题:' + betRes.data.message,
              })
            }
          } else {
            wx.showModal({
              title: '抱歉！',
              content: '系统问题:' + betRes.errMsg,
            })
          }
        }
      })
    }
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
    let params = {
      currentBetId: this.data.currentBetId,
      currentBet: this.data.currentBet,
      choseRedBalls: this.data.choseRedBalls,
      choseBlueBalls: this.data.choseBlueBalls,
      chosethreeDFirst: this.data.chosethreeDFirst,
      chosethreeDSecond: this.data.chosethreeDSecond,
      chosethreeDThird: this.data.chosethreeDThird,
    }
    return {
      title: "分享",
      path: 'pages/bet/bet?params=' + encodeURIComponent(JSON.stringify(params))
    }
  },

  /**
   * 用户点击选号
   */
  tapRedBall: function (e) {
    var ballnum = e.currentTarget.dataset.ballnum;
    if (this.data.choseRedBalls.indexOf(ballnum) == -1) {
      this.data.choseRedBalls[this.data.choseRedBallIndex++] = ballnum;
      this.data.tapCurrentIndex = ballnum - 1;
      this.setData({
        choseRedBalls: this.data.choseRedBalls
      })
      console.info("choseRed : " + ballnum);
      console.info("choseRedBalls : " + this.data.choseRedBalls);
    } else {
      this.data.choseRedBalls.splice(this.data.choseRedBalls.indexOf(ballnum), 1);
      this.data.choseRedBallIndex--;
      this.setData({
        choseRedBalls: this.data.choseRedBalls
      })
      console.info("unchoseRed : " + ballnum);
      console.info("choseRedBalls : " + this.data.choseRedBalls);
    }

  },

  tapBlueBall: function (e) {
    var ballnum = e.currentTarget.dataset.ballnum;
    if (this.data.choseBlueBalls.indexOf(ballnum) == -1) {
      this.data.choseBlueBalls[this.data.choseBlueBallIndex++] = ballnum;
      this.data.tapCurrentIndex = ballnum - 1;
      this.setData({
        choseBlueBalls: this.data.choseBlueBalls
      })
      console.info("choseBlue : " + ballnum);
      console.info("choseBlueBalls : " + this.data.choseBlueBalls);
    } else {
      this.data.choseBlueBalls.splice(this.data.choseBlueBalls.indexOf(ballnum), 1);
      this.data.choseBlueBallIndex--;
      this.setData({
        choseBlueBalls: this.data.choseBlueBalls
      })
      console.info("unchoseBlue : " + ballnum);
      console.info("choseBlueBalls : " + this.data.choseBlueBalls);
    }

  },
  tap3DBall: function (e) {
    var ballnum = e.currentTarget.dataset.ballnum;
    var digit = e.currentTarget.dataset.digit;

    switch (digit) {
      case 0:
        if (this.data.chosethreeDFirst.indexOf(Number(ballnum)) == -1) {
          this.data.chosethreeDFirst[this.data.chosethreeDFirstIndex++] = Number(ballnum);
          this.data.tapCurrentIndex = ballnum - 1;
          this.setData({
            chosethreeDFirst: this.data.chosethreeDFirst
          })
          console.info("chosethreeDFirst : " + ballnum);
          console.info("chosethreeDFirstBalls : " + this.data.chosethreeDFirst);
        } else {
          this.data.chosethreeDFirst.splice(this.data.chosethreeDFirst.indexOf(Number(ballnum)), 1);
          this.data.chosethreeDFirstIndex--;
          this.setData({
            chosethreeDFirst: this.data.chosethreeDFirst
          })
          console.info("unchosethreeDFirst : " + ballnum);
          console.info("chosethreeDFirstBalls : " + this.data.chosethreeDFirst);
        }
        break;
      case 1:
        if (this.data.chosethreeDSecond.indexOf(Number(ballnum)) == -1) {
          this.data.chosethreeDSecond[this.data.chosethreeDSecondIndex++] = Number(ballnum);
          this.data.tapCurrentIndex = ballnum - 1;
          this.setData({
            chosethreeDSecond: this.data.chosethreeDSecond
          })
          console.info("chosethreeDSecond : " + ballnum);
          console.info("chosethreeDSecondBalls : " + this.data.chosethreeDSecond);
        } else {
          this.data.chosethreeDSecond.splice(this.data.chosethreeDSecond.indexOf(Number(ballnum)), 1);
          this.data.chosethreeDSecondIndex--;
          this.setData({
            chosethreeDSecond: this.data.chosethreeDSecond
          })
          console.info("unchosethreeDSecond : " + ballnum);
          console.info("chosethreeDSecondBalls : " + this.data.chosethreeDSecond);
        }
        break;
      case 2:
        if (this.data.chosethreeDThird.indexOf(Number(ballnum)) == -1) {
          this.data.chosethreeDThird[this.data.chosethreeDThirdIndex++] = Number(ballnum);
          this.data.tapCurrentIndex = ballnum - 1;
          this.setData({
            chosethreeDThird: this.data.chosethreeDThird
          })
          console.info("chosethreeDThird : " + ballnum);
          console.info("chosethreeDThirdBalls : " + this.data.chosethreeDThird);
        } else {
          this.data.chosethreeDThird.splice(this.data.chosethreeDThird.indexOf(Number(ballnum)), 1);
          this.data.chosethreeDThirdIndex--;
          this.setData({
            chosethreeDThird: this.data.chosethreeDThird
          })
          console.info("unchosethreeDThird : " + ballnum);
          console.info("chosethreeDThirdBalls : " + this.data.chosethreeDThird);
        }
        break;
    }
  },

  orderSubmit: function (e) {
    switch (this.data.currentBetId) {
      case "1": //双色球
        if ((this.data.choseRedBalls).length != 6 || this.data.choseBlueBalls.length != 1) {
          wx.showModal({
            title: '提示',
            content: '一注双色球由6个红球和1个蓝球组成',
          })
        } else {
          wx.request({
            url: app.serverUrl + '/order/newOrder',
            data: {
              userId: app.globalData.userId,
              betSiteId: app.globalData.currentSite.id,
              betId: this.data.currentBet,
              redBalls: this.data.choseRedBalls,
              blueBalls: this.data.choseBlueBalls,
              times: this.data.times
            },
            success(orderRes) {
              console.log(orderRes);
              switch (orderRes.data.rtnCode) {
                case "999":
                  wx.showModal({
                    title: '抱歉！',
                    content: '系统问题' + orderRes.data.rtnMessage,
                  })
                  break;
                case "0":
                  wx.switchTab({
                    url: '../buyed/buyed',
                  })
                  break;
                case "1":
                  wx.showModal({
                    title: '抱歉！',
                    content: '系统问题' + orderRes.data.rtnMessage,
                  })
                  break;
              }
            },
            fail(err) {

            }
          })
        }
        break;
      case "2": //七乐彩
        if ((this.data.choseRedBalls).length != 7 || (this.data.choseBlueBalls).length != 0) {
          wx.showModal({
            title: '提示',
            content: '一注七乐彩由7个红球',
          })
        } else {
          wx.request({
            url: app.serverUrl + '/order/newOrder',
            data: {
              userId: app.globalData.userId,
              betSiteId: app.globalData.currentSite.id,
              betId: this.data.currentBet,
              redBalls: this.data.choseRedBalls,
              blueBalls: this.data.choseBlueBalls,
              times: this.data.times
            },
            success(orderRes) {
              console.log(orderRes);
              switch (orderRes.data.rtnCode) {
                case "999":
                  wx.showModal({
                    title: '抱歉！',
                    content: '系统问题' + orderRes.data.rtnMessage,
                  })
                  break;
                case "0":
                  wx.switchTab({
                    url: '../buyed/buyed',
                  })
                  break;
                case "1":
                  wx.showModal({
                    title: '抱歉！',
                    content: '系统问题' + orderRes.data.rtnMessage,
                  })
                  break;
              }
            },
            fail(err) {

            }
          })
        }
        break;
      case "3": //3D
        if ((this.data.chosethreeDFirst).length != 1 || (this.data.chosethreeDSecond).length != 1 || (this.data.chosethreeDThird).length != 1) {
          wx.showModal({
            title: '提示',
            content: '一注3D由三位0～9的数字组成',
          })
        } else {
          var threeDBalls = new Array(this.data.chosethreeDFirst, this.data.chosethreeDSecond, this.data.chosethreeDThird);
          console.log(threeDBalls)
          wx.request({
            url: app.serverUrl + '/order/newOrder',
            data: {
              userId: app.globalData.userId,
              betSiteId: app.globalData.currentSite.id,
              betId: this.data.currentBet,
              redBalls: threeDBalls,
              blueBalls: this.data.choseBlueBalls,
              times: this.data.times
            },
            success(orderRes) {
              console.log(threeDBalls)
              console.log(orderRes);
              switch (orderRes.data.rtnCode) {
                case "999":
                  wx.showModal({
                    title: '抱歉！',
                    content: '系统问题' + orderRes.data.rtnMessage,
                  })
                  break;
                case "0":
                  wx.switchTab({
                    url: '../buyed/buyed',
                  })
                  break;
                case "1":
                  wx.showModal({
                    title: '抱歉！',
                    content: '系统问题' + orderRes.data.rtnMessage,
                  })
                  break;
              }
            },
            fail(err) {

            }
          })
        }
        break;
    }
  }

})