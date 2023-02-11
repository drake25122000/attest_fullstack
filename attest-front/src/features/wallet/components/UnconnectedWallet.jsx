import React from "react";
import WalletOptions from "./WalletOptions";

function UnconnectedWallet() {

    return (
        <div>
            <div className="my-4">My Wallet</div>
            <div className="my-4">Connect with one of our available wallet providers or create a new one.</div>
            <WalletOptions />
        </div>
    );
}

export default UnconnectedWallet;