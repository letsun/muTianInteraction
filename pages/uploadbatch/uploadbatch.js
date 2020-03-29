// pages/uploadbatch/uploadbatch.js
const app = getApp()
const api = require("../../utils/api.js")
const common = require("../../utils/common.js")
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
        }],
        batchList: '',
        pageSize: '20',
        pageNo: 1
    },

    onShow() {
        let that = this;
        that.getBatchList(2);
        console.log(app.globalData.corpId)
    },

    //nav 点击
    bindnav(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        that.setData({
            indexa:index,
            batchList:'',
            pageNo: 1
        })
        if (index ==0) {
            that.getBatchList(2)
        }else{
            that.getBatchList(1)
        }

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        if (that.data.pageNo <= that.data.totalPage) {
            that.setData({
                pageNo: that.data.pageNo + 1
            })
            common.showLoading();

            if (that.data.indexa ==0) {
                that.getBatchList(2)
            }else{
                that.getBatchList(1)
            }
        } else {
            common.showToast('没有更多数据了', 'none', res => { })
        }
    },

    //生产批次列表
    getBatchList(status) {
        let that = this;
        common.requestGet(api.getBatchList, {
            openId: app.globalData.openid,
            pageNo: that.data.pageNo,
            pageSize: that.data.pageSize,
            status:status
        }, res => {
            if (that.data.batchList == '') {
                let batchList = res.data.data.batchList;
                for (let i in batchList) {
                    batchList[i].checked = false;
                }

                batchList[0].checked = true;
                that.setData({
                    batchList: batchList,
                    totalPage: res.data.totalPage
                })

            } else {
                let batchList = that.data.batchList;
                let batchLista = res.data.data.batchList;
                for (let i in batchLista) {
                    batchLista[i].checked = false
                }
                that.setData({
                    batchList: batchList.concat(batchLista),
                    totalPage: res.data.totalPage
                })
                
            }

            wx.hideLoading({})

        })
    },

    //点击圆点多选
    // ischecked(e) {
    //     let that = this;
    //     let index = e.currentTarget.dataset.index;
    //     let batchList = that.data.batchList;

    //     if (batchList[index].checked) {
    //         batchList[index].checked = false;
    //     } else {
    //         batchList[index].checked = true;
    //     }
    //     that.setData({
    //         batchList: batchList
    //     })
    // },
    //点击圆点单选
    ischecked(e) {
        // debugger
        let that = this;
        let index = e.currentTarget.dataset.index;
        let batchList = that.data.batchList;
        for(let i in batchList) {
            if (i!=index ) {
                batchList[i].checked =false;
            }else {
                batchList[i].checked =true;
            }
        }

        that.setData({
            batchList: batchList
        })
    },


    //上传质检报告
    addbatch() {

        let that = this;
        let batchList = that.data.batchList;
        let batchIdList=[];

        for(let i in batchList) {
            if(batchList[i].checked) {
                batchIdList.push(batchList[i].id)  
            }
        } 
        wx.navigateTo({
            url: '../addbatch/addbatch?batchIdList=' + batchIdList,
        })
    },

    onHide(){
        let that = this;
        that.setData({
            batchList: '',
            pageNo:1,
            indexa:0,
        })
    }
})