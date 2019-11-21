// pages/tabbar/tabbar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{
      "name":"Jone",
      "level":"low",
      "age":"52",
      "monye":"empty"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = this.data.obj;
    let objs = JSON.stringify(obj,null,3)
    console.log(objs)
    function date() {
      let date = new Date();
    }
    let a = setInterval(()=>{
      date()
    },200)
    let numberStr= a;
    console.log(a);
    switch(a){
      case 1 : 
      case 2 : 
      case 3 : break;
      case 4 :break;
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
    wx.clearStorageSync()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(a)
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