import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "../../../context/auth-context"; 
import { getWalletBalance } from '../../../utils/web3-client';

function ConnectedWallet() {
    const [balance, setBalance] = useState();
    const user = useUser();
    const clientAuth = useAuth();

    useEffect( () => {
        getWalletBalance(user.walletAddress).then((bal) => setBalance(parseFloat(bal * 1.0) ));
    }, [user, clientAuth])

    return(
        <div>
            <div className="flex flex-row grid-cols-5 justify-between">
                <div className="col-span-3">
                    {user.username === "Unnamed" ? "My wallet" : user.username}
                </div>
                <div className="col-span-2 w-1/3 text-ellipsis overflow-hidden">
                    {user.id}
                </div>
            </div>
            <div className="border-2 p-4 text-center border-black rounded-2xl">
                <div>
                    Total Balance
                </div>
                <div>
                    {balance / 1E18} ETH
                </div>
            </div>
        </div>
    );
}

export default ConnectedWallet;