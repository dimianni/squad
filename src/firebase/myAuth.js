import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./init"

export default {
    createUserWithEmailAndPassword(email, pwd) {
        return createUserWithEmailAndPassword(auth, email, pwd)
    },
    signInWithEmailAndPassword(email, pwd){
        return signInWithEmailAndPassword(auth, email, pwd)
    },
    signOut(){
        return signOut(auth)
    }
}
