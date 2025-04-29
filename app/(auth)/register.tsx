import {Alert, Pressable, StyleSheet, View} from "react-native";
import {useRef, useState} from "react";
import {useRouter} from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import BackButton from "@/components/BackButton";
import {Colors, spacingX, spacingY} from "@/constants/theme";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import {At, Lock, User} from "phosphor-react-native";
import {verticalScale} from "@/utils/styling";
import Button from "@/components/Button";
import routes from "@/utils/routes";

const Register = () => {
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = () => {
        if (!nameRef.current || !emailRef.current || !passwordRef.current) {
            Alert.alert('Sign Up', 'Please fill all the fields!');
            return;
        }
        console.log('name:', nameRef.current);
        console.log('email:', emailRef.current);
        console.log('password:', passwordRef.current);
        console.log('good to go!✅');
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/** back button */}
                <BackButton iconSize={28}/>
                <View style={{gap: 5, marginTop: spacingY._20}}>
                    <Typo size={30} fontWeight={800}>Let's</Typo>
                    <Typo size={30} fontWeight={800}>Get Started</Typo>
                </View>

                {/** form */}
                <View style={styles.form}>
                    <Typo size={16} color={Colors.textLighter}>Create an account to track your expenses</Typo>

                    {/** name input */}
                    <Input placeholder={'Enter your name...'} icon={<User size={verticalScale(26)} color={Colors.neutral300} weight={'fill'}/>} onChangeText={(value) => nameRef.current = value}/>

                    {/** email input */}
                    <Input placeholder={'Enter your email...'} icon={<At size={verticalScale(26)} color={Colors.neutral300} weight={'fill'}/>} onChangeText={(value) => emailRef.current = value}/>

                    {/** password input */}
                    <Input placeholder={'Enter your password...'} icon={<Lock size={verticalScale(26)} color={Colors.neutral300} weight={'fill'}/>} secureTextEntry
                           onChangeText={(value) => passwordRef.current = value}/>

                    <Button loading={isLoading} onPress={handleSubmit}>
                        <Typo fontWeight={700} color={Colors.black} size={21}>Sign Up</Typo>
                    </Button>
                </View>

                {/** footer */}
                <View style={styles.footer}>
                    <Typo size={15}>Already have an account?</Typo>
                    <Pressable onPress={() => router.replace(routes.loginPath())}>
                        <Typo size={15} fontWeight={700} color={Colors.primary}>Login</Typo>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    );
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20,
    },
    welcomeText: {
        fontSize: verticalScale(20),
        fontWeight: 'bold',
        color: Colors.text,
    },
    form: {
        gap: spacingY._20,
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: 500,
        color: Colors.text,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    footerText: {
        color: Colors.text,
        textAlign: 'center',
        fontSize: verticalScale(15),
    },
});
