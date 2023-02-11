// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract Marketplace is ReentrancyGuard, ERC1155Holder {

    address payable public immutable feeAccount;
    uint public immutable feePercent;
    uint public itemCount;

    struct Item {
        uint itemId;
        IERC1155 certificate;
        uint tokenId;
        uint price;
        address payable seller;
        uint stock;
    }

    event Offered (
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );

    event Bought (
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    mapping(uint => Item) public items;

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItem(IERC1155 certificate, uint tokenId, uint price, uint amount) external nonReentrant {
        require(price > 0, "Price must be greater than zero");
        
        itemCount++;

        certificate.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

        items[itemCount] = Item(
            itemCount,
            certificate,
            tokenId,
            price,
            payable(msg.sender),
            amount
        );      

        emit Offered(
            itemCount,
            address(certificate),
            tokenId,
            price,
            msg.sender
        );
    }

    function purchaseItem(uint itemId, uint256 amount) external payable nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        
        uint totalPrice = getTotalPrice(itemId) * amount;
        Item storage item = items[itemId];
        require(itemId > 0 && itemId <= itemCount, "Item doesn't exist");
        require(msg.value >= totalPrice, "Not enough ether to cover item price and market fee");
        require(item.stock > 0, "Item already sold");

        item.seller.transfer(item.price);
        item.stock--;
        item.certificate.safeTransferFrom(address(this), msg.sender, item.tokenId, amount, "");
        emit Bought(
            itemId,
            address(item.certificate),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    function getTotalPrice(uint itemId) view public returns(uint) {
        return items[itemId].price * (100 * feePercent)/100;
    }
}