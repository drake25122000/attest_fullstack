import React, { useState } from "react";

function Specification({item, handleChange}) {

    const [condition, setCondition] = useState();

    const handleConditionChange = (e) => {
        if (condition === "New") {

        }
    }

    return (
        <div className="border-2 border-gray-200 drop-shadow-lg p-2 mt-4">
            <div>
                Specification
            </div>
            <div className="grid grid-cols-2 mx-5">
                <div>
                    <div className="grid grid-cols-6 w-full">
                        <div className="col-span-3 text-right mr-4">
                            Brand
                        </div>
                        <div className="col-span-3">
                            {item.brand}
                        </div>
                    </div>
                    <div className="grid grid-cols-6 w-full">
                        <div className="col-span-3 text-right mr-4">
                            Model
                        </div>
                        <div className="col-span-3">
                            {item.model}
                        </div>
                    </div>
                    <div className="grid grid-cols-6 w-full">
                        <div className="col-span-3 text-right mr-4">
                            Product Code
                        </div>
                        <div className="col-span-3">
                            {item.product_code}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-6 w-full">
                        <div className="col-span-3 text-right mr-4">
                            Condition
                        </div>
                        <div className="col-span-3">
                            <select onChange={(e) => setCondition(e.target.value)} defaultValue="" placeholder="Choose Condition" required={true}>
                                <option value="" disabled hidden>Choose here</option>
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-6 w-full">
                        <div className="col-span-3 text-right mr-4">
                            Rate Condition
                        </div>
                        <div className="col-span-3">
                            {
                                condition === "New" 
                                ? <input type="number" name="condition" onChange={handleChange} value="10" className="w-full p-0.5 rounded-sm" required={true} disabled={true} placeholder="0.0 - 10.0" />
                                : <input type="number" name="condition" onChange={handleChange} min="0" max="10" className="w-full p-0.5 rounded-sm" required={true} placeholder="0.0 - 10.0" disabled={condition == undefined}/> 
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-6 w-full">
                        <div className="col-span-3 text-right mr-4">
                            Retail Price
                        </div>
                        <div className="col-span-3">
                            {item.retail_price}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Specification;