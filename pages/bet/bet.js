// pages/bet/bet.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isCheck: false,
    options: null,
    isShared: true,
    isPrintShare: false,
    owner: null,
    orderCode: null,
    lotteryImg: null,
    lotteryCode: null,
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      options: options,
    })
    wx.cloud.init()
    if (!!options.params) {
      // 如果携带参数，直接展示
      let params = JSON.parse(decodeURIComponent(options.params))
      console.log("share params: " + JSON.stringify(params))
      // 要用缓存中的openid，因为用户通过分享打开的话，不走onLaunch
      let curOpenid = wx.getStorageSync('curOpenid')
      // 如果携带参数，并且已经上传了彩票的话，就只有当前用户可以看了，其他用户返回首页
      if (!!params.orderCode && curOpenid != params.owner) {
        wx.navigateTo({
          url: '/pages/experience/experience'
        })
      }
      this.setData({
        currentBetId: params.currentBetId,
        currentBet: params.currentBet,
        choseRedBalls: params.choseRedBalls,
        choseBlueBalls: params.choseBlueBalls,
        chosethreeDFirst: params.chosethreeDFirst,
        chosethreeDSecond: params.chosethreeDSecond,
        chosethreeDThird: params.chosethreeDThird,
        isShared: true,
        isPrintShare: params.isPrintShare,
        orderCode: params.orderCode,
      })
      // orderCode不为空，说明是要打印的，尝试获取lotteryImg
      if (!!this.data.orderCode) {
        console.log("before download fileId = " + 'cloud://' + app.globalData.cloudEnvId + '.' + app.globalData.cloudStorageId + '/' + this.data.orderCode)
        wx.cloud.downloadFile({
          fileID: 'cloud://' + app.globalData.cloudEnvId + '.' + app.globalData.cloudStorageId + '/' + this.data.orderCode, // 文件 ID
          success: res => {
            // 返回临时文件路径
            console.log(res.tempFilePath)
            this.setData({
              lotteryImg: res.tempFilePath
            })
            console.log("lotteryImg value set: " + this.data.lotteryImg)
          },
          fail: console.error
        })
      }
    } else {
      this.setData({
        currentBetId: options.currentBetId,
        isShared: false
      })
      this.init()
      this.getRandom()
    }
    wx.hideLoading({
      success: (res) => {},
    })
  },

  /**
   * 获取玩法配置
   */
  init: function () {
    let that = this;
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
      case "4":
        that.setData({
          currentBet: {
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
          }
        })
        break;
      default:
        break;
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
  onShareAppMessage: function (options) {
    console.log('分享')
    let title = '看看怎么样？'
    let owner = null
    if (options.target.dataset.info == '1') {
      // 打印，要生成orderCode
      let orderCode = app.getUuid()
      this.setData({
        orderCode: orderCode
      })
      title = '帮我打印'
      owner = app.globalData.userInfo.openid
    }
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

  getRandom: function () {
    let that = this
    switch (that.data.currentBetId) {
      case "1":
        // 双色球
        let shuangRed = that.getRandomBalls(that.data.currentBet.redBallNum, 1, that.data.currentBet.redBallRange)
        let shuangBlue = that.getRandomBalls(that.data.currentBet.blueBallNum, 1, that.data.currentBet.blueBallRange)
        that.setData({
          choseRedBalls: shuangRed,
          choseBlueBalls: shuangBlue
        })
        break;
      case "2":
        let qiRed = that.getRandomBalls(that.data.currentBet.redBallNum, 1, that.data.currentBet.redBallRange)
        that.setData({
          choseRedBalls: qiRed
        })
        break;
      case "3":
        let san1 = that.getRandomBalls(1, 0, 9)
        let san2 = that.getRandomBalls(1, 0, 9)
        let san3 = that.getRandomBalls(1, 0, 9)
        that.setData({
          chosethreeDFirst: san1,
          chosethreeDSecond: san2,
          chosethreeDThird: san3
        })
        break;
      case "4":
        // 大乐透
        let daletouRed = that.getRandomBalls(that.data.currentBet.redBallNum, 1, that.data.currentBet.redBallRange)
        let daletouBlue = that.getRandomBalls(that.data.currentBet.blueBallNum, 1, that.data.currentBet.blueBallRange)
        that.setData({
          choseRedBalls: daletouRed,
          choseBlueBalls: daletouBlue
        })
        break;
    }
  },

  /**
   * 
   * @param {一共多少个数字}} num 
   * @param {最小值} min 
   * @param {最大值} max 
   */
  getRandomBalls: function (num, min, max) {
    let balls = []
    for (let i = 0; i < num;) {
      let curBall = Math.floor(Math.random() * (max - min + 1)) + min;
      if (balls.indexOf(curBall) === -1) {
        // 随机出的数字不存在，才能加入数组
        balls.push(curBall)
        i++
      }
    }
    balls.sort(function (a, b) {
      return a - b
    });
    return balls;
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

  upload: function () {
    let that = this
    console.log("upload click")
    wx.chooseMedia({
      camera: 'back',
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("chooseMedia res:" + JSON.stringify(res))
        if (!!res && !!res.tempFiles && !!res.tempFiles[0] && !!res.tempFiles[0].tempFilePath) {
          wx.cloud.uploadFile({
            cloudPath: that.data.orderCode,
            filePath: res.tempFiles[0].tempFilePath,
            success: uploadRes => {
              wx.showLoading({
                title: '上传中',
              })
              console.log("uploadFile res: " + JSON.stringify(uploadRes))
              if (!!uploadRes.fileID) {
                // 弹窗成功
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 1000
                })
                that.onLoad(that.data.options)
              } else {
                // 失败
                wx.showToast({
                  title: '上传失败',
                  icon: 'success',
                  duration: 1000
                })
              }
            },
            fail: console.error
          })
        }
      }
    })
  }

})