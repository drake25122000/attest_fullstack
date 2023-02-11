import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { getWalletAddress } from "../../utils/web3-client";
import { useAuth } from "../../context/auth-context";

function LoginView() {
    const [form, setForm] = useState({});
    const [walletAddress, setWalletAddress] = useState();
    const location = useLocation();
    const auth = useAuth();

    const walletAddressFunctions = {
        "metamask" : getWalletAddress
    }
    
    useEffect(() => {
        async function getAddress() {
            const tempWalletAddress = await walletAddressFunctions[location.state.walletType]();
            setWalletAddress(tempWalletAddress);
        }
        getAddress();
    }, [])
    

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        });
    }
    
    const onSubmit = async () => {

        try {
            await auth.login(walletAddress, form.password);
        } catch (error) {
            
        }
    }

    return(
        <div className="flex justify-center">
            <div className="flex flex-col justify-center md:w-1/2 lg:w-1/3 border-2 border-black m-4 p-5">
                <div className="text-center">
                    Login
                </div>
                <div className="text-start my-2 text-ellipsis overflow-hidden">
                    { walletAddress }
                </div>
                <TextField id="outlined-basic" label="Password" name="password" type='password' onChange={handleChange} variant="outlined" />
                <button className="bg-blue-500 mt-5 p-2" onClick={onSubmit}>Login</button>
            </div>
        </div>
    );
}

export default LoginView;