const foo = require('../../utils/floatNum.js')//精确计算
// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    price: 0,
    images: '',
    timeGive: ['不限送货时间', '工作日送货', '节假日、双休日送货'],
    index: 0, //配送时间下标
    freight: 0, //运费
    payMoney: 0, //实际费用
    count: 3, //数量
    orderPrice: 0 //订单金额
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let optionss = JSON.parse(options.pay)
    let title = optionss[0].title,
      price = optionss[0].price,
      image = optionss[0].image;
    let orderPrices = 0,
      counts = this.data.count,
      payMoneys = 0,
      freights = this.data.freight;
    orderPrices = foo.FloatingPointCalculator.mult(price,counts);
    payMoneys = foo.FloatingPointCalculator.add(orderPrices ,freights)
    this.setData({
      title: title,
      price: price,
      images: image,
      orderPrice: orderPrices,
      payMoney: payMoneys
    })
  },
  wxPay: function (e){
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) { console.log(res) },
      fail(res) { 
        console.log(res);
        wx.showModal({
          title: '支付提示',
          content: '本程序用于demo练习',
        })
        }
    })
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