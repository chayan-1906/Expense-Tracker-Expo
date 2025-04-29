import {Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {Colors, spacingY} from "@/constants/theme";
import {verticalScale} from "@/utils/styling";
import {ChartBar, House, User, Wallet} from "phosphor-react-native";

const CustomTabs = ({state, descriptors, navigation}: BottomTabBarProps) => {
    const tabBarIcons: any = {
        index: (isFocused: boolean) => (
            <House size={verticalScale(30)} weight={isFocused ? 'fill' : 'regular'} color={isFocused ? Colors.primary : Colors.neutral400}/>
        ),
        statistics: (isFocused: boolean) => (
            <ChartBar size={verticalScale(30)} weight={isFocused ? 'fill' : 'regular'} color={isFocused ? Colors.primary : Colors.neutral400}/>
        ),
        wallet: (isFocused: boolean) => (
            <Wallet size={verticalScale(30)} weight={isFocused ? 'fill' : 'regular'} color={isFocused ? Colors.primary : Colors.neutral400}/>
        ),
        profile: (isFocused: boolean) => (
            <User size={verticalScale(30)} weight={isFocused ? 'fill' : 'regular'} color={isFocused ? Colors.primary : Colors.neutral400}/>
        ),
    }

    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label: any = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event?.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabBarItem}
                    >
                        {/*<Typo color={isFocused ? Colors.primary : Colors.white}>{label}</Typo>*/}
                        {tabBarIcons[route.name] && tabBarIcons[route.name](isFocused)}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default CustomTabs;

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        width: '100%',
        height: Platform.OS === 'ios' ? verticalScale(73) : verticalScale(55),
        backgroundColor: Colors.neutral800,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: Colors.neutral700,
        borderTopWidth: 1,
    },
    tabBarItem: {
        flex: 1,
        marginBottom: Platform.OS === 'ios' ? spacingY._10 : spacingY._5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
