// pages/selectCity/selectCity.js
const cityList = require("../../utils/city.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:'',//高度
    inpVal:'',//搜索框值
    inputShow:false,//input焦点判断
    locationCity:'',//城市
    searchList:[],//搜索列表
    hotCity: ['北京', '上海', '广州', '深圳', '杭州', '长沙', '武汉', '厦门', '西安', '昆明', '成都', '重庆'],//热门城市
    allCity:[],//所有城市
    touchmove:false,//是否在索引列表上滑动
    scrollViewId: '', // scroll-view滚动到的子元素的id
    indexesIndex:-1,//索引值
    indexesHeight:405,//索引框高度
    indexesChildren:15,//索引子元素高度
    indexesTop:Number//第一个到顶部的距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let locationCity = options.city || '未获取到位置';
    const that = this;
    let indexesTop = '';
   const query = wx.createSelectorQuery()
    query.select('.indexes').boundingClientRect()
    query.exec(function(res){
      indexesTop = res[0].top
      that.setData({
        indexesTop: indexesTop
      })
    })
    
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight:res.windowHeight,
          locationCity: locationCity,
          allCity:cityList.list,
        })
      },
    })
  },
  inpFocus(e) {
    this.setData({
      inputShow:true,
    })
  },
  getInpVal(e){
    let value = e.detail.value;
    this.setData({
      inpVal:value
    })
    if(value !=""){
      this.searchCity()
    }else{
      this.setData({
        searchList: [],
      })
    }
  },
  searchCity() {
    let searchList = [];
    cityList.list.forEach((item1, index1) => {
      item1.data.forEach((item2, index2) => {
        if (item2.keyword.indexOf(this.data.inpVal.toLocaleUpperCase()) !== -1) {
          searchList.push(item2.cityName)
        }
      })
    });
    this.setData({
      searchList: searchList
    })
  },
  selectCity(e){
    let selectCity = e.currentTarget.dataset.name;
    let pages = getCurrentPages();
    let indexPages = pages[0];
    indexPages.emit(selectCity);
    wx.navigateBack({
      delta:1
    })
  },
  touchStart(e){
    this.setData({
      touchmove:true
    });
    let scrollViewId = e.target.dataset.letter === '索引' ? 'A' : e.target.dataset.letter ;
    let indexesIndex = e.target.dataset.index === 0 ? 1 : e.target.dataset.index;
    this.setData({
      scrollViewId,
      indexesIndex
    })
  },
  touchMove(e) {
    let pageY = e.touches[0].pageY;
    let index = Math.floor((pageY - this.data.indexesTop) / this.data.indexesChildren);
    let num = this.data.allCity[index=== 0 ? 1 : index];
    if(num){
      this.setData({
        scrollViewId: num.letter,
        indexesIndex: index
      })
    }
  },
  touchEnd(e) {
    this.setData({
      touchmove: false,
      indexesIndex: -1
    })
  },
  touchCancel(e) {
    this.setData({
      touchmove: false,
      indexesIndex: -1
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