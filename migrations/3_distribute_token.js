const TakToken = artifacts.require("./TakToken.sol");

const WALLETS = {
  SALE: "0x3d54AA4cA8BE1a2570e5e8aA122c91e298aE019d",
  PRIVATE: "0xcC37671cD84a8F4ae1506917e4D6cC8a16968a5b",
  TEAM: "0x67C27e8999Fb4d8385Db0e7DD00D71E7f334B41d",
  FUND: "0x27dab5f4eb22AAab0db5D27ced89ddf587940f2f"
}

module.exports = async (deployer, network) => {
    deployer.then(async () => {
        const asset = await TakToken.deployed();
        const totalSupply = await asset.totalSupply();

        const SALE_TOKENS = totalSupply.mul(0.25);
        const PRIVATE_TOKENS = totalSupply.mul(0.25);
        const TEAM_TOKENS = totalSupply.mul(0.50);

        const targets = [WALLETS.SALE, WALLETS.PRIVATE, WALLETS.TEAM];
        const tokens = [SALE_TOKENS, PRIVATE_TOKENS, TEAM_TOKENS];

        await asset.massTransfer(targets, tokens);
    })
}
