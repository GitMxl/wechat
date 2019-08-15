// pages/car/car.js
const foo = require("../../utils/floatNum.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //小程序没有refs，所以只能用动态布尔值控制关闭
    toggle: false,
    selectedAll: true,
    totalMoney: 0,
     dataList: [
       {
        id: 1,
        title: "小米",
        selected: true,
        img: '//img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png',
        price: '3299.30',
        num: 1
      },
      {
        id: 2,
        title: "华为",
        selected: false,
        img: '//img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png',
        price: '3333.60',
        num: 1
      },
      {
        id: 3,
        title: "荣耀",
        selected: false,
        img: '//img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png',
        price: '1400.60',
        num: 1
      },
      {
        id: 4,
        title: "红米",
        selected: false,
        img: '//img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png',
        price: '1555.60',
        num: 1
      },
      {
        id: 5,
        title: "iphone",
        selected: true,
        img: '//img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png',
        price: '3456.60',
        num: 1
      },
      {
        id: 6,
        title: "三星",
        selected: false,
        img: '//img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png',
        price: '1234.60',
        num: 1
      },
      {
        id: 7,
        title: "oppo",
        selected: true,
        img: '//img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png',
        price: '1111.60',
        num: 1
      },
      {
        id: 8,
        title: "vivo",
        selected: false,
        img: '//img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png',
        price: '2222.60',
        num: 1
      },
      {
        id: 9,
        title: "魅族",
        selected: false,
        img: '//img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png',
        price: '2666.60',
        num: 1
      }
     ],
    actions: [{
      name: '删除',
      color: '#fff',
      fontsize: '22',
      width: 80,
      //icon: 'like.png',//此处为图片地址
      background: '#ed3f14'
    }]
  },
  addNum(e) {
    let num = e.currentTarget.dataset.num;
    let key = e.currentTarget.dataset.key;
    let dataList = this.data.dataList;
    num++;
    dataList[key].num = num;
    this.setData({
      dataList: dataList
    })
    this.totalPrice()
  },
  subtractNum(e) {
    let num = e.currentTarget.dataset.num;
    let key = e.currentTarget.dataset.key;
    let dataList = this.data.dataList;
    num--;
    num = num <= 1 ? 1 : num;
    dataList[key].num = parseInt(num);
    this.setData({
      dataList: dataList
    })
    this.totalPrice()
  },
  selectShop(e) {
    let key = e.currentTarget.dataset.key;
    let select = e.currentTarget.dataset.select;
    let dataList = this.data.dataList;
    dataList[key].selected = !select;
    this.setData({
      dataList: dataList
    })
    for (let i in dataList) {
      if (!dataList[i].selected) {
        console.log(dataList[i])
        this.setData({
          selectedAll: dataList[i].selected
        })
        break;
      } else {
        this.setData({
          selectedAll: true
        })
      }
    }
    
    this.totalPrice()
  },
  shopAll(e) {
    let dataList = this.data.dataList;
    let selectedAll = e.currentTarget.dataset.selectall;
    for (let i in dataList) {
      dataList[i].selected = !selectedAll;
    }
    this.setData({
      dataList: dataList,
      selectedAll: !selectedAll
    })
    this.totalPrice()
  },

  totalPrice() {
    let total = 0;
    let dataList = this.data.dataList;
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].selected) {
        total += foo.FloatingPointCalculator.mult(dataList[i].price, dataList[i].num)

      }
    }
    Math.formatFloat = function(f, digit) {
        var m = Math.pow(10, digit);
        return Math.round(f * m, 10) / m;
      },
      total = Math.formatFloat(total, 2)
    this.setData({
      totalMoney: total
    })
  },
  handlerCloseButton(e) {
    wx.showModal({
      title: '提示',
      content: '删除吗',
      success: res => {
        if (res.confirm) {
          let index = e.detail.index;
          let item = e.detail.item;
          let menuTxt = ["删除"][index];
          wx.showToast({
            title: "您点击了【" + menuTxt + "】按钮，列表id：" + item.id,
            icon: "none"
          })
          //list中可以每一项都设置toggle
          setTimeout(() => {
            this.setData({
              toggle: this.data.toggle ? false : true
            });
          }, 200)
        }
      }
    })
  },
  goShop(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.totalPrice();
    let dataList = this.data.dataList;
    for (let i in dataList) {
      if (!dataList[i].selected) {
        this.setData({
          selectedAll: dataList[i].selected
        })
        break
      } else {
        this.setData({
          selectedAll: true
        })
      }

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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