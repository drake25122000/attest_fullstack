import React, { useState } from "react";
import { ethers } from "ethers";
import { useEffect } from "react";
import { getListings } from "../../../utils/firebase-client";
import { getCertificateUri, getListedItem } from "../../../utils/web3-client";
import ListingCard from "./ListingCard";

function Listings() {
    
    const [listings, setListings] = useState([]);
    
    useEffect(() => {

        async function fetchListing() {

            const tempList = await getListings();
            let tempListings = [];
            for (let i = 0; i < tempList.length ; i++) {
                const listedItem = await getListedItem(parseInt(tempList[i].listing_id) + 1);
                const certficateUri = await getCertificateUri(tempList[i].address, tempList[i].id)
                let res = {}
                const metadata = await fetch(certficateUri);
                res.item = listedItem;
                res.listmetadata = tempList[i];
                res.metadata = await metadata.json();

                // let balance = await getCertificateBalance(certs[i].address, certs[i].id, user.id);
                // balance = parseInt(balance._hex, 16)
                // res.balance = balance
                tempListings.push(res);
            }
            setListings(tempListings);
        }

        fetchListing();
    }, [])
    

    return (
        <div className="grid grid-cols-4 mt-20">
            {
                listings.map((listing) => 
                    <ListingCard item={listing} />
                )
            }
        </div>
    );
}

export default Listings;