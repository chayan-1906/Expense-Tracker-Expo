import {Image, StyleSheet, View} from "react-native";
import {Colors} from "@/constants/theme";
import {useRouter} from "expo-router";
import {useEffect} from "react";
import routes from "@/utils/routes";

const SplashScreen = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(()=> {
            router.push(routes.welcomePath);
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/splashImage.png')} style={styles.logo} resizeMode={'contain'}/>
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.neutral900,
    },
    logo: {
        height: '20%',
        aspectRatio: 1,
    },
    text: {
        color: 'red',
        fontSize: 32,
    },
});
