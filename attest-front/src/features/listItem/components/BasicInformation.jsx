import React , { useRef } from "react";
import ImageUploader from "./ImageUploader";

function BasicInformation({handleChange, images, setImages}) {

    return (
        <div className="border-2 border-gray-200 drop-shadow-lg p-2">
            Basic Information
            <div className="grid grid-cols-12 items-start mt-2">
                <div className="col-span-3 text-right mr-4">
                    Product Description
                </div>
                <textarea className="col-span-9 w-full p-1" name="productDescription" onChange={handleChange} rows={5} />
            </div>
            <div className="grid grid-cols-12 items-start mt-4">
                <div className="col-span-3 text-right mr-4">
                    Product Images
                </div>
                <div className="col-span-9 grid justify-items-center xs:grid-cols-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5">
                    <ImageUploader title="Cover Image" images={images} setImages={setImages}/>
                    <ImageUploader title="Image 1" images={images} setImages={setImages}/>
                    <ImageUploader title="Image 2" images={images} setImages={setImages}/>
                    <ImageUploader title="Image 3" images={images} setImages={setImages}/>
                    <ImageUploader title="Image 4" images={images} setImages={setImages}/>
                    <ImageUploader title="Image 5" images={images} setImages={setImages}/>
                    <ImageUploader title="Image 6" images={images} setImages={setImages}/>
                    <ImageUploader title="Image 7" images={images} setImages={setImages}/>
                </div>

            </div>
        </div>
    );
}

export default BasicInformation;