// pages/classify/classify.js
const http = require('../../utils/http.js');
const header = http.reqHeader();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classifyList:[],
    selectId:0,
    index:0,
    classifyContent:[],
    scrollTop:0,
    scrollClass:0
  },
  selectClassify:function(e){
    let that = this;
    console.log(e);
    let selectId = e.target.dataset.id;
    let b = parseInt(selectId)*46;
    
    this.setData({
      selectId: selectId,
      scrollTop:b
    })
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    http.sendRrquest('https://easy-mock.com/mock/5d4bc44b5f42bd23c810ac25/shopapp/classify?id=' + selectId,'GET','',header).then(function(res){
      setTimeout(function () {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        }, 1000);
      if (res.data.code === 0) {
          setTimeout(function () {
            wx.hideNavigationBarLoading();
            wx.hideLoading();
          }, 1000)
          let classifyList = res.data.dataclass.classify, classifyContent = res.data.data;
          that.setData({
            classifyContent: classifyContent,
            scrollClass: 0
          })
        }
    }, function (err) {
      setTimeout(function () {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }, 1000)
      console.log(err, 'err')
    })
  },
  listBindscrolltolower:function(e){
    
  },
  classifyBindscrolltolower: function (e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let id =this.data.selectId;
    http.sendRrquest('https://easy-mock.com/mock/5d4bc44b5f42bd23c810ac25/shopapp/classify?id='+id,'GET','',header).then(function(res){
      setTimeout(function () {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }, 1000)
      console.log(res)
      if (res.data.code === 0) {
        setTimeout(function () {
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        }, 1000)
        let classifyList = res.data.dataclass.classify, classifyContent = res.data.data;
        that.setData({
          classifyList: classifyList,
          classifyContent: classifyContent
        })
      }
    },function(err){
      setTimeout(function () {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }, 1000)
      console.log(err,'err')
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