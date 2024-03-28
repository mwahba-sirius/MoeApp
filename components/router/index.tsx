import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen } from "../../pages/login/login";
import { useAppSelector } from "../../store/rootStore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import { CONSTANTS } from "../../constants";
import { Text } from "react-native-paper";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const EmptyComponent = () => <></>
export const Router = () => {
    const authState = useAppSelector((state) => state.login);
    return (
        <>

            {authState.loggedIn && authState.otpVerified ? (
                <Tab.Navigator screenOptions={{
                    tabBarLabelStyle: { fontSize: 16, marginBottom: 20 },
                    tabBarStyle: { height: 70, position: "relative" },
                    headerShown: false,
                    tabBarItemStyle: { marginTop: 10 },
                    tabBarLabel: ({ focused, color, children }) => (
                        <>
                            <Text style={[{ color: focused ? CONSTANTS.COLORS.Primary : 'black', fontSize: focused ? 15 : 14,marginBottom : 10 }]}>{children}</Text>
                        </>)
                }}
                >
                    <Tab.Screen options={{ tabBarIcon: () => <MaterialIcons name="grading" size={30} color={CONSTANTS.COLORS.Primary} /> }} name="ادارة المعايير" component={EmptyComponent} />
                    <Tab.Screen options={{

                        tabBarItemStyle: {
                            marginBottom: 20, overflow: "visible", position: "absolute", alignSelf: 'center', zIndex: 10, height: 80, width: 90, top: -30,
                            left: (Dimensions.get('window').width / 2) - 45,
                            backgroundColor: "white", borderRadius: 100
                        },
                        tabBarIcon: () => <MaterialIcons name="notifications" size={36} color={CONSTANTS.COLORS.Primary} />,
                    }} name="الاشعارات" component={EmptyComponent} />
                    <Tab.Screen options={{ tabBarIcon: () => <MaterialIcons name="post-add" size={30} color={CONSTANTS.COLORS.Primary} /> }} name="ادارة النظام " component={EmptyComponent} />
                </Tab.Navigator >
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="login" component={LoginScreen} />
                </Stack.Navigator >
            )}
        </>
    )
}