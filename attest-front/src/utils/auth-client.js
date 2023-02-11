import { client, LOCAL_STORAGE_KEY } from "./client.js";

const USER_API_URL = process.env.REACT_APP_USER_API;

function handleUserResponse(user) {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, user.token);
    // redirect user to homepage
    window.location.replace('/');
    return user;
}

async function loginWithWallet(walletAddress, password) {
    const res = await client(`${USER_API_URL}/signIn`, { body: { walletAddress, password } });

    handleUserResponse(res);
    return res;
}

async function signUp(username, password, walletAddress) {
    const res = await client(`${USER_API_URL}/signUp`, { body: { username, password, walletAddress } });

    return res;
}

function getToken() {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY);
}

async function loginWithToken() {
    const token = getToken();
    if (!token) {
        return Promise.resolve(null);
    }
    const res = await client(`${USER_API_URL}/signInWithToken`);
    
    return res;
}

async function logout() {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    // refreshes the page for the user
    window.location.assign(window.location);
}

const detectProvider = () => {
    let provider;
    if (window.ethereum) {
        provider = window.ethereum;
    } else if (window.web3) {
        provider = window.web3.currentProvider;
    } else {
        window.alert("No ethereum browser detected! Check out MetaMask");
    }
    return provider
}

const onLoginHandler = async () => {
    const provider = detectProvider();
    if (provider) {
        if (provider !== window.ethereum) {
            console.error("Not window.ethereum provider.");
        }
        return await provider.request({
            method:"eth_requestAccounts",
        })
    }
    return provider;
};

export { onLoginHandler, loginWithWallet, loginWithToken, logout, signUp };