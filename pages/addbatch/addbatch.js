// pages/addbatch/addbatch.js
const util = require("../../utils/util")

Page({

    /**
     * 页面的初始数据
     */
    data: {
    
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        let date = util.formatTime(new Date())
        that.setData({
            date:date
        })
    },


    time(e) {
        let that = this;
        that.setData({
            date:e.detail.value
        })
    }

  
})