// pages/home/home.js
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
  }
})