import React from "react";
import { Link } from "react-router-dom";
import user_profile from "../../../assets/icons/user_profile.png";
import wallet from "../../../assets/icons/wallet.png";

function NavLinks({setWalletOpen, setProfileDropdown, setBrowseDropdown}) {

    return (
        <div className='flex flex-row justify-between items-center'>
            <div className='mx-4 py-4' onMouseEnter={() => setBrowseDropdown(true)} onMouseLeave={() => setBrowseDropdown(false)}>
                <Link to="/browse"  >
                    Browse
                </Link>
            </div>
            <Link className='mx-4 py-4' to="/about">
                About
            </Link>
            <Link className='mx-4 py-4' to="/help">
                Help
            </Link>
            <Link className='mx-4 py-4' to="/listitem/pick">
                List
            </Link>
            <div className='mx-4 py-4' onMouseEnter={() => setProfileDropdown(true)} onMouseLeave={() => setProfileDropdown(false)}>
                <img src={user_profile} className="h-5" alt="" />
            </div>
            <div className='mx-4 py-4'>
                <div onClick={setWalletOpen} className="cursor-point">
                    <img src={wallet} className="h-8" alt="" />
                </div>
            </div>
        </div>
    );
}

export default NavLinks;