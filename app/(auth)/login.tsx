import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import {Alert, Pressable, StyleSheet, TextInput, View} from "react-native";
import {Colors, spacingX, spacingY} from "@/constants/theme";
import {verticalScale} from "@/utils/styling";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import {At, Lock} from "phosphor-react-native";
import {useRef, useState} from "react";
import Button from "@/components/Button";
import {useRouter} from "expo-router";
import routes from "@/utils/routes";
import {useAuth} from "@/contexts/authContext";

const Login = () => {
    const emailRef = useRef<{ input: TextInput | null; value: string }>({input: null, value: ''});
    const passwordRef = useRef<{ input: TextInput | null; value: string }>({input: null, value: ''});

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {login: loginUser} = useAuth();

    const handleSubmit = async () => {
        if (!emailRef.current.value || !passwordRef.current.value) {
            Alert.alert('Login', 'Please fill all the fields!');
            return;
        }

        console.log('email:', emailRef.current.value);
        console.log('password:', passwordRef.current.value);
        console.log('good to go!✅');
        setIsLoading(true);
        const loginUserResponse = await loginUser(emailRef.current.value, passwordRef.current.value);
        console.log('loginUserResponse:', loginUserResponse);
        if (!loginUserResponse.success) {
            Alert.alert('Login', loginUserResponse.message);
        }
        setIsLoading(false);
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/** back button */}
                <BackButton iconSize={28}/>
                <View style={{gap: 5, marginTop: spacingY._20}}>
                    <Typo size={30} fontWeight={800}>Hey,</Typo>
                    <Typo size={30} fontWeight={800}>Welcome Back</Typo>
                </View>

                {/** form */}
                <View style={styles.form}>
                    <Typo size={16} color={Colors.textLighter}>Login now to track all your expenses</Typo>

                    {/** email input */}
                    <Input inputRef={emailRef} placeholder={'Enter your email...'} autoFocus icon={<At size={verticalScale(26)} color={Colors.neutral300} weight={'fill'}/>}
                           onChangeText={(value) => (emailRef.current.value = value)}
                           keyboardType={'email-address'} returnKeyType={'next'} onSubmitEditing={() => passwordRef?.current?.input?.focus()}
                    />

                    {/** password input */}
                    <Input inputRef={passwordRef} placeholder={'Enter your password...'} icon={<Lock size={verticalScale(26)} color={Colors.neutral300} weight={'fill'}/>} secureTextEntry
                           onChangeText={(value) => (passwordRef.current.value = value)}
                           keyboardType={'default'} returnKeyType={'done'} onSubmitEditing={handleSubmit}
                    />

                    <Typo size={14} color={Colors.text} style={{alignSelf: 'flex-end'}}>Forgot Password?</Typo>

                    <Button loading={isLoading} onPress={handleSubmit}>
                        <Typo fontWeight={700} color={Colors.black} size={21}>Login</Typo>
                    </Button>
                </View>

                {/** footer */}
                <View style={styles.footer}>
                    <Typo size={15}>Don't have an account?</Typo>
                    <Pressable onPress={() => router.replace(routes.registerPath())}>
                        <Typo size={15} fontWeight={700} color={Colors.primary}>Sign Up</Typo>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    );
}

export default Login;

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
