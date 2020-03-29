// pages/addbatch/addbatch.js
const util = require("../../utils/util")
const app = getApp()
const api = require("../../utils/api.js")
const common = require("../../utils/common.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageSize: '20',
        pageNo: 1,
        index: 0,
        url: '',

        appearance: ['不合格', '合格'],
        indexx:0,

        small: ['不合格', '合格'],
        indexxx:0,
    },

    onLoad(options) {
        let that = this;
        let batchIdList = options.batchIdList;
        that.setData({
            batchIdList: batchIdList
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        let date = util.formatTime(new Date());
        that.setData({
            date: date
        })

        that.getBatchList();

        that.canvas();
    },


    //外观
    appearance(e) {
        let that = this;
        let index = e.detail.value;

        that.setData({
            indexx:index
        })
    },

    //气味
    small(e) {
        let that = this;
        let index = e.detail.value;
        that.setData({
            indexxx:index
        })
    },

    //保存质检明细
    saveCheckItem(e) {

        let that = this ;
        let appearance = that.data.indexx;
        let colorValue = e.detail.value.colorValue;
        let conductanceAsh = e.detail.value.conductanceAsh;
        let granularity = e.detail.value.granularity;
        let insolubleMatter = e.detail.value.insolubleMatter;
        let qualityLevel = e.detail.value.qualityLevel;
        let reducingSugar = e.detail.value.reducingSugar;
        let small =that.data.small.indexxxx;
        let sucroseContent = e.detail.value.sucroseContent;
        let sulfurDioxide = e.detail.value.sulfurDioxide;
        let turbidity = e.detail.value.turbidity;
        let weight = e.detail.value.weight;
        let wet = e.detail.value.wet;
    },
    

    //生产批次列表
    getBatchList() {
        let that = this;
        common.requestGet(api.getBatchList, {
            openId: app.globalData.openid,
            batchIdList: that.data.batchIdList,
            pageNo: that.data.pageNo,
            pageSize: that.data.pageSize,
            status: 2
        }, res => {
            that.setData({
                batchList: res.data.data.batchList,
                corpId: res.data.data.corpId
            })
            that.getProductLevelList()
        })
    },



    //产检等级
    getProductLevelList() {
        let that = this;
        common.requestGet(api.getProductLevelList, {
            corpId: that.data.corpId
        }, res => {
            that.setData({
                levelList: res.data.data.levelList
            })
        })
    },


    //选择产检等级
    levelList(e) {
        let that = this;
        let index = e.detail.value;
        that.setData({
            index: index
        })
    },

    //选择时间
    time(e) {
        let that = this;
        that.setData({
            date: e.detail.value
        })
    },

    //产检负责人
    uploadBy(e) {
        let that = this;
        let uploadBy = e.detail.value;
        that.setData({
            uploadBy: uploadBy
        })
    },


    //上传图片
    upload() {
        let that = this;
        common.chooseImage(res => {
                console.log(res,'149')
            that.setData({
                url:res
            })
        })
    },


    close(){
        let that = this;
        that.setData({
            url:''
        })
    },

    //新增产检报告
    saveBatchCheck() {
        let that = this;
        let batchIdList = that.data.batchIdList;
        let index = that.data.index;
        let levelList = that.data.levelList;

        if (that.data.uploadBy =='') {
            common.showToast('产检负责人不能为空','none',res=>{})
            return false;
        }

        if (that.data.url =='') {
            common.showToast('请上传产检报告','none',res=>{})
            return false;
        }

        let productCheck = {};
        productCheck.level = levelList[index].name;
        productCheck.uploadBy = that.data.uploadBy;
        productCheck.uploadTime = that.data.date;
        productCheck.url = that.data.url;
        batchIdList = batchIdList.split(",")
        

        
        wx.request({
            url: api.saveBatchCheck,
            method: "POST",
            data: {
                ids: batchIdList,
                productCheck: productCheck,
            },
            header: {
                'Accept': 'application/json',
                "content-type": "application/json"

            },

            success: (res) => {
                wx.navigateBack({})
            },
        })



    },
    // 文字换行
    fillTextWrap(ctx, text, x, y, maxWidth, lineHeight) {
        // 设定默认最大宽度
        const systemInfo = wx.getSystemInfoSync();
        const deciveWidth = systemInfo.screenWidth;
        // 默认参数
        maxWidth = maxWidth || deciveWidth;
        lineHeight = lineHeight || 20;
        // 校验参数
        if (typeof text !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
            return;
        }
        // 字符串分割为数组
        const arrText = text.split('');
        // 当前字符串及宽度
        let currentText = '';
        let currentWidth;
        for (let letter of arrText) {
            currentText += letter;
            currentWidth = ctx.measureText(currentText).width;
            if (currentWidth > maxWidth) {
                ctx.fillText(currentText, x, y);
                currentText = '';
                y += lineHeight;
            }
        }
        if (currentText) {
            ctx.fillText(currentText, x, y);
        }
    },

    canvas() {
        const that = this;
        const ctx = wx.createCanvasContext('firstCanvas');

        // that.fillTextWrap(ctx, str, 10, 350, 160, 20);

        // that.roundRect(ctx, 50, 50, boxWidth, boxHeight, bdRadius, bdBackground, bdColor)
        that.roundRect(ctx, 10, 10, 345, 0.5, 0, '', '#ddd')
        that.roundRect(ctx, 10, 30, 345, 0.5, 0, '', 'red')
        // that.roundRect(ctx, 10, 0, 345, 50, 0, '', 'red')
        // let text1 = '生产批号';
        // ctx.setFontSize(12);
        // ctx.setFillStyle('#666');
        // ctx.setTextAlign('left');
        // ctx.fillText(text1, 20, 20);


        // let text2 = '单位';
        // ctx.setFontSize(12);
        // ctx.setFillStyle('#666');
        // ctx.setTextAlign('left');
        // ctx.fillText(text2, 20, 40);

        ctx.draw(false, function () {
            wx.canvasToTempFilePath({
                canvasId: 'firstCanvas',
                fileType: 'jpg',
                success: function (res) {
                    // 获得图片临时路径
                    console.log(res, '8520');
                    that.setData({
                        imageTempPath: res.tempFilePath
                    });
                }
            })
        });
    },




    //画圆角边框
    roundRect(ctx, x, y, w, h, r, fillColor, strokeColor) {
        // 画圆角 ctx、x起点、y起点、w宽度、y高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
        // 开始绘制
        ctx.beginPath()

        // 绘制左上角圆弧 Math.PI = 180度
        // 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

        // 绘制border-top
        // 移动起点位置 x终点、y终点
        ctx.moveTo(x + r, y)
        // 画一条线 x终点、y终点
        ctx.lineTo(x + w - r, y)
        // ctx.lineTo(x + w, y + r)

        // 绘制右上角圆弧
        ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

        // 绘制border-right
        ctx.lineTo(x + w, y + h - r)
        // ctx.lineTo(x + w - r, y + h)

        // 绘制右下角圆弧
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

        // 绘制border-bottom
        ctx.lineTo(x + r, y + h)
        // ctx.lineTo(x, y + h - r)

        // 绘制左下角圆弧
        ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

        // 绘制border-left
        ctx.lineTo(x, y + r)
        // ctx.lineTo(x + r, y)

        if (fillColor) {
            // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
            ctx.setFillStyle(fillColor)
            // 对绘画区域填充
            ctx.fill()
        }

        if (strokeColor) {
            // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
            ctx.setStrokeStyle(strokeColor)
            // 画出当前路径的边框
            ctx.stroke()
        }
        // 关闭一个路径
        // ctx.closePath()

        // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore
        ctx.clip()
    },




})