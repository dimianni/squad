import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Safe to store on client side
const firebaseConfig = {
    apiKey: "AIzaSyCkodSHuCKj-yrba7kPayoeC46ePlJq2Wg",
    authDomain: "auth-development-93ce9.firebaseapp.com",
    projectId: "auth-development-93ce9",
    storageBucket: "auth-development-93ce9.appspot.com",
    messagingSenderId: "889600646066",
    appId: "1:889600646066:web:8d4276776d25040218e2ab"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);