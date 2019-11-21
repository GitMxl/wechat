// pages/showPop/showpop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  pop(){
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  shorage(){
    wx.clearStorage();
    wx.setStorage({
      key: 'A',
      data: 'b',
    });
    wx.getStorageSync({
      key: 'A',
      success(res) {
        console.log(res.data,":getStorage")
      }
    });
    wx.getStorageInfo({
      success(res) {
        console.log(res.keys,":getStorageInfo");
        console.log(res.currentSize, ":getStorageInfo");
        console.log(res.limitSize, ":getStorageInfo");
      }
    });
    //清除所有数据
    // wx.clearStorage()
  },
  // 跳转tabbar页面中
  index(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 跳转至应用内页面
  file(){
    wx.reLaunch({
      url: '../file/file',
    });
  },
  // 跳转至应用内页面,不可跳转至tabbar页面
  tabbar(){
    wx.redirectTo({
      url: '../tabbar/tabbar',
    })
  },
  // 打开应用内某个页面
  tab(){
    wx.switchTab({
      url: '../tab/tab',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  }
})