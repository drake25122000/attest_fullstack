import React, { useEffect, useState } from "react";
import ItemCard from "../../home/components/ItemCard";
import { getCertificates } from "../../../utils/firebase-client";
import { getCertificateUri, getCertificateBalance } from "../../../utils/web3-client";
import { useMarketplace } from "../../../context/auth-context";

function Owned({user}) {
    
    const [items, setItems] = useState([]);
    const mp = useMarketplace();

    useEffect( () => {
        async function fetchCertificates() {
            let certs = await getCertificates(user.id);
            let tempItems = [];
            certs = certs.data().owned;
            for (let i = 0 ; i < certs.length; i++) {
                const certficateUri = await getCertificateUri(certs[i].address, certs[i].id);
                let res = await fetch(certficateUri);
                res = await res.json();
                let balance = await getCertificateBalance(certs[i].address, certs[i].id, user.id);
                balance = parseInt(balance._hex, 16)
                res.balance = balance
                tempItems.push(res);
            }

            setItems(tempItems);
        }
        fetchCertificates();
    } , []);

    return (
        <div>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {
                    items.map((item) => 
                        <ItemCard item={item} />
                    )
                }
            </div>
        </div>
    );
}   

export default Owned;