//var dev = 'http://192.168.1.68:8080/mtkj-mobile';//本地

var dev = 'http://192.168.1.11:8080/mtkj-mobile';//本地
var dev1= 'http://192.168.1.11:8080/mtkj-manage';//本地
var test = 'https://mut.lxcyhd.com';//测试
var test1 = 'https://mut.lxcyhd.com/manage';//测试

var pro = 'https://sqt.pd-kj.com/';//测试
var pro1 = 'https://sqt.pd-kj.com/manage';//测试
var ip = pro;
var ip1 = pro1;

var api = {
  getProduceCheckOpenid: ip + '/wechat/getProduceCheckOpenid', //获取openId
  oaLogin: ip + '/api/customer/oaLogin',//登录
  getBatchList: ip + '/api/check/produceBatch/getBatchList', //批次列表
  getProductLevelList: ip + '/api/check/produceBatch/getProductLevelList', //产检等级
  saveBatchCheck: ip + '/api/check/produceBatch/saveBatchCheck', //上传质检报告
  saveBatchNotCheck: ip + '/api/check/produceBatch/saveBatchNotCheck', //新增批次(没有质检图)
  saveCheckItem: ip + '/api/check/produceBatch/saveCheckItem',  //保存质检项明细
  upload: ip1 + '/image/upload', //上传

  getProducts: ip + '/api/check/produceBatch/getProducts', //产品列表
  getProduceLines: ip + '/api/check/produceBatch/getProduceLines', //产线列表
  getFactorys: ip + '/api/check/produceBatch/getFactorys', //工厂列表
  checkBatchNo: ip + '/api/check/produceBatch/validBatchNo', //校验批次号是否重复
  getProduceBatchDetail: ip + '/api/check/produceBatch/getProduceBatchDetail',//获取生产批次详情

  checkLoginOut: ip + '/api/customer/checkLoginOut',//退出登录

}


module.exports = api;
