import React from "react";
import { Link } from "react-router-dom";

function BrowseDropdown({setBrowseDropdown}) {

    const first = "p-4 border-b-2 bg-white";
    const middle = "p-4 border-b-2 bg-white";
    const last = "p-4 bg-white rounded-b-lg";
    return(
        <div className="z-50 absolute right-64 mt-10 mr-1 drop-shadow-xl w-56 text-left" onMouseEnter={() => setBrowseDropdown(true)} onMouseLeave={() => setBrowseDropdown(false)}>
            <div className=" text-transparent bg-transparent h-7"></div>
            <Link to="/profile">
                <div className={first} onClick={() => setBrowseDropdown(false)}>
                    Sneakers
                </div>
            </Link>
            
            <div className={middle}>
                Bags
            </div>
            <div className={middle}>
                Watches
            </div>
            <div className={middle}>
                Apparels
            </div>
            <div className={last}>
                Jewellery
            </div>
        </div>
    );
}

export default BrowseDropdown;