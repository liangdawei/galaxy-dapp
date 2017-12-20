var util = require("../../utils/util");
var helper = require("./helper");

exports.addInvoice = function (req, res, next) {
  //业务参数
  var no = util.isNull(req.body.no)?'':req.body.no;
  var code = util.isNull(req.body.code)?'':req.body.code;
  var amount = parseInt(req.body.amount).toString() == "NaN"?0:req.body.amount;
  var payer = util.isNull(req.body.payer)?'':req.body.payer;
  var payee = util.isNull(req.body.payee)?'':req.body.payee;
  var issuedDate = util.isNull(req.body.issuedDate)?0:util.formatDate.parse(req.body.issuedDate, 'yyyy-MM-dd') / 1000;
  var paymentDate = util.isNull(req.body.paymentDate)?0:util.formatDate.parse(req.body.paymentDate, 'yyyy-MM-dd') / 1000;
  //合约参数
  var contracts = helper.assembleContract(req, res, next);
  var account = contracts.account;
  var RecptPmtStates = contracts.RecptPmtStates;
  var recptPmtStates = null;
  //合约调用
  RecptPmtStates.deployed().then(function(instance) {
    recptPmtStates = instance;
    return instance.addInvoice(no, code, amount, payer, payee, issuedDate, paymentDate, {from: account, gas:3141592});
  }).then(function(value) {
    res.status(200).send('success');
    // console.log('addInvoice返回结果（此处不返回数组下标而是返回交易对象） : '+value + '\n');
    // return recptPmtStates.getInvoicesLength.call().then(function(value) {
    //   console.log('InvoicesLength : ' + Number(value) + '\n');
    //   return recptPmtStates.getInvoice.call(value-1).then(function(result) {
    //     console.log('查询第' + value + '个发票信息-----start-----');
    //     console.log('no:'+util.hexCharCodeToStr(result[0].toString()));
    //     console.log('code:'+util.hexCharCodeToStr(result[1].toString()));
    //     console.log('amount:'+result[2]);
    //     console.log('payer:'+result[3]);
    //     console.log('payee:'+result[4]);
    //     console.log('issuedDate:'+util.formatDate.format(new Date(Number(result[5]) * 1000), 'yyyy-MM-dd'));
    //     console.log('paymentDate:'+util.formatDate.format(new Date(Number(result[6]) * 1000), 'yyyy-MM-dd'));
    //     console.log('查询第' + value + '个发票信息-----end-----' + '\n');
    //     res.status(200).send(result);
    //   });
    // });
  }).catch(function(e) {
    console.log(e);
    res.status(201).send(e.toString());
  });
};
