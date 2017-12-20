var path = require("path");
// web3-provider-engine
var ProviderEngine = require("web3-provider-engine");
var HookedWalletTxProvider = require('web3-provider-engine/subproviders/hooked-wallet-ethtx.js');
var injectMetrics = require('web3-provider-engine/test/util/inject-metrics');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");
// truffle-hdwallet-provider
var HDWalletProvider = require("truffle-hdwallet-provider");
// keythereum，可以生成加密json文件秘钥
var keythereum = require("keythereum");
// define contract
var contract = require('truffle-contract');
var recptPmtStates_artifacts = require('../../../build/contracts/RecptPmtStates.json');
var RecptPmtStates = contract(recptPmtStates_artifacts);
var web3 = new Web3();
// RPC方式
// web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545/"));
// IPC方式
// var net = require("net");
// web3.setProvider(new Web3.providers.IpcProvider('geth.ipc', new net.Socket()));

var util = require("../../utils/util");

exports.assembleContract = function (req, res, next) {
  // 16进制的以太坊账户地址，addressHex 如：0xc89b7cfab738102fdad8fe0b5db2f4275b823943
  var address = req.query.address;
  // 以太坊账户对应的私钥。 如：21bef07ebbe451167148fd1d8bec374d21f96a7187bbd9f7e39b0b3be8f1ebb6
  var privateKey = req.query.privateKey;
  // 采用加密keystore保存私钥。（UTC json file）
  var password = req.query.password;
  // 采用加密钱包保存私钥 HDWallet 12 word mnemonic
  var mnemonic = req.query.mnemonic;
  //钱包的账户数组下标
  var index = parseInt(req.query.index).toString() == "NaN"?0:req.query.index;
  // web3Provider地址，默认http://localhost:8545/，其他可选：
  // https://ropsten.infura.io/ 以太坊测试网络（Ropsten是三大公共测试网络之一，其他是Kovan和Rinkeby）
  // https://mainnet.infura.io 以太坊生产网络
  var providerUrl = util.isNull(req.query.providerUrl)?'http://localhost:8545/':req.query.providerUrl;

  //privateKey，password和mnemonic应在https下传输
  if(!util.isNull(privateKey)) {
    if(req.protocol === 'https') {
      web3.setProvider(new Web3.providers.HttpProvider(providerUrl));
      address = util.isNull(address)?web3.eth.accounts[index]:address;
      privateKey = new Buffer(privateKey, 'hex');

      var engine = initProviderEngine(address, privateKey);

      RecptPmtStates.setProvider(engine);
    } else {
      res.status(403).send('please access from https');
    }
  } else if(!util.isNull(password)) {
    if(req.protocol === 'https') {
      web3.setProvider(new Web3.providers.HttpProvider(providerUrl));
      address = util.isNull(address)?web3.eth.accounts[index]:address;

      var datadir = path.resolve(path.resolve(__dirname), '../../');
      var keyObject = keythereum.importFromFile(address, datadir);
      var privateKey = keythereum.recover(password, keyObject);

      var engine = initProviderEngine(address, privateKey);

      RecptPmtStates.setProvider(engine);
    } else {
      res.status(403).send('please access from https');
    }
  } else if(!util.isNull(mnemonic)) {
    if(req.protocol === 'https') {
      var provider = new HDWalletProvider(mnemonic, providerUrl, index);
      address = provider.getAddress();
      RecptPmtStates.setProvider(provider);
    } else {
      res.status(403).send('please access from https');
    }
  } else {
    web3.setProvider(new Web3.providers.HttpProvider(providerUrl));
    address = util.isNull(address)?web3.eth.accounts[index]:address;
    RecptPmtStates.setProvider(web3.currentProvider);
  }
  // console.log(web3.fromWei(Number(web3.eth.getBalance(address)),"ether"));
  return { account: address, web3: web3, RecptPmtStates: RecptPmtStates };
};

function initProviderEngine(account, privateKey) {
  var provider  = injectMetrics(new HookedWalletTxProvider({
    getAccounts: function(cb) {
      cb(null, [account])
    },
    getPrivateKey: function(address, cb) {
      cb(null, privateKey)
    },
  }));

  var engine = new ProviderEngine();
  engine.addProvider(provider);
  engine.addProvider(new Web3Subprovider(web3.currentProvider));
  engine.start();

  return engine;
}
