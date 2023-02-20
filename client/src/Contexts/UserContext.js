import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const UserContext = createContext();
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
const auth = getAuth();

export function useAuth() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [curUser, setCurUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(username, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const res = await fetch("/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            AuthToken: await userCredential.user.getIdToken(),
          },
          body: JSON.stringify({
            username: username,
            email: email,
            firebaseUid: userCredential.user.uid,
          }),
        }).catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurUser(user);
        setLoading(false);
      } else {
      }
    });
    return unsubscribe;
  }, []);

  const value = { signup, login, logout, curUser };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}

const self = "63ca28374d1ee7c2e07c22d6";
//const self = "63c8b842482a19d579b5910c";

export { self, UserContext };
