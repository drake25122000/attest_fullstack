import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/auth-context";
import { getCertificates } from "../../utils/firebase-client";
import { getCertificateUri, getCertificateBalance } from "../../utils/web3-client";
import ItemCard from "../home/components/ItemCard";

function ListItemPick() {

    const user = useUser();
    const navigate = useNavigate();
    const [owned, setOwned] = useState([]);

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
                res.id = certs[i].id;
                res.address = certs[i].address;
                tempItems.push(res);
            }

            setOwned(tempItems);
        }
        fetchCertificates();
    } , []);

    return (
        <div className="border-2 border-gray-200 z-0 drop-shadow-lg p-2 my-4 xs:mx-4 sm:mx-10 md:mx-30 lg:mx-40">
            Which item you want to list?
            <div className="grid justify-items-center mt-10 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {
                    owned.map((item) => 
                        <button className="text-left" onClick={() => navigate("/listitem/new", {state : { item : item } })}>
                            <ItemCard item={item} />
                        </button>
                    )
                }
            </div>
            
        </div>
    );
}

export default ListItemPick;