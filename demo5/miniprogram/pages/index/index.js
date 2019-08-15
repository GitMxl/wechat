// miniprogram/pages/index/index.js
const db = wx.cloud.database();
const genID = require('../../style/randomNum.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    apid: 'wx4f13f7768b435707',
    secret: '54bd2dff122b91f2e0c283e54344c11f'
  },
  bindUserInfo(e) {
    let apid = this.data.apid,
      secret = this.data.secret;
    let openId;
    let genId = genID.genID(8)
    console.log(genId)
    wx.login({
      success(res) {
        // if(res.code){
        //   wx.request({
        //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + apid + '&secret=' + secret+'&js_code='+res.code+'&grant_type=authorization_code',
        //     success(res){
        //       console.log(res)
        //     }
        //   })
        // }
        wx.getUserInfo({
          success(res) {
            console.log(res)
            let nickName = res.userInfo.nickName,
              avatarUrl = res.userInfo.avatarUrl
            wx.cloud.callFunction({
              name: 'login',
              complete: res => {
                console.log(res)
                const _ = db.command
                db.collection('user').doc(genId).set({
                  data: {
                    nickName: nickName,
                    avatarUrl: avatarUrl,
                    due: new Date(),
                  },
                  success: function(res) {

                  }
                })
              }
            })

          }
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {



  },

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

  }
})