import {StyleSheet, TouchableOpacity} from "react-native";
import {BackButtonProps} from "@/types";
import {useRouter} from "expo-router";
import {CaretLeft} from "phosphor-react-native";
import {verticalScale} from "@/utils/styling";
import {Colors, radius} from "@/constants/theme";

const BackButton = ({style, iconSize = 26}: BackButtonProps) => {
    const router = useRouter();

    return (
        <TouchableOpacity style={[styles.button, style]} onPress={() => router.back()}>
            <CaretLeft size={verticalScale(iconSize)} color={Colors.white} weight={'bold'}/>
        </TouchableOpacity>
    );
}

export default BackButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.neutral600,
        alignSelf: 'flex-start',
        borderRadius: radius._12,
        borderCurve: 'circular',
        padding: 5,
    },
});
