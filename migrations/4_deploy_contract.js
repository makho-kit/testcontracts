const TokenSale = artifacts.require("./TokenSale.sol");
const TakToken = artifacts.require("./TakToken.sol");

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
  PRIVATE: "0xcC37671cD84a8F4ae1506917e4D6cC8a16968a5b",
  TEAM: "0x67C27e8999Fb4d8385Db0e7DD00D71E7f334B41d",
  FUND: "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"
}

module.exports = function(deployer, network, accounts) {
  const SALE = accounts[8];
  const tokenWallet = SALE;
  const fundWallet = WALLETS.FUND;
  const tokenAllowance = 250000;
  const RATE = 250;

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
