import React from "react";
import "./NumberInput.css";

function SalesInformation({handleChange}) {
    return (
        <div className="border-2 border-gray-200 drop-shadow-lg p-2 mt-4">
            Sales Information
            <div className="mx-20">
                <div className="grid grid-cols-6">
                    <div className="col-span-2 text-right mr-8">
                        Price
                    </div>
                    <div className="col-span-4">
                        <input type="number" name="price" onChange={handleChange} className="appearance-none" />
                    </div>
                </div>
                <div className="grid grid-cols-6 mt-2">
                    <div className="col-span-2 text-right mr-8">
                        Stock
                    </div>
                    <div className="col-span-4">
                        <input type="number" name="stock" onChange={handleChange} className="appearance-none" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SalesInformation;