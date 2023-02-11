import React from "react";

function HorizontalMenu() {
    
    const categories = ["Shoes", "Bags", "Watches", "Backpacks", "Wearable", "Outfits", "NFTS"]
    return (
        <div className="flex flex-row py-5 px-2 justify-center scroll-ml-6 overflow-x-auto overflow-visible ">
            {
                categories.map((e, i) => 
                <div className="mx-5" key={i}>
                    {e}
                </div>)
            }
        </div>
    );
}

export default HorizontalMenu;