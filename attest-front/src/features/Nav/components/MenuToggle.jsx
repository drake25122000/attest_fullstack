import React from "react";
import "./MenuToggle.css";


function MenuToggle({isOpen, toggle}) {
    return (
        <div className= { isOpen ? "hamburger active my-4" : "hamburger my-4" }  onClick={toggle}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
    )
}

export default MenuToggle;