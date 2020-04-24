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

        appearance: ['合格', '不合格'],
        indexx: 0,

        small: ['合格', '不合格'],
        indexxx: 0,

        ind: 0,
        inda: 0,
        indaa: 0,

        uploadBy:'',
        granularity: '',
        sucroseContent: '',
        reducingSugar: '',
        conductanceAsh: '',
        wet: '',
        colorValue: '',
        turbidity: '',
        insolubleMatter: '',
        sulfurDioxide: '',
        weight: '',
        qualityLevel: '',
        url: '',
        // produceBatchNo:'',
        quantity:'0',
    },


    //types 0上传  1 为新增
    onLoad(options) {
        console.log(options)
        let that = this;
        let batchIdList = options.batchIdList;
        that.setData({
            batchIdList: batchIdList,
            types: options.types
        })
        if (options.types == 0) {
            that.getBatchList();
        } else {
            that.getProducts();
            that.getProduceLines();
            that.getFactorys()
        }
        that.getProductLevelList()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        console.log(app.globalData.name)
        let that = this;
        let date = util.formatTime(new Date());

        let time = util.formatTimea(new Date());
        that.setData({
            date: date,
            datea: date,
            time: time,
            uploadBy:app.globalData.name,
         
        })
    },


    //外观
    appearance(e) {
        let that = this;
        let index = e.detail.value;

        that.setData({
            indexx: index
        })
    },

    //气味
    small(e) {
        let that = this;
        let index = e.detail.value;
        that.setData({
            indexxx: index
        })
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

        })
    },


    //产检等级
    getProductLevelList() {
        let that = this;
        common.requestGet(api.getProductLevelList, {
            corpId: app.globalData.corpId
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
            console.log(res, '149')
            that.setData({
                url: res
            })
        })
    },


    //删除图片
    close() {
        let that = this;
        that.setData({
            url: ''
        })
    },

    //上传产检报告
    saveBatchCheck(e) {
        let that = this;
        let indexx = that.data.indexx;
        let indexxx = that.data.indexxx;
        let appearance = that.data.appearance[indexx];
        let colorValue = e.detail.value.colorValue;
        let conductanceAsh = e.detail.value.conductanceAsh;
        let granularity = e.detail.value.granularity;
        let insolubleMatter = e.detail.value.insolubleMatter;
        // let qualityLevel = e.detail.value.qualityLevel;
        let reducingSugar = e.detail.value.reducingSugar;
        let small = that.data.small[indexxx];
        let sucroseContent = e.detail.value.sucroseContent;
        let sulfurDioxide = e.detail.value.sulfurDioxide;
        let turbidity = e.detail.value.turbidity;
        let weight = e.detail.value.weight;
        let wet = e.detail.value.wet;

        // if (that.data.types == 0) {
        //     if (granularity == '') {
        //         common.showToast('粒度不能为空', 'none', res => { })
        //         return false;
        //     } else if (sucroseContent == '') {
        //         common.showToast('蔗糖分不能为空', 'none', res => { })
        //         return false;
        //     } else if (reducingSugar == '') {
        //         common.showToast('还原糖分不能为空', 'none', res => { })
        //         return false;
        //     } else if (conductanceAsh == '') {
        //         common.showToast('电导灰分不能为空', 'none', res => { })
        //         return false;
        //     } else if (wet == '') {
        //         common.showToast('干燥失重不能为空', 'none', res => { })
        //         return false;
        //     } else if (colorValue == '') {
        //         common.showToast('色值不能为空', 'none', res => { })
        //         return false;
        //     } else if (turbidity == '') {
        //         common.showToast('浑浊度不能为空', 'none', res => { })
        //         return false;
        //     } else if (insolubleMatter == '') {
        //         common.showToast('不溶于水杂质不能为空', 'none', res => { })
        //         return false;
        //     } else if (sulfurDioxide == '') {
        //         common.showToast('二氧化硫不能为空', 'none', res => { })
        //         return false;
        //     } else if (weight == '') {
        //         common.showToast('重量不能为空', 'none', res => { })
        //         return false;
        //     }

        //     if (that.data.uploadBy == '') {
        //         common.showToast('产检负责人不能为空', 'none', res => { })
        //         return false;
        //     }
        //     if (that.data.url == '') {
        //         common.showToast('请上传产检报告', 'none', res => { })
        //         return false;
        //     }
        // }


        let produceQualityItems = [{
            'index': 0,
            'result': appearance
        }, {
            'index': 1,
            'result': small
        }, {
            'index': 2,
            'result': granularity
        },
        {
            'index': 3,
            'result': sucroseContent
        },
        {
            'index': 4,
            'result': reducingSugar
        },
        {
            'index': 5,
            'result': conductanceAsh
        },
        {
            'index': 6,
            'result': wet
        },
        {
            'index': 7,
            'result': colorValue
        },
        {
            'index': 8,
            'result': turbidity
        },
        {
            'index': 9,
            'result': insolubleMatter
        },
        {
            'index': 10,
            'result': sulfurDioxide
        },
        {
            'index': 11,
            'result': weight
        },
        // {
        //     'index': 12,
        //     'result': qualityLevel
        // },
        ];




        let index = that.data.index;
        let levelList = that.data.levelList;
        let productCheck = {};

        if (levelList != '') {
            productCheck.level = levelList[index].name;
            productCheck.levelId = levelList[index].id;
        }

        productCheck.uploadBy = that.data.uploadBy;
        productCheck.uploadTime = that.data.date;
        productCheck.url = that.data.url;

        if (that.data.types == 0) {
            var batchIdList = that.data.batchIdList;
            batchIdList = batchIdList.split(",")
        } else {
            var batchIdList = '';
        }
        let productBatch = {};
        // var batchIdList = that.data.batchIdList;
        // batchIdList = batchIdList.split(",")

        var produceBatchNo = that.data.produceBatchNo;
        var quantity = that.data.quantity;


        // debugger
        if (that.data.types == 1) {
            if (produceBatchNo == '' || produceBatchNo == undefined) {
                common.showToast('批次号不能为空', 'none', res => { })
                return false;
            } 
            // else if (quantity == '' || quantity == undefined) {
            //     common.showToast('生产数量不能为空', 'none', res => { })
            //     return false;
            // }

            productBatch.corporationId = app.globalData.corpId;	        //糖企id	number	
            productBatch.factoryId = that.data.getFactorys[that.data.indaa].id;	                //工厂id	number	
            productBatch.batchNo = produceBatchNo;	       // 批次号	string	
            productBatch.produceLineId = that.data.getProduceLines[that.data.inda].id;	        //产线id	number	
            productBatch.produceTimeStr = that.data.datea + ' ' + that.data.time;	        //生产时间	string	
            productBatch.productId = that.data.getProducts[that.data.ind].id;	                //产品id	number	
            productBatch.quantity = quantity;     //生产数量
        } else {
            productBatch.id = batchIdList[0];
        }

        //that.data.qualityLevel != ''||
        if (that.data.granularity != '' || that.data.sucroseContent != '' || that.data.reducingSugar != '' || that.data.conductanceAsh != '' || that.data.wet != '' || that.data.colorValue != '' || that.data.turbidity != '' || that.data.insolubleMatter != '' || that.data.sulfurDioxide != '' || that.data.weight != '' || that.data.url!= '') {

            wx.request({
                url: api.saveBatchCheck,
                method: "POST",
                data: {
                    ids: batchIdList,
                    productCheck: productCheck,
                    produceQualityItems: produceQualityItems,
                    productBatch: productBatch
                },
                header: {
                    'Accept': 'application/json',
                    "content-type": "application/json"
                },
                success: (res) => {
                    if (res.data.status == 1) {
                        let pages = getCurrentPages();
                        let currPage = pages[pages.length - 1]; //当前页面
                        let prevPage = pages[pages.length - 2]; //上个页面
                        prevPage.setData({
                            indexa: 1
                        })

                        wx.navigateBack({})

                    } else {
                        common.showToast(res.data.msg, 'none', res => { })
                    }

                },
            })

        } else {
            //新增批次(没有质检图)
            wx.request({
                url: api.saveBatchNotCheck,
                method: "POST",
                data: {
                    productBatch: productBatch
                },
                header: {
                    'Accept': 'application/json',
                    "content-type": "application/json"
                },
                success: (res) => {
                    if (res.data.status == 1) {


                        wx.navigateBack({})
                    } else {
                        common.showToast(res.data.msg, 'none', res => { })
                    }

                },
            })
        }


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


    granularity(e) {
        let that = this;
        that.setData({
            granularity: e.detail.value
        })
    },
    sucroseContent(e) {
        let that = this;
        that.setData({
            sucroseContent: e.detail.value
        })
    },
    reducingSugar(e) {
        let that = this;
        that.setData({
            reducingSugar: e.detail.value
        })
    },
    conductanceAsh(e) {
        let that = this;
        that.setData({
            conductanceAsh: e.detail.value
        })
    },
    wet(e) {
        let that = this;
        that.setData({
            wet: e.detail.value
        })
    },
    colorValue(e) {
        let that = this;
        that.setData({
            colorValue: e.detail.value
        })
    },
    turbidity(e) {
        let that = this;
        that.setData({
            turbidity: e.detail.value
        })
    },
    insolubleMatter(e) {
        let that = this;
        that.setData({
            insolubleMatter: e.detail.value
        })
    },
    sulfurDioxide(e) {
        let that = this;
        that.setData({
            sulfurDioxide: e.detail.value
        })
    },
    weight(e) {
        let that = this;
        that.setData({
            weight: e.detail.value
        })
    },
    qualityLevel(e) {
        let that = this;
        that.setData({
            qualityLevel: e.detail.value
        })
    },

    canvas() {

        const that = this;
        const ctx = wx.createCanvasContext('firstCanvas');
        let height = 30;
        let top = 160; //顶部距离
        let textTop = 150 //头部距离顶部距离
        let Unitwidth = 70;  //单位宽度 
        let Unitleft = 140; //距离左边 

        let resultWidtg = 135; //理化结果宽度

        let resultleft = 210//理化结果距离左边 


        ctx.setFillStyle('#fff');
        ctx.fillRect(0, 0, 710, 1200)


        // that.roundRect(ctx, 10, 10, 345, 30, 0, '#F9F9F9', '#F9F9F9')
        ctx.setTextAlign('center');
        ctx.setFillStyle('#F9F9F9');
        ctx.fillRect(10, 160, 335, height)


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd')
        ctx.strokeRect(10, top, 130, height);
        let text1 = '检验项目';
        ctx.setFontSize(12);
        ctx.fillText(text1, 75, height + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(140, top, 70, height);
        let text2 = '单位';
        ctx.setFontSize(12);
        ctx.fillText(text2, 175, height + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(210, top, 135, height);
        let text3 = '理化结果';
        ctx.setFontSize(12);
        ctx.fillText(text3, 275, height + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(10, top + height, 35, 90);
        let text4 = '感官项目';
        ctx.setFontSize(12);
        that.fillTextWrap(ctx, text4, 28, top + 55, 7, 15);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(10, top + height, 35, 300);
        let text5 = '理化项目';
        ctx.setFontSize(12);
        that.fillTextWrap(ctx, text5, 28, top + 200, 7, 15)

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(45, top + height, 95, height);
        let text6 = '外观';
        ctx.setFontSize(12);
        ctx.fillText(text6, 92, height * 2 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(45, top + height * 2, 95, height);
        let text7 = '气味';
        ctx.setFontSize(12);
        ctx.fillText(text7, 92, height * 3 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(45, top + height * 3, 95, height);
        let text8 = '粒度≥80%';
        ctx.setFontSize(12);
        ctx.fillText(text8, 92, height * 4 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(45, top + height * 4, 95, height);
        let text9 = '蔗糖';
        ctx.setFontSize(12);
        ctx.fillText(text9, 92, height * 5 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(45, top + height * 5, 95, height);
        let text10 = '还原糖分≤';
        ctx.setFontSize(12);
        ctx.fillText(text10, 92, height * 6 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(45, top + height * 6, 95, height);
        let text11 = '电导灰分≤';
        ctx.setFontSize(12);
        ctx.fillText(text11, 92, height * 7 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(45, top + height * 7, 95, height);
        let text12 = '干燥失重≤';
        ctx.setFontSize(12);

        ctx.fillText(text12, 92, height * 8 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(45, top + height * 8, 95, height);
        let text13 = '色值≤';
        ctx.setFontSize(12);
        ctx.fillText(text13, 92, height * 9 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(45, top + height * 9, 95, height);
        let text14 = '浑浊度≤';
        ctx.setFontSize(12);
        ctx.fillText(text14, 92, height * 10 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(45, top + height * 10, 95, height);
        let text15 = '不溶于水杂质≤';
        ctx.setFontSize(12);
        ctx.fillText(text15, 92, height * 11 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(10, top + height * 11, 130, height);
        let text16 = '二氧化硫(以S02计)≤';
        ctx.setFontSize(12);
        ctx.fillText(text16, 75, height * 12 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(10, top + height * 12, 130, height);
        let text17 = '重量';
        ctx.setFontSize(12);
        ctx.fillText(text17, 75, height * 13 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(10, top + height * 13, 130, height);
        let text18 = '白砂糖等级';
        ctx.setFontSize(12);
        ctx.fillText(text18, 75, height * 14 + textTop);


        //单位
        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 1, Unitwidth, height)

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 2, Unitwidth, height)

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 3, Unitwidth, height)
        let Unittext1 = '%';
        ctx.fillText(Unittext1, 175, height * 4 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 4, Unitwidth, height)
        let Unittext2 = 'g/100g';
        ctx.fillText(Unittext2, 175, height * 5 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 5, Unitwidth, height)
        let Unittext3 = 'g/100g';
        ctx.fillText(Unittext3, 175, height * 6 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 6, Unitwidth, height)
        let Unittext4 = 'g/100g';
        ctx.fillText(Unittext4, 175, height * 7 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 7, Unitwidth, height)
        let Unittext5 = 'g/100g';
        ctx.fillText(Unittext5, 175, height * 8 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 8, Unitwidth, height)
        let Unittext6 = 'IU';
        ctx.fillText(Unittext6, 170, height * 9 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 9, Unitwidth, height)
        let Unittext7 = 'MAU';
        ctx.fillText(Unittext7, 175, height * 10 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 10, Unitwidth, height)
        let Unittext8 = 'mg/kg';
        ctx.fillText(Unittext8, 175, height * 11 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 11, Unitwidth, height)
        let Unittext9 = 'mg/kg';
        ctx.fillText(Unittext9, 175, height * 12 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 12, Unitwidth, height)
        let Unittext10 = 'T';
        ctx.fillText(Unittext10, 175, height * 13 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(Unitleft, top + height * 13, Unitwidth, height)



        let appearance = that.data.appearance[that.data.indexx];
        let colorValue = that.data.colorValue;
        let conductanceAsh = that.data.conductanceAsh;
        let granularity = that.data.granularity;
        let insolubleMatter = that.data.insolubleMatter;
        // let qualityLevel = that.data.qualityLevel;
        let reducingSugar = that.data.reducingSugar;
        let small = that.data.small[that.data.indexxx];
        let sucroseContent = that.data.sucroseContent;
        let sulfurDioxide = that.data.sulfurDioxide;
        let turbidity = that.data.turbidity;
        let weight = that.data.weight;
        let wet = that.data.wet;

        //理化结果
        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 1, resultWidtg, height);
        let resulttext1 = appearance;

        ctx.fillText(resulttext1, 275, height * 2 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 2, resultWidtg, height)
        let resulttext2 = small;
        ctx.fillText(resulttext2, 275, height * 3 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 3, resultWidtg, height)
        let resulttext3 = granularity;
        ctx.fillText(resulttext3, 275, height * 4 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 4, resultWidtg, height)
        let resulttext4 = sucroseContent;
        ctx.fillText(resulttext4, 275, height * 5 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 5, resultWidtg, height)
        let resulttext5 = reducingSugar;
        ctx.fillText(resulttext5, 275, height * 6 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 6, resultWidtg, height)
        let resulttext6 = conductanceAsh;
        ctx.fillText(resulttext6, 275, height * 7 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 7, resultWidtg, height)
        let resulttext7 = wet;
        ctx.fillText(resulttext7, 275, height * 8 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 8, resultWidtg, height)
        let resulttext8 = colorValue;
        ctx.fillText(resulttext8, 275, height * 9 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 9, resultWidtg, height)
        let resulttext9 = turbidity;
        ctx.fillText(resulttext9, 275, height * 10 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 10, resultWidtg, height)
        let resulttext10 = insolubleMatter;
        ctx.fillText(resulttext10, 275, height * 11 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 11, resultWidtg, height)
        let resulttext11 = sulfurDioxide;
        ctx.fillText(resulttext11, 275, height * 12 + textTop);


        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 12, resultWidtg, height)
        let resulttext12 = weight;
        ctx.fillText(resulttext12, 275, height * 13 + textTop);

        ctx.setFillStyle('#666');
        ctx.setStrokeStyle('#ddd');
        ctx.strokeRect(resultleft, top + height * 13, resultWidtg, height)

        let index = that.data.index;
        let levelList = that.data.levelList;
        let resulttext13 = levelList[index].name;

        ctx.fillText(resulttext13, 275, height * 14 + textTop);


        ctx.draw(false, function () {
            wx.canvasToTempFilePath({
                canvasId: 'firstCanvas',
                fileType: 'jpg',
                success: function (res) {
                    // 获得图片临时路径
                    let imageTempPath = res.tempFilePath
                    if (imageTempPath !== '') {
                        that.uploadFile(imageTempPath)
                    } else {
                        common.showToast('图片生成中', 'none', res => { })
                    }

                }
            })
        });


    },


    //上传图片
    uploadFile(imageTempPath) {
        wx.uploadFile({
            url: api.upload, //仅为示例，非真实的接口地址
            filePath: imageTempPath,
            name: 'file',
            formData: {
                type: '7'
            },
            header: {
                "Content-Type": "multipart/form-data"
            },
            success: res => {
                console.log(res)
                var resObj = JSON.parse(res.data);
                console.log(resObj)
                if (resObj.success == true) {
                    this.setData({
                        url: resObj.data
                    })

                } else {
                    // showToast(resObj.MESSAGE, 'none', (success) => {})
                }
            }
        })
    },


    //预览图片
    previewImage(e) {
        let url = e.currentTarget.dataset.url;
        console.log(url)

        wx.previewImage({
            urls: Array.of(url), // 需要预览的图片http链接列表
            current: Array.of(url)
        })

    },



    /**
     * 
     * 
     * 
     */

    //选择时间
    timea(e) {
        let that = this;
        that.setData({
            datea: e.detail.value
        })
    },

    //选择时分秒
    timeaa(e) {
        let that = this;
        that.setData({
            time: e.detail.value
        })
    },

    //产品列表
    getProducts(e) {
        let that = this;
        common.requestGet(api.getProducts, {
            corprationId: app.globalData.corpId
        }, res => {
            that.setData({
                getProducts: res.data.data
            })
        })
    },

    getProductsa(e) {
        let that = this;
        let index = e.detail.value;
        that.setData({
            ind: index
        })
    },

    //产线列表
    getProduceLines() {
        let that = this;
        common.requestGet(api.getProduceLines, {
            corprationId: app.globalData.corpId
        }, res => {
            that.setData({
                getProduceLines: res.data.data
            })
        })
    },

    getProduceLinesa(e) {
        let that = this;
        let index = e.detail.value;
        that.setData({
            inda: index
        })
    },



    //产线列表
    getFactorys() {
        let that = this;
        common.requestGet(api.getFactorys, {
            corprationId: app.globalData.corpId
        }, res => {
            that.setData({
                getFactorys: res.data.data
            })
        })
    },

    getFactorysa(e) {
        let that = this;
        let index = e.detail.value;
        that.setData({
            indaa: index
        })
    },

    //生产批号
    produceBatchNo(e) {
        let that = this;
        let produceBatchNo = e.detail.value;
        that.setData({
            produceBatchNo: produceBatchNo
        })

        if (that.data.types == 1) {
            that.checkBatchNo(produceBatchNo)
        }


    },


    //校验批次号是否重复
    checkBatchNo(produceBatchNo) {
        let that = this;
        common.requestGetf(api.checkBatchNo, {
            batchNo: produceBatchNo,
            corpId: app.globalData.corpId,

        }, res => {

        }, reg => {
            common.showToast(reg.data.msg, 'none', res => {
                that.setData({
                    produceBatchNo: ''
                })
            })
        })
    },


    //生产数量
    quantity(e) {
        let that = this;
        that.setData({
            quantity: e.detail.value
        })
    },

})