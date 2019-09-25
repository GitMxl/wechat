var sendRrquest = function (url, method, data, header) {
  var status = true;

  var promise = new Promise(function (resolve, reject) {
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型2g，3g，4g，wifi, none, unknown
        var networkType = res.networkType
        if (networkType == "none") {
          wx.hideLoading();
          //没有网络连接
          wx.showModal({
            title: '提示',
            content: '网络连接失败,请检查您的网络设置',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                //返回res.confirm为true时，表示用户点击确定按钮
                console.log('表示用户点击确定按钮')
              }
            }
          })
          status = false;
        } else if (networkType == "unknown") {
          wx.hideLoading();
          //未知的网络类型
          wx.showModal({
            title: '提示',
            content: '未知的网络类型,请检查您的网络设置',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                //返回res.confirm为true时，表示用户点击确定按钮
                console.log('表示用户点击确定按钮')
              }
            }
          })
          status = false;
        } else {
          wx.request({
            url: url,
            data: data,
            method: method,
            header: header,
            success: resolve,
            fail: reject
          })

        }
      }
    })
    return status
  });
  return promise;
};
// header 头部
function reqHeader() {
  var header = {
    'content-type': 'application/x-www-form-urlencoded'
  }
  return header
}

// 把方法暴露接口出来供别的页面使用[前面为名字，后面为方法]
module.exports = {
  reqHeader: reqHeader,
  sendRrquest: sendRrquest,
}