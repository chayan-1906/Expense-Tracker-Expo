import {ActivityIndicator, ActivityIndicatorProps, View} from "react-native";
import {Colors} from "@/constants/theme";

const Loading = ({size, color = Colors.primary}: ActivityIndicatorProps) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={size} color={color}/>
        </View>
    );
}

export default Loading;
