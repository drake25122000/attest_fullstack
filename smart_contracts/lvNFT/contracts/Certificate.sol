// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Certificate is ERC1155, Ownable {
    string private _tokenURI;
    uint256 private idCount = 1;

    // Mapping from idcount to tokenid
    mapping(uint256 => uint256) public tokenIds;
    
    // Mapping from tokenid to count
    mapping(uint256 => uint256) public counts; 
    
    // Mapping for token supply
    mapping(uint256 => uint256) public tokenSupply;

    // Mapping for tokenUri for each tokenid
    mapping(uint256 => string) private tokenURIs;


    constructor() ERC1155("https://gateway.pinata.cloud/ipfs/") {
        
    }

    function _setURI(string memory newuri) internal override virtual {
        _tokenURI = newuri;
    }

    // /**
    //  * @dev Sets `tokenURI` as the tokenURI of `tokenId`.
    //  */
    function uri(uint256 tokenId) public override view virtual returns (string memory) {
        require( _exists(tokenId) , "Token id doesn't exist");
        return tokenURIs[tokenId];
    }

    function create(
        uint256 id,
        uint256 supply,
        string memory _uri
    ) public onlyOwner returns (uint256) {
        require( !_exists(id) , "token _id already exists");

        if (bytes(_uri).length > 0) {
            tokenURIs[id] = _uri;
            emit URI(_uri, id);
        }

        _mint(msg.sender, id, supply, "");

        tokenIds[idCount] = id;
        idCount++;
        tokenSupply[id] = supply;
        return id;
    }

    /**
    * @dev Returns whether the specified token exists by checking to see if it has a creator
    * @param _id uint256 ID of the token to query the existence of
    * @return bool whether the token exists
    */
    function _exists(
        uint256 _id
    ) internal view returns (bool) {
        return tokenSupply[_id] != 0;
    }

}