// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Silhouettes {
	address payable Owner = payable(msg.sender);
	string public Name = 'Silhouettes';
	string public Symbol = 'SIL';
	uint256 Increment = 0;
	uint Fee = 0.002 ether;

	mapping(uint256 => PNG) public pngs;
	struct PNG{uint256 id; string hash; string tags; uint256 fee; address payable owner;}
	event Uploaded(uint256 id, string hash, string tags, uint256 fee, address payable owner);
	event Payed(uint256 id, string hash, string tags, uint256 fee, address payable owner);

	constructor() {}
	function upload(string memory _hash, string memory _tags) public {
		require(msg.sender != address(0));
		require(bytes(_hash).length > 0);
		require(bytes(_tags).length > 0);
		Increment++;
		pngs[Increment] = PNG(Increment, _hash, _tags, Fee, Owner);
		emit Uploaded(Increment, _hash, _tags, Fee, Owner);
	}
}