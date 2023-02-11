// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, getDoc, setDoc, getDocs, query } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6xRU7qb0qSdfvhJy3SoG6WWvbVoclhmo",
  authDomain: "attest-7b352.firebaseapp.com",
  projectId: "attest-7b352",
  storageBucket: "attest-7b352.appspot.com",
  messagingSenderId: "472553597560",
  appId: "1:472553597560:web:f0d502fe79668cad7a9b8d",
  measurementId: "G-2DTTM1Z0QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

const db = getFirestore(app);
const userRef = collection(db, "usersDetails");
const listingRef = collection(db, "listings");

async function getUser(id) {
  const userDoc = doc(db, "usersDetails", id);
  const data = await getDoc(userDoc);

  return data;
}

async function addNewUser(id, data) {
  await setDoc(doc(userRef, id), data);
}

async function getCertificates(id) {
  const certificateDoc = doc(db, "certificates", id);
  const certificates = await getDoc(certificateDoc)

  return certificates;
}

async function getListings() {
  const q = query(listingRef);
  const querySnapshot = await getDocs(q);
  let listingList = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    listingList.push(doc.data());
  });
  
  return listingList;
}

async function listProduct(item, imageUrls, address, id, listing_id) {
  // producDict = {
  //   address : 
  //   id :
  //   images :
  //   condition :
  //   price :
  //   stock :
  //   description :
  //   size :
  //   weight : 
  // }
  listing_id = parseInt(listing_id._hex, 16) / 1E16 + "";
  const size = {
    width : item.width,
    length : item.length,
    height : item.height
  }
  console.log("Here fbc : ", imageUrls["Cover Image"]);
  const producDict = {
    listing_id: listing_id,
    address : address,
    id : id,
    images : imageUrls,
    condition : item.condition,
    price : item.price,
    stock : item.stock,
    description : item.productDescription,
    size : size,
    weight : item.weight,
  }

  console.log(producDict)
  await setDoc(doc(listingRef, listing_id), producDict);
}

export { getUser, addNewUser, getCertificates, storage, listProduct, getListings };