//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    currentIndexNav:0,
    navList:[],
    swiperList:[],
    videosList:[]
  },
  activeNav(e){
    this.setData({
      currentIndexNav:e.target.dataset.index
    });
    let nav = this.data.currentIndexNav;
    this.getVideosList(nav)
  },
  getNavList(){
    let that = this;
    wx.request({
      url:"https://easy-mock.com/mock/5d3a8ac4c19e0b1b0fc5e20d/navList",
      success(res){
        if(res.data.code === 0){
          that.setData({
            navList:res.data.data.navList
          })
        }
      },
      fail(res){
          console.log(res)
      }
    })
  },
  getSwiperList(){
    let that = this;
    wx.request({
      url:"https://easy-mock.com/mock/5d3a8ac4c19e0b1b0fc5e20d/swiperList",
      success(res){
        if(res.data.code ===0){
          that.setData({
            swiperList: res.data.data.swiperList
          })
        }
      }
    })
  },
  getVideosList(nav) {
    let that = this;
    wx.request({
      url: "https://easy-mock.com/mock/5d3a8ac4c19e0b1b0fc5e20d/index?nav="+nav,
      success(res) {
        if (res.data.data.code === 0) {
          that.setData({
            videosList: res.data.data.index.videosList
          })
        }
      }
    })
  },
  onLoad:function(options){
    let nav = this.data.currentIndexNav;
    this.getNavList();
    this.getSwiperList();
    this.getVideosList(nav);
  },
  onReady:function(){

  },
  onShow:function(){

  },
  nHide: function () {

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
