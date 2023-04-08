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
        return myAuth.createUserWithEmailAndPassword(user, pwd) // should be a promise
    }
    function signin(user, pwd){
       return myAuth.signInWithEmailAndPassword(user, pwd) // should be a promise
    }
    function signout(){
        myAuth.signOut() 
    }

    onAuthStateChanged(auth, user => {
        console.log('user changed');

        setLoading(false)
        setCurrentUser(user)
    })

    // useEffect(() => {
    //     console.log('user changed');
    //     // 'onAuthStateChanged' will be called after 'createUserWithEmailAndPassword'
    //     // we do not want this to run on every render
    //     const unsubscribe = onAuthStateChanged(auth, user => {
    //         setLoading(false)
    //         setCurrentUser(user)
    //     })

    //     // will unsubscribe when we unmount this component
    //     return unsubscribe
    // }, [])


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