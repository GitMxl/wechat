// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usermess:{},
    showUserButton:true
  },
  bindUserInfo(e){
    let that = this;
    wx.login({
      success(res) {
        console.log(res)
        wx.getUserInfo({
          success(res){
            console.log(res)
            let info = {
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl
            }
            that.setData({
              usermess: info,
              showUserButton:false
            })
            wx.setStorageSync('login', info)
          }
        })
      }
    })
  },
  selectImg(e){
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success(res) {
        console.log(res)
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showTabBarRedDot({
      index:2,
      success(res){
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let info = wx.getStorageSync('login')||'';
    if(typeof(info)==='object'){
      this.setData({
        usermess: info,
        showUserButton: false
      })
    }else{
      this.setData({
        showUserButton: true
      })
    }
  },
  exitButton(e){
    this.setData({
      usermess:{},
      showUserButton:true
    })
    wx.removeStorageSync('login')
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
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

  }
})