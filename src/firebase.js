import firebase  from 'firebase';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyByTy738ZVCt4Y7EC6IwpXhmZtHL2Eq7yY",
    authDomain: "store-map-order.firebaseapp.com",
    databaseURL: "https://store-map-order.firebaseio.com",
    projectId: "store-map-order",
    storageBucket: "store-map-order.appspot.com",
    messagingSenderId: "632714102625",
    appId: "1:632714102625:web:3d06da00895ea6f8b16720",
    measurementId: "G-54Q6H6DDK1"
};
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const storage = firebase.storage()
const dbRef = fireDB.database().ref()

export {storage, dbRef as default}