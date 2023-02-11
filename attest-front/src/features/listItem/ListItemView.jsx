import React, { useEffect, useState } from "react";
import BasicInformation from "./components/BasicInformation";
import SalesInformation from "./components/SalesInformation";
import Specification from "./components/Specification";
import Shipping from "./components/Shipping";
import { storage, listProduct } from "../../utils/firebase-client";
import { useLocation, useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from "firebase/storage";
import { list } from "../../utils/web3-client";

function ListItem() {

    const [form, setForm] = useState({});
    const [images, setImages] = useState({});
    const [pickedItem, setPickedItem] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
        
    let imageUrls = {};
    let urlsArray = [];

    useEffect(() => {
        if (location.state === null) {
            navigate("/listitem/pick");
        }
        
        const item = location.state.item;
        console.log(item);
        setPickedItem(item);

    }, []);

    function uploadImg(file, title, index) {
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on("state_changed",
            (snapshot) => { },
            (error) => {
            alert(error);
            },
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                imageUrls[title] = downloadURL;
                urlsArray.push(downloadURL)
            });
            }
        );
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let i = 0;
        for (let key of Object.keys(images)) {
            // uploadImage(images[key], addImageUrl(key));
            uploadImg(images[key], key, i);
            i++;
        }
        const listingId = await list(pickedItem.address, pickedItem.id, form.price, form.stock);
        await listProduct(form, imageUrls, pickedItem.address, pickedItem.id, listingId)
    };

    return (
        <div className="xs:mx-4 sm:mx-10 md:mx-30 lg:mx-40 xl:mx-60 my-4 z-0">
            <form onSubmit={handleSubmit}>
                <BasicInformation form={form} handleChange={handleChange} images={images} setImages={setImages} />
                <Specification item={pickedItem} handleChange={handleChange}/>
                <SalesInformation handleChange={handleChange}/>
                <Shipping handleChange={handleChange}/>
                <button
                    className="text-center bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 border border-orange-700 rounded mt-4"
                    type="submit"
                    >
                    Save and Publish
                </button>
            </form>
            
        </div>
    );
}

export default ListItem;