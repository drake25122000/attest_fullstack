import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";

const auth = getAuth();

const emulatorDomain = "http://localhost:5001/attest-7b352/asia-southeast1/"
const realDomain = "https://asia-southeast1-attest-7b352.cloudfunctions.net/"
const domain = true ? emulatorDomain : realDomain;

const toHex = (stringToConvert) =>
  stringToConvert
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');

async function signOutFunc() {
    return signOut(auth);
}

async function signInWithMetamask(wallet_address, web3) {

    const getNonceToSignUrl = domain + "getNonceToSign";
    const verifySignedMessageUrl = domain + "verifySignedMessage";
    fetch(getNonceToSignUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({address: wallet_address})
    }).then( async (response) => {
        console.log(response);
        return await web3.eth.personal.sign(`0x${toHex(response.nonce)}`, wallet_address, "password");
    }).then( async (sig) => {
        const res = await fetch(verifySignedMessageUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: {
                address: wallet_address,
                signature: sig,
            }
        })
        return res;
    }).then( async (response) => {
        await signInWithCustomToken(auth, response.token);
    });
}

export { signOutFunc, signInWithMetamask };