import React from "react";
import { ethers } from "ethers";

function ListingCard({item}) {

    return (
        <div className="border-gray-200 border-2 rounded-lg w-60 col-span-1 mr-3 mb-3">
            <div className="flex items-center h-64 border-2 border-gray-200 rounded-lg">
                <img src={item.metadata.image} className="rounded-lg" alt="" />
            </div>
            <div className="flex flex-col p-2">
                <div>   
                    {item.metadata.brand}
                </div>
                <div>
                    {item.metadata.model}
                </div>
                <div>
                    {ethers.utils.formatEther(item.item.price)} ETH
                </div>
            </div>
        </div>
    );
}

export default ListingCard;