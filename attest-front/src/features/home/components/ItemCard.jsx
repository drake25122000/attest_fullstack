import React from "react";

function ItemCard({item}) {

    return (
        <div className="border-gray-200 border-2 rounded-lg w-60 col-span-1 mr-3 mb-3">
            <div className="flex items-center h-64 border-2 border-gray-200 rounded-lg">
                <img src={item.image} className="rounded-lg" alt="" />
            </div>
            <div className="flex flex-col p-2">
                <div>   
                    {item.brand}
                </div>
                <div>
                    {item.model}
                </div>
                <div>
                    You have {item.balance}
                </div>
            </div>
        </div>
    );
}

export default ItemCard;