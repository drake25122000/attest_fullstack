import React from "react";
import { Link } from "react-router-dom"; 
import { useAuth } from "../../../context/auth-context";

function ProfileDropDown({setProfileDropdown}) {
    const auth = useAuth();

    const first = "p-4 border-b-2 bg-white";
    const middle = "p-4 border-b-2 bg-white"
    const last = "p-4 bg-white rounded-b-lg"
    return (
        <div className="z-50 absolute right-0 mt-10 mr-1 drop-shadow-xl w-56 text-left" onMouseEnter={() => setProfileDropdown(true)} onMouseLeave={() => setProfileDropdown(false)}>
            <div className=" text-transparent bg-transparent h-7"></div>
            <Link to="/profile">
                <div className={first} onClick={() => setProfileDropdown(false)}>
                    Profile
                </div>
            </Link>
            
            <div className={middle}>
                Favourites
            </div>
            <div className={middle}>
                Watchlist
            </div>
            <div className={middle}>
                My Collections
            </div>
            <div className={middle}>
                Settings
            </div>
            <div className={last} onClick={auth.logout}>
                Log Out
            </div>
        </div>
    );
}

export default ProfileDropDown;