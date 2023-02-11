import Certificate from "./contract-abi/Certificate.json";
import Marketplace from "./contract-abi/Marketplace.json";
import { ethers } from "ethers";
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const mp_address = "0xd7328863e8d4b6F26bA50020253151633B0B5CBA";
const marketplace = new ethers.Contract(mp_address, Marketplace.abi, signer);

const getWalletAddress = async () => {
    let walletAddress = await web3.eth.requestAccounts();
    walletAddress = walletAddress[0];

    return walletAddress;
};

const getWalletBalance = async (walletAddress) => {
    const balance = await web3.eth.getBalance(walletAddress);
    return balance;
}

const getCertificateUri = async (address, id) => {
    const certificate = new ethers.Contract(address, Certificate.abi, signer);
    const uri = await certificate.uri(id);
    return uri;
};

const getCertificateBalance = async (address, id, owner) => {
    const certificate = new ethers.Contract(address, Certificate.abi, signer);
    const balance = await certificate.balanceOf(owner, id);
    return balance;
}

const getListedItem = async (listing_id) => {
    return await marketplace.items(listing_id);
}

const list = async (cert_address, cert_id, price, stock) => {
    const id = await marketplace.itemCount();
    const certificate = new ethers.Contract(cert_address, Certificate.abi, signer);
    await(await certificate.setApprovalForAll(marketplace.address, true)).wait()
    
    const listingPrice = ethers.utils.parseEther(price.toString())

    console.log("Set approval for all completed");
    console.log("Price : ", price);
    console.log("Listing price : ", listingPrice);
    console.log("Stock : ", parseInt(stock));
    console.log("Picked item id : ", cert_id);
    await(await marketplace.makeItem(certificate.address, parseInt(cert_id), listingPrice, parseInt(stock))).wait()
    console.log("This code is reached");
    return id;
};

export { getCertificateUri, getCertificateBalance, list, getListedItem, getWalletAddress, getWalletBalance };