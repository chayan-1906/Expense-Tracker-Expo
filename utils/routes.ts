import {Href} from "expo-router";

const routes = {
    welcomePath: '/welcome' as Href,
    // welcomePath: '/(auth)/welcome',
    loginPath: () => '/login' as Href,
    registerPath: () => '/register' as Href,
    tabsPath: () => '/(tabs)' as Href,
};

export default routes;
