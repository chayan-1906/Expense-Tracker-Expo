import {Alert, Pressable, StyleSheet, TextInput, View} from "react-native";
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
import {useAuth} from "@/contexts/authContext";

const Register = () => {
    const nameRef = useRef<{ input: TextInput | null; value: string }>({input: null, value: ''});
    const emailRef = useRef<{ input: TextInput | null; value: string }>({input: null, value: ''});
    const passwordRef = useRef<{ input: TextInput | null; value: string }>({input: null, value: ''});

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {register: registerUser} = useAuth();

    const handleSubmit = async () => {
        if (!nameRef.current.value || !emailRef.current.value || !passwordRef.current.value) {
            Alert.alert('Sign Up', 'Please fill all the fields!');
            return;
        }

        console.log('name:', nameRef.current.value);
        console.log('email:', emailRef.current);
        console.log('password:', passwordRef.current);
        console.log('good to go!✅');
        setIsLoading(true);
        const registerUserResponse = await registerUser(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
        console.log('registerUserResponse:', registerUserResponse);
        if (!registerUserResponse.success) {
            Alert.alert('Sign Up', registerUserResponse.message);
        }
        setIsLoading(false);
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
                    <Input inputRef={nameRef} placeholder={'Enter your name...'} autoFocus icon={<User size={verticalScale(26)} color={Colors.neutral300} weight={'fill'}/>}
                           onChangeText={(value) => (nameRef.current.value = value)}
                           keyboardType={'default'} returnKeyType={'next'} onSubmitEditing={() => emailRef?.current?.input?.focus()}
                    />

                    {/** email input */}
                    <Input inputRef={emailRef} placeholder={'Enter your email...'} icon={<At size={verticalScale(26)} color={Colors.neutral300} weight={'fill'}/>}
                           onChangeText={(value) => (emailRef.current.value = value)}
                           keyboardType={'email-address'} returnKeyType={'next'} onSubmitEditing={() => passwordRef?.current?.input?.focus()}
                    />

                    {/** password input */}
                    <Input inputRef={passwordRef} placeholder={'Enter your password...'} icon={<Lock size={verticalScale(26)} color={Colors.neutral300} weight={'fill'}/>} secureTextEntry
                           onChangeText={(value) => (passwordRef.current.value = value)}
                           keyboardType={'default'} returnKeyType={'done'} onSubmitEditing={handleSubmit}
                    />

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
