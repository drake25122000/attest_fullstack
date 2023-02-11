import React from "react";
import { Link } from "react-router-dom";

function MobileNavLinks({setWalletOpen}) {
    return (
        <div className='flex flex-col'>
            <Link className='my-2' to="/browse">
                Browse
            </Link>
            <Link className='my-2' to="/about">
                About
            </Link>
            <Link className='my-2' to="/help">
                Help
            </Link>
            <div className='my-2' onClick={setWalletOpen}>
                Connect Wallet
            </div>
        </div>
    );
}

export default MobileNavLinks;