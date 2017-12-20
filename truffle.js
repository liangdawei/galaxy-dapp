
// HD Wallet-enabled Web3 provider. Use it to sign transactions for addresses derived from a 12-word mnemonic.
// wallet_hdpathh：m/44'/60'/0'/0/
var HDWalletProvider = require("truffle-hdwallet-provider");
// 12 word mnemonic
var mnemonic = "dash gym rural begin clown rather primary oil squirrel voyage helmet gorilla";
var provider_url = "https://ropsten.infura.io/";
var provider = new HDWalletProvider(mnemonic, provider_url);
// Or, alternatively pass in a zero-based address index.
// var provider = new HDWalletProvider(mnemonic, provider_url, 1);

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
    ropsten: {
      provider: provider,
      gas: 4500000,
      network_id: 3
    }
  }
}
