import {createContext, useContext, useEffect, useState} from 'react';
import {AuthContextType, UserType} from "@/types";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {auth, firestore} from '@/config/firebase';
import {useRouter} from "expo-router";
import routes from "@/utils/routes";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<UserType>(null);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return {success: true};
        } catch (error: any) {
            console.error('error in login:', error);
            let errorMessage = error.message as string;
            if (errorMessage.includes('auth/invalid-email')) {
                errorMessage = 'Invalid Email Address';
            } else if (errorMessage.includes('auth/invalid-credential')) {
                errorMessage = 'Invalid Credentials';
            }
            return {success: false, message: errorMessage}
        }
    }

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(firestore, 'users', response.user.uid), {
                name, email,
                uid: response?.user?.uid,
            });
            return {success: true};
        } catch (error: any) {
            console.error('error in register:', error);
            let errorMessage = error.message as string;
            if (errorMessage.includes('auth/invalid-email')) {
                errorMessage = 'Invalid Email Address';
            } else if (errorMessage.includes('auth/email-already-in-use')) {
                errorMessage = 'This email address is already used';
            } else if (errorMessage.includes('auth/weak-password')) {
                errorMessage = 'Password must contain at least 6 characters';
            }
            return {success: false, message: errorMessage}
        }
    }

    const updateUser = async (uid: string) => {
        try {
            const docRef = doc(firestore, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const userData: UserType = {
                    uid: data?.uid,
                    email: data.email || null,
                    name: data.name || null,
                    image: data.image || null,
                };
                setUser({...userData});
            }
        } catch (error: any) {
            console.error('error in updateUser:', error);
        }
    }

    const contextValue: AuthContextType = {
        user, setUser,
        login, register, updateUser,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log('firebaseUser 👶🏻:', firebaseUser);
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName,
                });
                await updateUser(firebaseUser.uid);
                router.replace(routes.tabsPath());
            } else {
                setUser(null);
                router.replace(routes.welcomePath);
            }

            return () => unsubscribe();
        });
    }, []);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be wrapper with AuthProvider');
    }

    return context;
}
