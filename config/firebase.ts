import {initializeApp} from 'firebase/app';
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import {getAnalytics} from 'firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAJZ41SlhNGRxjkCGcqnMXi21p3nVipLMU",
    authDomain: "expense-tracker-chayan19062000.firebaseapp.com",
    projectId: "expense-tracker-chayan19062000",
    storageBucket: "expense-tracker-chayan19062000.firebasestorage.app",
    messagingSenderId: "258656862142",
    appId: "1:258656862142:web:650c8aad107032804fc3ef",
    measurementId: "G-B1NEW7EZ4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// db
export const firestore = getFirestore(app);
