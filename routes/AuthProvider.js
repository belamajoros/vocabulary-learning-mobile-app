import React , { createContext, Alert, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try{
                        await auth().signInWithEmailAndPassword(email, password)
                    } catch (error) {
                        alert(error.message);
                    }
                },

                register: async(email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                    } catch (error) {
                        alert(error.message);
                    }
                },

                logout: async() => {
                    try {
                        await auth().signOut();
                    } catch (error) {
                        alert(error.message);
                    }
                },

                reset: async(email) => {
                    try {
                        await auth().sendPasswordResetEmail(email);
                        alert("Password reset sent to email");
                    } catch (error){
                        alert(error.message);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}