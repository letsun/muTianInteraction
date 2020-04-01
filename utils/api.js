var dev = 'http://192.168.1.68:8080/mtkj-mobile';//本地
var dev1= 'http://192.168.1.68:8080/mtkj-manage';//本地
 //var dev = 'http://192.168.1.11:8080/mtkj-mobile';//本地
var test = 'https://mut.lxcyhd.com';//测试
var test1 = 'https://mut.lxcyhd.com/manage';//测试
var ip = test;
var ip1 = test1;

var api = {
  getProduceCheckOpenid: ip + '/wechat/getProduceCheckOpenid', //获取openId
  oaLogin: ip + '/api/customer/oaLogin',//登录
  getBatchList: ip + '/api/check/produceBatch/getBatchList', //批次列表
  getProductLevelList: ip + '/api/check/produceBatch/getProductLevelList', //产检等级
  saveBatchCheck: ip + '/api/check/produceBatch/saveBatchCheck', //上传质检报告
  saveCheckItem: ip + '/api/check/produceBatch/saveCheckItem',  //保存质检项明细
  upload: ip1 + '/image/upload', //上传

  getProducts: ip + '/api/check/produceBatch/getProducts', //产品列表
  getProduceLines: ip + '/api/check/produceBatch/getProduceLines', //产线列表
  getFactorys: ip + '/api/check/produceBatch/getFactorys', //工厂列表
  checkBatchNo: ip + '/api/check/produceBatch/validBatchNo', //校验批次号是否重复
  getProduceBatchDetail: ip + '/api/check/produceBatch/getProduceBatchDetail',//获取生产批次详情

}


module.exports = api;
