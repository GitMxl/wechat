// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    productNum:0,//商品详细or商品参数
    productDetail:[]//商品详情
  },
  // 获取当前商品详细数据
  getProductDetail: function (productId) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5d3a8ac4c19e0b1b0fc5e20d/productDetail?id='+productId,
      success(res){
        setTimeout(function () {
          wx.hideNavigationBarLoading();
          wx.hideLoading()
        }, 1000)
        if(res.data.data.id == productId){
          that.setData({
            productDetail:res.data.data
          })
        }
      }
    })
  },
  // 加入购物车事件
  addCart:function(e){
    try{
      // 读取本地缓存cartList
      let cartList = wx.getStorageSync("cartList") || [];
      // 取到当前cartList中id与当前商品的id
      let cartDetail = cartList.find(function(el){
        return el.id == e.target.dataset.id;
      })
      // 判断购物车中是否有当前商品如果有则+1，否则添加至cartList中
      if(cartDetail){
        cartDetail.value = parseInt(cartDetail.value) + 1
      }else{
        cartList.push({
          id:e.target.dataset.id,
          title:e.target.dataset.title,
          image:e.target.dataset.image,
          price:e.target.dataset.price,
          value:1,
          selected: true
        })
      }
      // 提示弹窗
      wx.showToast({
        title: '加入购物车成功!',
        duration:2000
      })
      // 更新本地缓存
      wx.setStorageSync("cartList", cartList)
    }catch(e){
      console.log(e)
    }
  },
  // 商品详情or商品参数点击事件
  showProduct:function(e){
    this.setData({
      productNum:e.currentTarget.dataset.index
    })
  },
  payDetail:function(e){
    let pay = [];
    pay.push({
      price: e.target.dataset.price,
      image: e.target.dataset.image,
      title: e.target.dataset.title
    })
    wx.navigateTo({
      url: '../pay/pay?pay=' + JSON.stringify(pay),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let productId = options.id;
    console.log(productId)
    this.getProductDetail(productId)
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