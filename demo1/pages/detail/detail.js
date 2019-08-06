// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoInfo:null,
    otherList:[],
    commentData:null
  },
  getCurrentVideo(videoId){
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5d3a8ac4c19e0b1b0fc5e20d/videoDetail?id='+videoId,
      success(res){
        console.log(res)
        if(res.data.data.code ===0){
          that.setData({
            videoInfo: res.data.data.data.videoInfo
          })
        }
      }
    })
  },
  getOthersList(videoId){
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5d3a8ac4c19e0b1b0fc5e20d/othersList?id='+videoId,
      success(res){
        if (res.data.data.code ===0){
          that.setData({
            otherList: res.data.data.data.othersList
          })
        }
      }
    })
  },
  getCommentData(videoId){
    let that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5d3a8ac4c19e0b1b0fc5e20d/commentsList?id=' + videoId,
      success(res) {
        if (res.data.data.code === 0) {
          that.setData({
            commentData: res.data.data.data.commentData
          })
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let videoId = options.id;
    this.getCurrentVideo(videoId);
    this.getOthersList(videoId);
    this.getCommentData(videoId) ;
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