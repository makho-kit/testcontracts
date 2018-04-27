var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "essence mercy spice token speak push reflect hero kite dragon meat fetch";

module.exports = {
    solc: {
      optimizer: {
      enabled: true,
      runs: 200
      }
    },
    networks: {
        main: {
            network_id: 1,
            provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/nWFILKr9BUQmjLxorJEW'),
            // gas: 4700000,
            // gasPrice: 1000000000
        },
        rinkeby:{
            network_id:4,
            provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/nWFILKr9BUQmjLxorJEW'),
        },
        ropsten:{
            network_id:5,
            provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/nWFILKr9BUQmjLxorJEW'),
        },
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
        }
    }
};
