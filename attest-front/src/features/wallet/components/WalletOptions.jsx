import React from "react";
import { useNavigate } from "react-router-dom";
function WalletOptions() {

    const firstStyle = "border-2 border-black border-b-0 rounded-t-lg p-4";
    const middleStyle = "border-2 border-black border-b-0 p-4";
    const lastStyle = "border-2 border-black rounded-b-lg p-4 text-center";
    const navigate = useNavigate();

    const navigateToLogin = (walletType) => {
        navigate('/login', { state : { walletType: walletType } });
    }

    return (
        <div>
            <ul>
                <li className={firstStyle} onClick={() => navigateToLogin("metamask")}>
                    Metamask
                </li>
                <li className={middleStyle}>
                    Coinbase Wallet
                </li>
                <li className={middleStyle}>
                    WalletConnect
                </li>
                <li className={middleStyle}>
                    Phantom
                </li>
                <li className={lastStyle}>
                    Show more options
                </li>
            </ul>
        </div>
    );
}

export default WalletOptions;