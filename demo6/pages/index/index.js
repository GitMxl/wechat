const wxmap = require("../../utils/qqmap-wx-jssdk.min.js");
const http = require('../../utils/http.js');
const header = http.reqHeader;
let qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:'',
    inpVal:'',//搜索框
    locationCIty:'',//定位城市
    city: '',//城市
    update: '',//更新时间
    temperature: '',//当前温度
    weather: '',//天气情况
    air: '',//空气质量
    air_level: '',//空气质量
    predict: {},//预计天气
    live: {}//生活指数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    qqmapsdk = new wxmap({
      key: '6UJBZ-MAHR5-V6OIE-QTMQA-WP777-5XFK2'
    })
    wx.getLocation({
      success: function(res) {
        let lat = res.latitude,
            lon = res.longitude;
        that.getCity(lat, lon)
      },
      fail(res) {
        that.getCityLocation()
      }
    });
    setTimeout(()=>{
      wx.getSystemInfo({
        success(res){
          that.setData({
            winHeight:res.windowHeight
          })
        }
      })
    },60)
  },
  // 搜索
  inpSearch(e){
    let city = this.data.locationCIty;
    wx.navigateTo({
      url: '../selectCity/selectCity?city='+city,
    })
  },
  // 获取城市
  getCity(lat, lon) {
    const that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lon
      },
      success(res) {
        let city = res.result.address_component.city;
        city = city.replace('市', '');
        that.setData({
          locationCIty: city,
          city:city
        })
        that.getWea(city)
      }
    })
  },
  // 获取天气
  getWea(city) {
    const that = this;
    let city1 = city.replace('市', '');
    http.sendRrquest("https://www.tianqiapi.com/api/?version=v1&appid=[14363534]&appsecret=[4UkYPome]&city=" + city1, 'GET', '', header).then(function(res) {
      let predict = res.data.data;
      for (let i in predict) {
        let day = predict[i].day;
        let dayNum = day.indexOf("（");
        let newDay = day.substring(dayNum + 1);
        newDay = newDay.replace("）", '');
        predict[i].day = newDay;
      };
      that.setData({
        city: res.data.city,
        update: res.data.update_time,
        temperature: res.data.data[0].tem,
        weather: res.data.data[0].wea,
        air: res.data.data[0].air,
        air_level: res.data.data[0].air_level,
        predict: res.data.data,
        live: res.data.data[0].index,
        inpVal:''
      })
    }, function(err) {
      wx.showToast({
        title: '服务器异常请重新打开',
        icon: 'none',
        duration: 1000
      })
    })
  },
  // 获取定位权限
  getCityLocation() {
    const that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '开启定位功能',
            content: '需要获取您的当前位置',
            success(tip) {
              if (tip.confirm) {
                wx.openSetting({
                  success(data) {
                    if (data.authSetting['scope.userLocation']) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      wx.getLocation({
                        success: function(res) {
                          let lat = res.latitude,
                            lon = res.longitude;
                          that.getCity(lat, lon)
                        },
                      })
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              } else {
                wx.showToast({
                  title: '授权失败',
                  icon: 'none',
                  duration: 1000
                })
              }
            }
          })
        }
      }
    })
  },
  // 选择城市
  emit(name){
    this.getWea(name);
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
    const that = this;
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    let city = this.data.city;
    if(city){
      this.getWea(city);
      setTimeout(function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
        wx.hideLoading();
        that.getCityLocation()
      }, 1000)
    } else{
      wx.getLocation({
        success: function (res) {
          let lat = res.latitude,
            lon = res.longitude;
          that.getCity(lat, lon)
          setTimeout(function () {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh()
            wx.hideLoading();
          }, 1000)
        },
        fail(res) {
          console.log(res);
          wx.showToast({
            title: '未授权定位功能或请打开手机定位服务,无法获取您的位置',
            icon: 'none'
          })
          setTimeout(function () {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh()
            wx.hideLoading();
            that.getCityLocation()
          }, 1000)
        }
      })
    }
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