import {StyleSheet} from "react-native";
import {Stack} from "expo-router";
import {AuthProvider} from "@/contexts/authContext";

const StackLayout = () => {
    return (
        <Stack screenOptions={{headerShown: false}}>

        </Stack>
    );
}

function RootLayout() {
    return (
        <AuthProvider>
            <StackLayout/>
        </AuthProvider>
    );
}

export default RootLayout;

const styles = StyleSheet.create({});
