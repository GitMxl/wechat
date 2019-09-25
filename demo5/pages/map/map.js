// pages/map/map.js
const weMap = require("../../utils/qqmap-wx-jssdk.min.js");
let plugin = requirePlugin('routePlan');
let key = '6UJBZ-MAHR5-V6OIE-QTMQA-WP777-5XFK2';  //使用在腾讯位置服务申请的key
let referer = '梵蒂挥金';   //调用插件的app的名称;
let endPoint;
let wechatMap;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        that.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
      },
      fail(res){
        wx.getSetting({
          success(res) {
            console.log(res)
            if (!res.authSetting['scope.userLocation']) {
              wx.showModal({
                title: '开启定位功能',
                content: '需要获取你的当前位置',
                success(tip) {
                  console.log(tip)
                  if (tip.confirm) {
                    wx.openSetting({
                      success(data) {
                        console.log(data)
                        if (data.authSetting['scope.userLocation']) {
                          console.log('successs')
                        } else {
                          console.log('err')
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
    
  },
  openMapLocation(e){
    let latitude = this.data.latitude,
    longitude = this.data.longitude,
    that = this;
    console.log(latitude,longitude)
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
          endPoint= JSON.stringify({
            'name':res.name,
            latitude:res.latitude,
            longitude:res.longitude
          })
        wx.navigateTo({
          url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
        });
        const _locationChangeFn = function (res) {
          console.log('location change', res)
        }
        wx.onLocationChange(_locationChangeFn)
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.onLoad()
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