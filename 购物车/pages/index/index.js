//index.js
//获取应用实例

Page({
  data: {
    swiperList:[],
    productList:[]
  },
  getSwiperList:function(){
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5d3a8ac4c19e0b1b0fc5e20d/swiperList',
      success(res){
        if(res.data.code === 0){
          that.setData({
            swiperList: res.data.data.swiperList
          })
        }
      }
    })
    
  },
  getProductList:function(){
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5d3a8ac4c19e0b1b0fc5e20d/shop',
      success(res){
        setTimeout(function () {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        }, 1000)
        if(res.data.code === 0){
          that.setData({
            productList:res.data.product
          })
        }
      }
    })
  },
  shopDetail:function(e){
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    this.getSwiperList();
    this.getProductList();
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
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      wx.stopPullDownRefresh()
    }, 2500)
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    console.log(e)
  }
})
