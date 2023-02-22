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
  const [mongoUser, setMongoUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurUser(user);
      setLoading(false);
      if (user) {
        user
          .getIdToken()
          .then((token) => {
            return fetch("/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                AuthToken: token,
              },
              body: JSON.stringify({
                firebaseUid: user.uid,
              }),
            });
          })
          .then((res) => {
            if (res.ok) return res;
            throw res;
          })
          .then((data) => {
            setMongoUser(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    return unsubscribe;
  }, []);

  const value = { signup, login, logout, curUser, mongoUser };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}

const self = "63ca28374d1ee7c2e07c22d6";
//const self = "63c8b842482a19d579b5910c";

export { self, UserContext };
