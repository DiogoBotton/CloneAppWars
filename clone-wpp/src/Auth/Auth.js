import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../../firebase";

export const SignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const SignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}