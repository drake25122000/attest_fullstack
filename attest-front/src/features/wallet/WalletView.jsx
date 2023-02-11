import React, { useState } from "react";
import ConnectedWallet from "./components/ConnectedWallet";
import UnconnectedWallet from "./components/UnconnectedWallet";
import back_arrow from "../../assets/icons/back_arrow.png";
import { useMediaQuery } from 'react-responsive';
import { useUser } from "../../context/auth-context";

function WalletView({setWalletOpen}) {
    const [isConnectedWallet, setConnectedWallet] = useState(false);
    const isMobile = useMediaQuery({maxWidth: 500});
    const user = useUser();
    
    return (
        <div className="z-50 bg-gray-200 mt-[72px] py-4 px-6 transition-all ease-in-out absolute inset-y-0 right-0 w xs:w-auto md:w-96">
            <button onClick={setWalletOpen}> 
                <img src={back_arrow} className="h-5 mr-2" alt="" />
            </button>
            { !user && <UnconnectedWallet isMobile={isMobile} /> }
            { user && <ConnectedWallet isMobile={isMobile} />}
        </div>
    );
}

export default WalletView;