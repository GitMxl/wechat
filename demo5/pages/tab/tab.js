// pages/tab/tab.js
let start, move, end, menuList;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nav: ['手机', '电脑', '衣服', '家具', '百货', '钟表'],
    content: [{
        "data": [{
            "name": "Iphone",
            "list": ["京", "津", "沪", "渝", "蒙", "新"],
            "checkDrawer": 0,
          },
          {
            "name": "华为",
            "list": ["藏", "宁", "桂", "港", "澳", "黑"],
            "checkDrawer": 0,
          },
          {
            "name": "小米",
            "list": ["吉", "辽", "晋", "冀", "青", "鲁"],
            "checkDrawer": 0,
          }
        ]
      },
      {
        "data": [{
            "name": "Mac",
            "list": ["豫", "苏", "皖", "浙", "闽", "赣"],
            "checkDrawer": 0,

          },
          {
            "name": "DELL",
            "list": ["湘", "鄂", "粤", "琼", "甘", "陕"],
            "checkDrawer": 0,
          },
          {
            "name": "ACER",
            "list": ["吉", "辽", "晋", "冀", "青", "鲁"],
            "checkDrawer": 0,
          }
        ]
      },
      {
        "data": [{
            "name": "Nike",
            "list": ["黔", "滇", "川", "京", "津", "沪"],
            "checkDrawer": 0,
          },
          {
            "name": "Adidas",
            "list": ["渝", "蒙", "新", "藏", "宁", "桂"],
            "checkDrawer": 0,
          },
          {
            "name": "Vans",
            "list": ["港", "澳", "黑", "冀", "青", "鲁"],
            "checkDrawer": 0,
          }
        ]
      },
      {
        "data": [{
            "name": "宜家家居",
            "list": ["1", "2", "3", "4", "5", "6"],
            "checkDrawer": 0,
          },
          {
            "name": "索菲亚",
            "list": ["7", "8", "9", "0", "1", "2"],
            "checkDrawer": 0,
          },
          {
            "name": "曲美家居",
            "list": ["A", "B", "C", "D", "E", "F"],
            "checkDrawer": 0,
          }
        ]
      },
      {
        "data": [{
            "name": "巴黎春天百货",
            "list": ["G", "H", "I", "G", "K", "L"],
            "checkDrawer": 0,
          },
          {
            "name": "Aeon",
            "list": ["M", "N", "O", "P", "Q", "R"],
            "checkDrawer": 0,
          },
          {
            "name": "TJX",
            "list": ["S", "T", "U", "V", "W", "X"],
            "checkDrawer": 0,
          }
        ]
      },
      {
        "data": [{
            "name": "百达翡丽",
            "list": ["Y", "Z", "a", "b", "c", "d"],
            "checkDrawer": 0,
          },
          {
            "name": "爱彼",
            "list": ["e", "f", "g", "h", "i", "j"],
            "checkDrawer": 0,
          },
          {
            "name": "伯爵",
            "list": ["k", "l", "m", "n", "o", "p"],
            "checkDrawer": 0,
          }
        ]
      }
    ],
    current: 0, //swiper下标值
    listIndex: 0,
    scrollLeft: 0, //横向滚动距离
    animation: true, //判断滚动消息
    height: 0, //顶部导航栏高度
    opacity: 0, //顶部导航栏透明度
    scrollH: 0, //滚动高度
    animationData: '', //弹窗动画
    _showDrawer: false,
    menuList: [{
        "imgSrc": "../../image/1.jpg",
        "text": "汉中胜利农业产业开发有限责任公司，最初的腊肉加工厂（汉元腊肉食品加工）成立于2011年，2014年成立公司，位于勉县漆树坝镇唐家坝村，公司占地面积2600平方米，建筑面积1650平方米。我公司主要生产加工腊肉食品及土特产生产加工、销售。注册商标‘漆树坝’和‘想乡香’。腊肉年产量80余吨，从选材、分割、腌制、熏制、烧皮、清洗、包装等生产线共16个车间。公司设有独立化验室，严格把关每批产品质量。",
        "time": "2019-10-17",
        "late": 0,
        "slide": false,
      },
      {
        "imgSrc": "../../image/2.jpg",
        "text": "公司位于汉中市勉县漆树坝镇唐家坝村的大山深处，此地群山环绕、临海茫茫、幽谷密布、与世隔绝，终年绿树成荫、溪流潺潺，气候适宜，生态完好，是动植物生养的绝好之地。想乡香腊肉所用的纯粮食猪就是当地老百姓养殖，想乡香腊肉也是在这里完成熏烤加工，通过严格的检验，走向美食家的餐桌。",
        "time": "2019-10-18",
        "late": 0,
        "slide": false,
      },
      {
        "imgSrc": "../../image/3.jpg",
        "text": "公司积极贯彻国家扶贫攻坚战略部署，与众多贫困户、农农户长年为我们养殖纯粮食猪，在通过高于市场价回收，我们以这样的粮食猪肉作为原料，保证腊肉安全、放心的好品质。公司积极进取，带动乡亲致富，与当地的老百姓，长期共同进退，结下了深厚的友谊，作为有担当的企业和当地腊味明星品牌，被勉县政府常有报道，并推荐为汉中地区腊肉生产代表参展杨凌农高会，想乡香腊味系列产品一经亮相，便被抢购一空，网络订单纷纷而至。",
        "time": "2018-10-17",
        "late": 0,
        "slide": false,
      },
      {
        "imgSrc": "../../image/4.jpg",
        "text": "酒、预包装食品、日用百货、家电、家具、工艺品、饰品销售及网上销售运营",
        "time": "2020-10-17",
        "late": 0,
        "slide": false,
      }
    ],
    indexesTop: 0, //滑动菜单第一个到顶部距离
    menuIndex: 0, //滑动菜单下标,
    tapIndex:Number,
    accordionList: [{
        name: "杜甫",
        intro: "杜甫的思想核心是儒家的仁政思想，他有“致君尧舜上，再使风俗淳”的宏伟抱负。杜甫虽然在世时名声并不显赫，但后来声名远播，对中国文学和日本文学都产生了深远的影响。杜甫共有约1500首诗歌被保留了下来，大多集于《杜工部集》。",
        disabled: false
      },
      {
        name: "李清照",
        intro: "李清照出生于书香门第，早期生活优裕，其父李格非藏书甚富，她小时候就在良好的家庭环境中打下文学基础。出嫁后与夫赵明诚共同致力于书画金石的搜集整理。金兵入据中原时，流寓南方，境遇孤苦。所作词，前期多写其悠闲生活，后期多悲叹身世，情调感伤。形式上善用白描手法，自辟途径，语言清丽。",
        disabled: false
      },
      {
        name: "鲁迅",
        intro: "鲁迅一生在文学创作、文学批评、思想研究、文学史研究、翻译、美术理论引进、基础科学介绍和古籍校勘与研究等多个领域具有重大贡献。他对于五四运动以后的中国社会思想文化发展具有重大影响，蜚声世界文坛，尤其在韩国、日本思想文化领域有极其重要的地位和影响，被誉为“二十世纪东亚文化地图上占最大领土的作家”。",
        disabled: false
      }
    ],
    animationDataFab:{},
    fabShow:false,
    list: [
      {
        "txt": "abcdefghijk",
        "show": false
      },
      {
        "txt": "abcdefghijkl",
        "show": false
      },
      {
        "txt": "abcdefghijklm",
        "show": false
      },
      {
        "txt": "abcdefghijklmn",
        "show": false
      },
      {
        "txt": "abcdefghijklmno",
        "show": false
      },
      {
        "txt": "abcabcdefghijklmnop",
        "show": false
      },
      {
        "txt": "abcabcdefghijklmnopq",
        "show": false
      },
      {
        "txt": "abcabcdefghijklmnopqr",
        "show": false
      },
      {
        "txt": "abcabcdefghijklmnopqrs",
        "show": false
      },
      {
        "txt": "abcabcdefghijklmnopqrst",
        "show": false
      },
      {
        "txt": "abcabcdefghijklmnopqrstu",
        "show": false
      },
      {
        "txt": "abcabcdefghijklmnopqrstuv",
        "show": false
      }
    ]
  },
  gopop(e){
    console.log(e,"：gopop")
    wx.navigateTo({
      url: '../showpop/showpop',
    })
  },
  // swiper滑动事件
  swiperReplace(e) {
    this.setData({
      current: e.detail.current,
      scrollLeft: e.detail.current * 100
    })
  },
  // tab点击事件
  tab(e) {
    this.setData({
      current: e.target.dataset.current,
      scrollLeft: e.target.dataset.current * 100
    })
  },
  //上拉弹窗
  showDrawer(e) {
    this.setData({
      listIndex: e.currentTarget.dataset.index
    })
    let animation = wx.createAnimation({
      duration: 200,
    })
    animation.translateY(500).step();
    this.setData({
      _showDrawer: true,
      animationData: animation.export()
    })
    
    setTimeout(() => {
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  hiddenDrawer(e) {
    this.setData({
      _showDrawer: false
      
    })
  },
  getMessage(e) {
    let content = this.data.content;
    content[this.data.current].data[this.data.listIndex].checkDrawer = e.currentTarget.dataset.index
    this.setData({
      content: content,
      _showDrawer: false
    })
    let checkDrawer = this.data.content[this.data.current].data[this.data.listIndex].list[e.currentTarget.dataset.index];
    wx.showToast({
      title: '你选择了：' + checkDrawer,
      icon: "none"
    })
  },
  // 悬浮按钮
  fabtap(e) {
    let animation = wx.createAnimation({
      duration: 150,
    })
    let fabShow = this.data.fabShow;
    if (fabShow) {
      animation.rotate(0).step();
      this.setData({
        animationDataFab: animation.export(),
        fabShow: !fabShow
      })
    } else {
      animation.rotate(45).step();
      this.setData({
        animationDataFab: animation.export(),
        fabShow: !fabShow
      })
    }
  },
  // 滑动菜单
  touchStart(e) {
    try {
      start = e.changedTouches[0].pageX;
      let pageY = e.touches[0].pageY;
      let index = Math.floor((pageY - this.data.indexesTop) / 90);
      this.setData({
        menuIndex: index
      })
    } catch (err) {
      console.log(err,"：touchStarFail")
    }
  },
  touchMove(e) {
    try {
      move = e.changedTouches[0].pageX;
      let slide = this.data.menuList[this.data.menuIndex].slide;
      if (!slide) {
        menuList = this.data.menuList;
        if (start > move) {
          let late = parseInt(move - start);
          menuList[this.data.menuIndex].late = late
          if (late >= -160) {
            this.setData({
              menuList: menuList
            })
          } else if (late < -160) {
            menuList[this.data.menuIndex].slide = true
            this.setData({
              menuList: menuList
            })
          }
        } else {
          return;
        }
      } else {
        menuList = this.data.menuList;
        if (start < move) {
          let late = parseInt(move - start);
          let oldLate = this.data.menuList[this.data.menuIndex].late;
          late = oldLate + late;
          if (late <= 40) {
            menuList[this.data.menuIndex].late = late
            this.setData({
              menuList: menuList,
            })
          } else if (late > 40) {
            menuList[this.data.menuIndex].slide = false;
            this.setData({
              menuList: menuList
            })
          }
        } else {
          return;
        }
      }
    } catch (err) {
      console.log(err,"：touchMoveFail")
    }
  },
  touchEnd(e) {
    try {
      end = e.changedTouches[0].pageX;
      menuList = this.data.menuList;
      let slide = this.data.menuList[this.data.menuIndex].slide;
      if (slide) {
        menuList[this.data.menuIndex].late = -160
        this.setData({
          menuList: menuList
        })
      } else {
        menuList[this.data.menuIndex].late = 0
        this.setData({
          menuList: menuList
        })
      }
    } catch (err) {
      console.log(err,"：touchEndFail")
    }
  },
  delete(e) {
    console.log(e,"：delete")
    let num = Number(e.currentTarget.dataset.index);
    wx.showToast({
      title: '你点击了第' + (num + 1) + '个的删除！',
      icon: 'none'
    });
    menuList = this.data.menuList;
    menuList[num].late = '0';
    menuList[num].slice = 'false';
    menuList.splice(num, 1);
    this.setData({
      menuList: menuList
    })
  },
  // 手风琴
  accordion(e) {
    console.log(e,"：accordion")
    let oldTapIndex = this.data.tapIndex;
    let tapIndex = Number( e.currentTarget.dataset.index );
    let accordionList = this.data.accordionList;
    if (accordionList[tapIndex].disabled){
      if (oldTapIndex === tapIndex){
        accordionList[tapIndex].disabled = !accordionList[tapIndex].disabled;
      }
    }else{
      accordionList[tapIndex].disabled = !accordionList[tapIndex].disabled;
    }
    this.setData({
      
      tapIndex: tapIndex,
      accordionList: accordionList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // 顶部导航栏高度自设置
    let top = wx.getMenuButtonBoundingClientRect()//获取菜单按钮（右上角胶囊按钮）的布局位置信息。
    this.setData({
      height: top.top + top.height + 8,
    })
    // 获取用户设备信息
    wx.getSystemInfo({
      success: function(res) {
        console.log(res,"：getSystemInfoSuccess")
        that.setData({
          scrollH: res.windowWidth
        })
      },
    });
    // 滑动菜单当顶部距离
    let indexesTop = '';
    const query = wx.createSelectorQuery()
    query.select('.swiper-menu').boundingClientRect()
    query.exec(function(res) {
      indexesTop = res[0].top
      that.setData({
        indexesTop: indexesTop
      })
    })
    // 监听显示
    let list = this.data.list;
    for (let i in this.data.list) {//循环list
      this._observer = wx.createIntersectionObserver();//每个list创建监听
      this._observer
        .relativeToViewport()
        .observe('.item-' + i, (res) => {
          if (res.intersectionRatio > 0) {
            list[i].show = true
          } else {
            list[i].show = false
          }
          this.setData({
            list: list
          })
        })
    }
    setInterval(()=>{
      let date = new Date(),
          year = date.getFullYear(),
          mouth = date.getMonth() + 1,
          day = date.getDate(),
          hour = date.getHours(),
          minute = date.getMinutes(),
          second = date.getSeconds();
          day = day < 10 ? "0" + day : day,
          hour = hour < 10 ? "0" + hour : hour,
          second = second < 10 ? "0" + second : second;
    },10000)
  },
  // 页面滚动
  onPageScroll(e) {
    let scroll = e.scrollTop <= 0 ? 0 : e.scrollTop;//判断页面滚动距离
    let opacity = scroll / this.data.scrollH;
    if (this.data.opacity >= 1 && opacity >= 1) {
      return;
    }
    this.setData({
      opacity: opacity,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 动态设置tabBar的整体样式
    wx.setTabBarStyle({
      color: '#FF0000',
      selectedColor: '#00FF00',
      backgroundColor: '#0000FF'
    })
    //动态设置tabBar第一项的内容
    wx.setTabBarItem({
      index: 0,
      text: 'text',
      iconPath: '/image/1.jpg',
      selectedIconPath: '/image/2.jpg'
    })
    //右上角添加文本
    wx.setTabBarBadge({
      index: 0,
      text: '9'
    })
    //tabBar第二项的右上角的红点
    wx.showTabBarRedDot({
      index: 1,
      success(res){
        console.log(res,":showTabBarRedDotSuccess")
      },
      fail(err){
        console.log(err,":showTabBarRedDotFail")
      }
    })
    
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
    let list = this.data.list;
    for (let i in this.data.list) {
      if (this._observer) this._observer.disconnect();
    }

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