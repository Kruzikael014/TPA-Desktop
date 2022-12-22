import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
            apiKey: "AIzaSyCkP0PdZ8P1E2nOjfBsd_HHIPXNwNO1D_0",
            authDomain: "tpa-desk-65f9d.firebaseapp.com",
            projectId: "tpa-desk-65f9d",
            storageBucket: "tpa-desk-65f9d.appspot.com",
            messagingSenderId: "954591942734",
            appId: "1:954591942734:web:7855aa3f48a5e62b97cb1f",
            measurementId: "G-J64RF8L3BN"
          };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)