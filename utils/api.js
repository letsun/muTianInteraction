var dev = 'http://192.168.1.68:8080/mtkj-mobile';//本地
var dev1= 'http://192.168.1.68:8080/mtkj-manage';//本地
// var dev = 'http://192.168.1.11:8080/mtkj-mobile';//本地
var test = 'https://mut.lxcyhd.com';//测试
var test1 = 'https://mut.lxcyhd.com/manage';//测试
var ip = test;
var ip1 = test1;


var api = {
  getProduceCheckOpenid: ip + '/wechat/getProduceCheckOpenid', //获取openId
  oaLogin: ip + '/api/customer/oaLogin',//登录
  getBatchList: ip + '/api/check/produceBatch/getBatchList', //批次列表
  getProductLevelList: ip + '/api/check/produceBatch/getProductLevelList', //产检等级
  saveBatchCheck: ip + '/api/check/produceBatch/saveBatchCheck', //新增质检报告
  saveCheckItem: ip + '/api/check/produceBatch/saveCheckItem',  //保存质检项明细
  upload: ip1 + '/image/upload', //上传
}


module.exports = api;
