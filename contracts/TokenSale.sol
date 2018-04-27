import "zeppelin-solidity/contracts/crowdsale/emission/AllowanceCrowdsale.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";
pragma solidity ^0.4.18;

contract TokenSale is Ownable, AllowanceCrowdsale {

  uint public tokensSold = 0;

  function TokenSale(
   ERC20 _token,
   address _tokenWallet,
   address _wallet,
   uint256 _rate
  )
  public
   Crowdsale(_rate, _wallet, _token)
   AllowanceCrowdsale(_tokenWallet)
  {
   }
}
