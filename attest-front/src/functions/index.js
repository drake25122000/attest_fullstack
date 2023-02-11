const sigUtil = require('@metamask/eth-sig-util');
const functions = require('firebase-functions');
// The Firebase Admin SDK to access Firestore.
const firebaseAdmin = require('firebase-admin');

const corsLib = require('cors');

const admin = firebaseAdmin.initializeApp();

const cors = corsLib({
  origin: true,
});

exports.getNonceToSign = functions.region('asia-southeast1').https.onRequest( (request, response) => {
    cors(request, response, async () => {
        const body = JSON.parse(request.body)
        try {
            if (request.method !== 'POST') {
                return response.sendStatus(403);
            }
            if (!body.address) {
                return response.sendStatus(400);
            }
            // Get the user document for that address
            const userDoc = await admin
                .firestore()
                .collection('users')
                .doc(body.address)
                .get();
            if (userDoc.exists) {
                // console.log("User doc exists");
                // The user document exists already, so just return the nonce
                const existingNonce = await userDoc.data()?.nonce;
                return response.status(200).send({nonce: existingNonce});
            } else {
                // console.log("User doc doesn't exist");
                // The user document does not exist, create it first
                const generatedNonce = Math.floor(Math.random() * 1000000).toString();
                // Create an Auth user
                const createdUser = await admin.auth().createUser({
                    uid: body.address,
                });
                // Associate the nonce with that user
                await admin.firestore().collection('users').doc(createdUser.uid).set({
                    nonce: generatedNonce,
                });
                // console.log(generatedNonce)
                return response.status(200).json({ nonce: generatedNonce });
            }
        } catch (err) {
            console.log(err);
            return response.sendStatus(500);
        }
    })
});

exports.verifySignedMessage = functions.region('asia-southeast1').https.onRequest(
    (request, response) =>
        cors(request, response, async () => {
            try {
                if (request.method !== 'POST') {
                    return response.sendStatus(403);
                }
                if (!request.body.address || !request.body.signature) {
                    return response.sendStatus(400);
                }
                const address = request.body.address;
                const sig = request.body.signature;
                // Get the nonce for this address
                const userDocRef = admin.firestore().collection('users').doc(address);
                const userDoc = await userDocRef.get();
                if (userDoc.exists) {
                    const existingNonce = userDoc.data()?.nonce;
                    // Recover the address of the account used to create the given Ethereum signature.
                    const recoveredAddress = sigUtil.recoverPersonalSignature({
                    data: `0x${toHex(existingNonce)}`,
                    signature: sig,
                    });
                    // See if that matches the address the user is claiming the signature is from
                    if (recoveredAddress === address) {
                        // The signature was verified - update the nonce to prevent replay attacks
                        // update nonce
                        await userDocRef.update({
                            nonce: Math.floor(Math.random() * 1000000).toString(),
                        });
                        // Create a custom token for the specified address
                        const firebaseToken = await admin.auth().createCustomToken(address);
                        // Return the token
                        return response.status(200).json({ token: firebaseToken });
                    } else {
                        // The signature could not be verified
                        return response.sendStatus(401);
                    }
                } else {
                    // console.log('user doc does not exist');
                    return response.sendStatus(500);
                }
            } catch (err) {
                console.log(err);
                return response.sendStatus(500);
            }
        })
);

const toHex = (stringToConvert) =>
  stringToConvert
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
