// pages/home/home.js
const wxmap = require("../../utils/qqmap-wx-jssdk.min.js");
let qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clas: 'car', //出行方式class
    longitude: '', //经度
    latitude: '', //纬度
    scale: 16, //缩放
    markers: [], //标记
    polyline: [], //线路
    points: [], //用于显示搜索后的marker
    inpVal: '',
    mode: 'driving',//出行方式（共四种）
    city: '',
    searchList:[],
    showList:false,
    province:''
  },
  // 定位
  showGetLocation() {
    let that = this;
    // 微信API：定位
    wx.getLocation({
      success: function(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          scale: 16,
          points: [{
            longitude: res.longitude,
            latitude: res.latitude,
          }],
          markers: [{
            id: 0,
            longitude: res.longitude,
            latitude: res.latitude,
            iconPath: '../../image/address.png',
            width: 30
          }]
        })
        let latitude = res.latitude,
          longitude = res.longitude;
          // 腾讯API:坐标到坐标所在位置的文字描述的转换
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success(res) {
            console.log(res)
            that.setData({
              province:res.result.address_component.province,
              city: res.result.address_component.city
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      },
    })

  },
  //图标定位
  location: function(e) {
    this.setData({
      markers:[],
      polyline:[],
      inpVal:''
    })
    this.showGetLocation();
  },
  // 地图放大缩小
  sliderTap: function(e) {
    let slider = e.detail.value;
    this.setData({
      scale: slider
    })
  },
  // 下拉选择事件
  downText:function(e){
    console.log(e)
    let txt = e.target.dataset.title;
    console.log(txt)
    this.setData({
      showList:false,
      inpVal:txt
    })
  },
  // input的value值
  inputValue: function(e) {
    let that =this;
    let val = e.detail.value;
    console.log(val.length)
    if (val.length > 0){
      this.setData({
        showList:true
      })
    }else{
      this.setData({
        showList: false
      })
    }
    let lat = this.data.latitude,
      log = this.data.longitude,
      city = this.data.city,
      location = lat + ',' + log;
    this.setData({
      inpVal: val
    })
    	// 腾讯API：用于获取输入关键字的补完与提示
    qqmapsdk.getSuggestion({
      keyword: val,
      region: city,
      success(res) {
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {          
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng          
          });        
        }
        that.setData({
          searchList:sug
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  // 线路规划
  goLine: function(mode, fromGo, toGo) {
    let that = this;
    // 腾讯API：提供路线规划
    qqmapsdk.direction({
      mode: mode,//(驾车，步行，骑行，公交)
      from: fromGo,
      to: toGo,
      success(res) {
        let ret = res;
        console.log(ret);
        let coors = ret.result.routes[0].polyline,
          pl = [];
        if (mode == 'transit') {
          ret = res.result.routes[0];
          let count = ret.steps.length;
          coors = [];
          for (let i = 0; i < count; i++) {
            if (ret.steps[i].mode == 'WALKING' && ret.steps[i].polyline) {
              coors.push(ret.steps[i].polyline);
            }
            if (ret.steps[i].mode == 'TRANSIT' && ret.steps[i].lines[0].polyline) {
              coors.push(ret.steps[i].lines[0].polyline);
            }
          }
          var kr = 1000000;
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
        } else {
          //坐标解压（返回的点串坐标，通过前向差分进行压缩）
          let kr = 1000000;
          let step = ret.result.routes[0].steps;
          for (let i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          //将解压后的坐标放入点串数组pl中
          for (let i = 0; i < coors.length; i += 2) {
            pl.push({
              latitude: coors[i],
              longitude: coors[i + 1]
            })
          }
        }
        that.setData({
          polyline: [{
            points: pl,
            color: '#FF0000DD',
            width: 5
          }]
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  // 搜索
  searchTap: function(e) {
    let that = this;
    let val = this.data.inpVal;
    let mks = this.data.markers;
    let len = mks.length;
    if (len >= 2){
      mks = mks.splice(0,1)
    }
    let poi = this.data.points;
    this.setData({
      polyline: [],
      showList:false
    })
    // 腾讯API：地点搜索
    qqmapsdk.search({
      keyword: val,
      region: that.data.city,
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          mks.push({
            id: res.data[i].id,
            title: res.data[i].title,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: '../../image/location_search.png',
            width: 50,
            callout: {
              content: res.data[i].title,
              color: '#0e0e0e',
              display: 'BYCLICK'
            },
          })
          poi.push({
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
          })
        }
        that.setData({
          markers: mks,
          points: poi
        })
      }
    })
  },
  // 点击marker事件
  markerTap: function(e) {
    let mks = this.data.markers;
    let that = this
    console.log(mks)
    let markeId = e.markerId;
    if (mks.length === 2) {
      let lat = this.data.latitude,
        log = this.data.longitude,
        mode = this.data.mode,
        latGo = mks[1].latitude,
        logGo = mks[1].longitude;
      let fromGo = lat + "," + log;
      let toGo = latGo + "," + logGo;
      this.goLine(mode, fromGo, toGo);
    } else {
      let mk = [];
      mk.push(mks[0]);
      for (let i = 0; i < mks.length; i++) {
        if (markeId == mks[i].id) {
          mk.push(mks[i]);
          break;
        }
      }
      let mkr = [];
      mkr = Array.from(new Set(mk))
      this.setData({
        markers: mkr
      })
    }
  },

  // 出行方式
  goTo: function(e) {
    let cla = e.currentTarget.dataset.clas,
      mode = this.data.mode;
    let mks = this.data.markers;
    let modes = '';
    switch (cla) {
      case "car":
        modes = 'driving';
        break;
      case "walk":
        modes = 'walking';
        break;
      case "bus":
        modes = 'transit';
        break;
      case "riding":
        modes = 'bicycling';
        break;
    }
    if (mks.length === 2) {
      let lat = this.data.latitude,
        log = this.data.longitude,
        mode = modes,
        latGo = mks[1].latitude,
        logGo = mks[1].longitude;

      let fromGo = lat + "," + log;
      let toGo = latGo + "," + logGo;
      this.goLine(mode, fromGo, toGo);
    }
    this.setData({
      clas: cla,
      mode: modes
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.showGetLocation();
    qqmapsdk = new wxmap({
      key: '6UJBZ-MAHR5-V6OIE-QTMQA-WP777-5XFK2'
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