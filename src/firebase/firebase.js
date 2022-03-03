// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNSUQZ9wRqpbaP41psWQ2UvjoUujAtHjI",
  authDomain: "realtime-chat-32a39.firebaseapp.com",
  projectId: "realtime-chat-32a39",
  storageBucket: "realtime-chat-32a39.appspot.com",
  messagingSenderId: "862720087205",
  appId: "1:862720087205:web:dbb2a0ac8e0d2bb302694c",
  measurementId: "G-SFMJ71GW7C",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const db = getFirestore()
export const auth = getAuth()
