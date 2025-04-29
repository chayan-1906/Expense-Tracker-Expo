import {Tabs} from "expo-router";
import CustomTabs from "@/components/CustomTabs";

const TabsLayout = () => {
    return (
        <Tabs tabBar={CustomTabs} screenOptions={{headerShown: false}}>
            <Tabs.Screen name={'index'}/>
            <Tabs.Screen name={'statistics'}/>
            <Tabs.Screen name={'wallet'}/>
            <Tabs.Screen name={'profile'}/>
        </Tabs>
    );
}

export default TabsLayout;
