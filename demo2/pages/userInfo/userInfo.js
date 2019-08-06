const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
let qqmapsdk;
// pages/userInfo/userInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0, //纬度
    longitude: 0, //经度
    markers: [], //标记点
    value: "", //搜索框值
    scale: '16', //地图缩放比列
    polyline: [], ////线路
    start: '', //起始坐标
    end: '',//结束坐标
    startValue:'',
    endValue:''
  },
  // 开关
  swithchange: function(e) {
    console.log(e)
  },
  // 滑动
  sliderchange: function(e) {
    this.setData({
      scale: e.detail.value
    })
  },
  // input框value值
  inputValue: function(e) {
    this.setData({
      value: e.detail.value
    })
  },
  // 搜索事件
  nearby_search: function() {
    var _this = this;
    let values = this.data.value,
      latitudes = this.data.latitude,
      longitudes = this.data.longitude;
    let arr = latitudes + "," + longitudes;
    console.log(arr)
    // 调用接口
    qqmapsdk.search({
      keyword: values, //搜索关键词
      location: arr, //设置周边搜索中心点
      success: function(res) { //搜索成功后的回调
        var mks = []
        console.log(res)
        if (res.data.length == 0) {
          wx.showModal({
            title: '提示',
            content: '未找到相关地点。',
            showCancel: false
          })
          return false
        }
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "../../image/location_search.png",
            width: 40,
            height: 40,
            callout: {
              content: res.data[i].address,
              color: '#0e0e0e',
              display: 'BYCLICK'
            },

          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks,
          scale: 17,
          latitude: res.data[0].location.lat,
          longitude: res.data[0].location.lng
        })

      },
      fail: function(res) {
        console.log(res);
      },

    });
  },
  // 选择起点
  startTap:function(e) {
    let that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        let lat =res.latitude, log = res.longitude;
        let latlog = lat + "," + log;
        let mks = [];
        mks.push({
          title: res.name,
          id: 1,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: '../../image/location_search.png',
          width: 30
        })
        that.setData({
          startValue:res.name,
          start: latlog,
          markers: mks
        })
      },
    })
  },
  // 选择终点
  endTap:function(e) {
    let that = this;
    let markes = this.data.markers;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        let lat = res.latitude, log = res.longitude;
        let latlog = lat + "," + log;
        let mks = [];
        markes.push({
          title:res.name,
          id:2,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath:'../../image/location_search.png',
          width:30
        });
        that.setData({
          endValue: res.name,
          end: latlog,
          markers: markes
        })
      },
    })
  },
  // 线路规划
  formSubmit(e) {
    var _this = this;
    if(this.data.end == ''){
      wx.showModal({
        title: '提示',
        content: '请选择终点位置！',
        showCancel:false,
      })
      return false;
    }
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'transit', //'transit'(公交路线规划)
      //from参数不填默认当前地址
      from: _this.data.start,
      to: _this.data.end,
      success: function(res) {
        let ret = res.result.routes[0];
        let count = ret.steps.length;
        let pl = [];
        let coors = [];
        //获取各个步骤的polyline
        for (let i = 0; i < count; i++) {
          if (ret.steps[i].mode == 'WALKING' && ret.steps[i].polyline) {
            coors.push(ret.steps[i].polyline);
          }
          if (ret.steps[i].mode == 'TRANSIT' && ret.steps[i].lines[0].polyline) {
            coors.push(ret.steps[i].lines[0].polyline);
          }
        }
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        let kr = 1000000;
        for (let i = 0; i < coors.length; i++) {
          for (let j = 2; j < coors[i].length; j++) {
            coors[i][j] = Number(coors[i][j - 2]) + Number(coors[i][j]) / kr;
          }
        }
        //定义新数组，将coors中的数组合并为一个数组
        let coorsArr = [];
        for (let i = 0; i < coors.length; i++) {
          coorsArr = coorsArr.concat(coors[i]);
        }
        //将解压后的坐标放入点串数组pl中
        for (let i = 0; i < coorsArr.length; i += 2) {
          pl.push({
            latitude: coorsArr[i],
            longitude: coorsArr[i + 1]
          })
        }
        console.log(res);
        // console.log(pl);
        // console.log(coors);
        console.log(ret);
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#ff00dd',
            width: 4
          }]
        })
      },
      fail: function(error) {
        console.error(error);
      }
    });
  },
  // marker事件
  markerMap: function(e) {
    let markeId = e.markerId;
    let markerList = this.data.markers;
    if (markerList.length == 1) {
      return false;
    }
    let markerLists = [];
    for (let i = 0; i < markerList.length; i++) {
      if (markerList[i].id == markeId) {
        markerLists.push(markerList[i]);
        markerList = markerLists;
      }
    }
    this.setData({
      markers: markerList,
      latitude: markerList[0].latitude,
      longitude: markerList[0].longitude
    })
  },
  // 地图上点击事件
  mapTap: function(e) {
    console.log(e + "mapTap")
  },

  poiTap: function(e) {
    console.log(e + "poiTap")
  },
  locationTap: function(e) {
    console.log(e, "locationTap")
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        console.log(res);
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: '6UJBZ-MAHR5-V6OIE-QTMQA-WP777-5XFK2'
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.mapCtx = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        const latitude = res.latitude
        const longitude = res.longitude

        that.setData({
          latitude: latitude,
          longitude: longitude
        })
      },
      fail: function(res) {
        console.log(res, )
      }
    })
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请授权！',
            success(tip) {
              if (tip.confirm) {
                wx.openSetting({
                  success: function(data) {
                    if (data.authSetting["scope.userLocation"] === true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //授权成功之后，再调用chooseLocation选择地方

                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
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