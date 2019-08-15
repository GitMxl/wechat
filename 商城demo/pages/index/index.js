Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    sortList:[],
    active:[],
    recommendList:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5d4bc44b5f42bd23c810ac25/shopapp/index',
      success:res=>{
        if(res.data.code ===0){
          setTimeout(function () {
            wx.hideNavigationBarLoading();
            wx.hideLoading();
          }, 1000)
          let swiperList = res.data.data.swiperList, sortList = res.data.data.sortModle, active = res.data.data.active, recommendList = res.data.data.shop;
          that.setData({
            swiperList: swiperList,
            sortList: sortList,
            active: active,
            recommendList: recommendList
          })
        }
      }
    })
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
   * 生命周期函数--监听页面滚动事件
   */
  onPageScroll:function(e){
    console.log(e)
    
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
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5d4bc44b5f42bd23c810ac25/shopapp/index',
      success(res) {
        if (res.data.code === 0) {
          setTimeout(function () {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh()
            wx.hideLoading();
          }, 1000)
          let swiperList = res.data.data.swiperList, sortList = res.data.data.sortModle, active = res.data.data.active, recommendList = res.data.data.shop;
          that.setData({
            swiperList: swiperList,
            sortList: sortList,
            active: active,
            recommendList: recommendList
          })
        }
      }
    })
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