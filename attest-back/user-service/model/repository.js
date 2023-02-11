// Import the functions you need from the SDKs you need
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import 'dotenv/config';

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG2);

initializeApp({
    credential: cert(serviceAccount)
});
  
const db = getFirestore();

export async function addUser(username, password, email, walletAddress) {
    await db.collection('users').doc(walletAddress).set({
        email: email,
        username: username,
        password: password
    });
}

export async function getUser(walletAddress) {
    const userRef = db.collection('users').doc(walletAddress);
    const doc = await userRef.get();
    return doc._fieldsProto;
}

