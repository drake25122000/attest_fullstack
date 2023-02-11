import React from "react";

function Shipping({handleChange}) {
    return (
        <div className="border-2 border-gray-200 drop-shadow-lg p-2 mt-4">
            <div>
                Shipping Details
            </div>
            <div className="mx-20">
                <div className="grid grid-cols-6">
                    <div className="col-span-2 text-right mr-8">
                        Weight
                    </div>
                    <div className="col-span-4">
                        <div className="flex flex-row mr-2 content-center">
                            <input type="number" name="weight" onChange={handleChange} className="w-20 p-1" />
                            <div className="bg-white drop-shadow-sm p-1">
                                kg
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-6 mt-2">
                    <div className="col-span-2 text-right mr-8">
                        Parcel Size
                    </div>
                    <div className="col-span-4">
                        <div className="grid grid-cols-3">
                            <div className="flex flex-row mr-2 content-center">
                                <input type="number" name="width" onChange={handleChange} className="w-20 p-1" />
                                <div className="bg-white drop-shadow-sm p-1">
                                    cm
                                </div>
                            </div>
                            <div className="flex flex-row mr-2 content-center">
                                <input type="number" name="length" onChange={handleChange} className="w-20 p-1" />
                                <div className="bg-white drop-shadow-sm p-1">
                                    cm
                                </div>
                            </div>
                            <div className="flex flex-row mr-2 content-center">
                                <input type="number" name="height" onChange={handleChange} className="w-20 p-1" />
                                <div className="bg-white drop-shadow-sm p-1">
                                    cm
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shipping;