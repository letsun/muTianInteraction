//index.js
//获取应用实例
const app = getApp()
const api = require("../../utils/api.js")
const common = require("../../utils/common.js")

Page({
  data: {

  },
  onShow() {
    common.showLoading()
    common.getopenid(res => {

      app.globalData.openid = res.data.data.openid
      if (res.data.status == 1) {
        // wx.reLaunch({
        //   url: '../login/login',
        // })

        if (res.data.data.corpId!='' && res.data.data.corpId!=undefined) {
          console.log(res.data.data.corpId)
          app.globalData.corpId = res.data.data.corpId;
          wx.reLaunch({
            url: '../home/home',
          })
        }else {
          wx.reLaunch({
            url: '../login/login',
          })

         }


      } else {
        wx.hideLoading()
      }

    })
  }

})
