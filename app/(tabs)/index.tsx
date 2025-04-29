import {Text} from "react-native";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import {Colors} from "@/constants/theme";
import {signOut} from "@firebase/auth";
import {auth} from "@/config/firebase";
import {useAuth} from "@/contexts/authContext";
import ScreenWrapper from "@/components/ScreenWrapper";

const Home = () => {
    const {user} = useAuth();
    console.log(user);

    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
        <ScreenWrapper>
            <Text>Home</Text>
            <Button onPress={handleLogout}>
                <Typo color={Colors.black}>Logout</Typo>
            </Button>
        </ScreenWrapper>
    );
}

export default Home;
