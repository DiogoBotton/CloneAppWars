import { auth } from "../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export const SignInAuth = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const SignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}