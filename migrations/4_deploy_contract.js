const TokenSale = artifacts.require("./TokenSale.sol");
const TakToken = artifacts.require("./TakToken.sol");
// const abi = require('ethereumjs-abi');

async promise => {
  try {
    await promise;
    assert.fail('Expected revert not received');
  } catch (error) {
    const revertFound = error.message.search('revert') >= 0;
    assert(revertFound, `Expected "revert", got ${error} instead`);
  }
};

function ether (n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'));
}

const WALLETS = {
  // SALE: "0xf17f52151EbEF6C7334FAD080c5704D77216b732",
  PRIVATE: "0xcC37671cD84a8F4ae1506917e4D6cC8a16968a5b",
  TEAM: "0x67C27e8999Fb4d8385Db0e7DD00D71E7f334B41d",
  FUND: "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"
}

const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours:   function(val) { return val * this.minutes(60) },
  days:    function(val) { return val * this.hours(24) },
  weeks:   function(val) { return val * this.days(7) },
  years:   function(val) { return val * this.days(365)}
};
module.exports = function(deployer, network, accounts) {
  const SALE = accounts[8];
  const tokenWallet = SALE;
  const fundWallet = WALLETS.FUND;
  const tokenAllowance = 250000;
  const RATE = 250;
  // const CAP = ether(100);
  // const startTime = 1524785719;
  // const endTime =  startTime + duration.hours(5);

  let token, crowdsale
if (network === 'main') {
  return deployer.then(function () {
    return TakToken.at('0xd42debe4edc92bd5a3fbb4243e1eccf6d63a4a5d');
  }).then(function (instance) {
    token = instance;
    return TokenSale.new(token.address, tokenWallet, fundWallet, RATE);
  }).then(function (instance) {
    crowdsale = instance;
    token.approve(crowdsale.address, tokenAllowance, { from: tokenWallet });
    console.log('Token Address', token.address);
    console.log('Crowdsale Address', crowdsale.address);
    return true;
  });
} else {
  // Deploy all new set of contract
  return deployer.then(function () {
    return TakToken.deployed({ from: tokenWallet });
  }).then(function (instance) {
    token = instance;
    return TokenSale.new(token.address, tokenWallet, fundWallet, RATE);
  }).then(function (instance) {
    crowdsale = instance;
    token.approve(crowdsale.address, tokenAllowance, { from: tokenWallet });
    console.log('Token Address', token.address);
    console.log('Crowdsale Address', crowdsale.address);
    return true;
  });
}
};

// ERC20 _token,
// address _tokenWallet,
// address _wallet,
// uint256 _rate

//
//   return liveDeploy(deployer, accounts);
// };

// async function liveDeploy(deployer, accounts) {
//   const tokenWallet = WALLETS.SALE;
//   const fundWallet = WALLETS.FUND;
//   const tokenAllowance = 250;
//   const RATE = 100;
//   const CAP = ether(10);
//   const startTime = 1524781900;
//   const endTime =  startTime + duration.hours(5);
//   deployer.deploy(TokenSale, TakToken.address, tokenWallet, fundWallet, startTime, endTime, RATE, CAP)
//   const token = await TakToken.deployed;
//   token.approve(TokenSale.address, tokenAllowance, { from: tokenWallet });
// }
  // // .then( async () => {
  // //     const encoded = abi.rawEncode(['address', 'address', 'address', 'uint256', 'uint256', 'uint256', 'uint256'], [ TakToken.address, WALLETS.SALE, WALLETS.FUND, startTime, endTime, RATE, CAP]);
  // //     console.log('ENCODED: \n', encoded.toString('hex'));
  // })
  // ERC20 _token,
  // address _tokenWallet,
  // address _wallet,
  // uint256 _openingTime,
  // uint256 _closingTime,
  // uint256 _rate,
  // uint256 _cap
