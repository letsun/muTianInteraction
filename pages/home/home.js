// pages/home/home.js
const app = getApp()
const api = require("../../utils/api.js")
const common = require("../../utils/common.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 上传产检报告
   * 
   */
  uploadbatch() {
    wx.navigateTo({
      url: '../uploadbatch/uploadbatch',
    })
  },


  //退出登录

  loginout() {
    common.showModal('提示', '是否退出登录？', confirm => {
      common.requestPost(api.checkLoginOut, {
        openId: app.globalData.openid
      }, res => {
        
        wx.reLaunch({
          url: '../login/login'
        })
      })
    }, cancel => { })
  }
})