var dev = 'http://192.168.1.11:8080/mtkj-mobile';//本地
var test = 'https://mut.lxcyhd.com';//测试
var ip = test;

var api = {
  getCheckOpenidByCode: ip + '/wechat/getCheckOpenidByCode', //获取openId
}


module.exports = api;
// module.exports = ip;