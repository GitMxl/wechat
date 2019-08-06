const foo = require('../../utils/floatNum.js')
Page({
  data: {
    cartList: [],//购物车商品列表
    checkAll:true,//全选
    totalMoney:0,//总价
    last:0,//shopListLast位置确认
  },
  // 选中
  selectedShop:function(e){
    let cartLists = this.data.cartList;//购物车商品列表
    let index = e.target.dataset.index;//获取当前的下标值
    let selected = cartLists[index].selected;//获取当前商品的selected值
    cartLists[index].selected = !selected;//当前商品selected值相反值
    this.setData({
      cartList: cartLists
    });
    //当购物车列表中只有一种商品时。根据当前商品的selected值确认全选按钮的selected值
    if (cartLists.length == 1) {
      this.setData({
        checkAll: cartLists[0].selected
      })
    };
    // 定义一个变量
    let selectedNum = 0;
    // 判断购物车中每种商品的seleced值是否为true，如果为true，则变量值自加，否则全选按钮的selected值为false
    for (let i = 0; i < cartLists.length; i++){
      if(cartLists[i].selected){
        selectedNum++;
      }else{
        this.setData({
          checkAll: cartLists[i].selected
        })
      }
    }
    // 当每种商品的selected值都为true时，变量的值与购物车中商品的长度相等，则全选按钮为选中状态
    if (cartLists.length == selectedNum){
      this.setData({
        checkAll: true
      })
    }
    // 计算总价
    this.total();
    // 修改缓存中数据
    wx.setStorageSync("cartList", cartLists)
  },
  // 全选
  allCheck:function(e){
    let checkAll = this.data.checkAll;//获取当前全选按钮的值
    let cartLists = this.data.cartList;//购物车商品列表
    // 每种商品的selected值等于全选selected的相反值
    for (let i = 0; i < cartLists.length; i++){
      cartLists[i].selected = !checkAll;
    };
    // 计算总价
    this.total();
    this.setData({
      cartList: cartLists,
      checkAll : !checkAll
    })
  },
  // 减少
  subtractNum:function(e){
    let cartLists = this.data.cartList;//获取当前全选按钮的值
    let index = e.target.dataset.index;//获取当前的下标值
    let vlaue = cartLists[index].value;//获取当前的value值
    // 当value值为1时不能改在减
    if (vlaue == 1){
      cartLists[index].value = 1 ;
      return false
    }
    vlaue-- ;
    cartLists[index].value = vlaue;
    this.setData({
      cartList: cartLists
    })
    this.total();
    wx.setStorageSync("cartList", cartLists);
  },
  // 增加
  addNum:function(e){
    let cartLists = this.data.cartList;//获取当前全选按钮的值
    let index = e.target.dataset.index;//获取当前的下标值
    let vlaue = cartLists[index].value;//获取当前的value值
    vlaue++;
    cartLists[index].value = vlaue;
    this.setData({
      cartList:cartLists
    })
    this.total();
    wx.setStorageSync("cartList", cartLists)
  },
  // 删除
  deleteShop:function(e){
    let cartLists = this.data.cartList;//获取当前全选按钮的值
    let index = e.target.dataset.index;//获取当前的下标值
    cartLists.splice(index, 1);//从商品列表中删除当前商品
    let lasts = this.data.last;//获取当前shopListLast
    lasts = parseInt(cartLists.length) - 1;
    this.setData({
      cartList:cartLists,
      last:lasts
    })
    this.total();
    wx.setStorageSync("cartList", cartLists)
  },
  // 合计
  total:function(){
    let num = 0 ;//总价
    let cartLists = this.data.cartList;//获取当前全选按钮的值
    // 循环商品列表，判断每种商品是否被选中，当选中时计算价格，反之跳过
    for(let i = 0 ; i < cartLists.length ; i++){
      if (cartLists[i].selected){
        num += foo.FloatingPointCalculator.mult(cartLists[i].price,cartLists[i].value)
      }
    }
    this.setData({
      totalMoney: num
    })
  },
  // 清空
  cartClean:function(){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认清空购物车吗？',
      success(res) {
        if (res.confirm) {
          let cartLists = that.data.cartList;
          cartLists = [];
          that.setData({
            cartList: cartLists
          })
          wx.setStorageSync("cartList", cartLists)
        } else if (res.cancel) {
          return false
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let cartLists = wx.getStorageSync("cartList");//读取缓存中数据
    let lasts = this.data.last//获取当前shopListLast
    lasts= parseInt(cartLists.length)-1;//赋值
    this.setData({
      cartList: cartLists,
      last:lasts
    });
    // 计算总价
    this.total();
    //页面打开时判断全选按钮的状态
    if (cartLists.length == 1) {
      this.setData({
        checkAll: cartLists[0].selected
      })
    };
    let selectedNum = 0;
    for (let i = 0; i < cartLists.length; i++) {
      if (cartLists[i].selected) {
        selectedNum++;
      } else {
        this.setData({
          checkAll: cartLists[i].selected
        })
      }
    }
    if (cartLists.length == selectedNum) {
      this.setData({
        checkAll: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(){

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
