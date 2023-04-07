import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import myAuth from '../firebase/myAuth'
import { auth } from "../firebase/init";


export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    // Need this because Firebase saves the user 
    const [loading, setLoading] = useState(true)

    function signup(user, pwd) {
        myAuth.createUserWithEmailAndPassword(user, pwd)
    }
    function signin(user, pwd){
        myAuth.signInWithEmailAndPassword(user, pwd)
    }
    function signout(){
        myAuth.signOut() 
    }


    useEffect(() => {
        // 'onAuthStateChanged' will be called after 'createUserWithEmailAndPassword'
        // we do not want this to run on every render
        const unsubscribe = onAuthStateChanged(auth, user => {
            setLoading(false)
            setCurrentUser(user)
        })

        // will unsubscribe when we unmount this component
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        signin,
        signout
    }

    return (
        <AuthContext.Provider value={value}>
            {/* if we are not loading display children */}
            {!loading && children}
        </AuthContext.Provider>
    )
}