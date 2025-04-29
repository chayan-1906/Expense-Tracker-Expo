import {StyleSheet, TextInput, View} from "react-native";
import {InputProps} from "@/types";
import {verticalScale} from "@/utils/styling";
import {Colors, radius, spacingX} from "@/constants/theme";

const Input = (props: InputProps) => {
    return (
        <View style={[styles.container, props.containerStyle && props.containerStyle]}>
            {props.icon && props.icon}
            <TextInput
                // ref={props.inputRef}
                ref={(input) => {
                    if (props.inputRef) {
                        props.inputRef.current.input = input;
                    }
                }}
                placeholderTextColor={Colors.neutral400} style={[styles.input, props.inputStyle]} {...props}/>
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: verticalScale(54),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.neutral300,
        borderRadius: radius._17,
        borderCurve: 'continuous',
        paddingHorizontal: spacingX._15,
        gap: spacingX._10,
    },
    input: {
        flex: 1,
        color: Colors.white,
        fontSize: verticalScale(14),
    },
});
