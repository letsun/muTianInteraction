// pages/menwei/index/index.js
const app = getApp()
const api = require('../../utils/api.js')
const common = require('../../utils/common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onReady(){


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(app.globalData.openid)

  },


  onLoad(options) {

  },


  /**
   * 门卫登录
   */
  oaLogin(e) {
    var that = this;

    let username = e.detail.value.username,
      password = e.detail.value.password

    if (username == '' || username == null) {
      fun.showToast("账号不能为空", 'none')
      return false;
    }
    if (password == '' || password == null) {
      fun.showToast("请输入密码", 'none')
      return false;
    }

    //userType 1：货主，2：销售科，3：储运科，4：司机，5：门卫
    common.requestPost(api.oaLogin, {
      openId:app.globalData.openid,
      mobile:username,
      pwd:password,
    }, (res) => {
      app.globalData.corpId=res.data.data.corpId;
      app.globalData.name=res.data.data.name;
      wx.reLaunch({
        url: '../home/home',
      })

    })
  },

})