// pages/uploadbatch/uploadbatch.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indexa: '0',
        nav: [{
            img: "../images/2/2_1.png",
            text: '未上传批次'
        }, {
            img: "../images/2/2_2.png",
            text: '已上传批次'
        }]
    },

    //nav 点击
    bindnav(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        that.setData({
            indexa: index
        })
    },

    //上传质检报告
    addbatch() {
        wx.navigateTo({
            url: '../addbatch/addbatch',
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

})