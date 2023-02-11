import React, { useRef, useState } from "react";
import "./ImageUploader.css";

function ImageUploader({title, images, setImages}) {

    const [image, setImage] = useState(null);
    const imageInput = useRef(null);
  
    const handleClick = (e) => {
        e.preventDefault();
        imageInput.current.click();
    }

    const handleChange = (e) => {
        const image = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        };

        reader.readAsDataURL(image);

        setImages({
            ...images,
            [title]: image,
        });
    }
    
    const uploadEmailComponent = () => {
        return (
            <div className="flex w-20 h-20 border-blue-200 border-2 border-dotted items-center justify-center">
                <div className="flex items-center justify-center w-8 h-8 border-blue-200 border-2 rounded-full">
                    <span className="w-4 h-0.5 bg-slate-200 block bar1"></span>
                    <span className="w-4 h-0.5 bg-slate-200 block bar2"></span>
                </div>
            </div>
        )
    };

    return (
        <div className="flex flex-col text-center text-sm mr-4 col-span-1 mb-2">
            <button onClick={handleClick}>
                { 
                    image === null 
                    ? uploadEmailComponent()
                    : <img src={image} className="w-20 h-20" alt="" />
                }
            </button> 
            <input type="file" ref={imageInput} className="hidden" name={title} onChange={handleChange} required={title === "Cover Image"}/>
            <div>
                {title}
            </div>
        </div>
    );
}

export default ImageUploader;