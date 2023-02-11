import React from "react";
import attest_logo  from "../../../assets/images/attest_logo3.png";
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to="/home" className="flex flex-row items-center">
            <img src={attest_logo} className="xs:h-10 lg:h-10 mr-2" alt="" />
            Attest
        </Link>
    )
}

export default Logo;