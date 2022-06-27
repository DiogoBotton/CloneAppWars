import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from 'react'
import Context from "./Context/Context";
import ChatHeader from "./Components/ChatHeader/ChatHeader";

// Screens
import SignIn from "./Screens/SignIn/SignIn";
import Profile from "./Screens/Profile/Profile";
import Home from "./Screens/Home/Home";
import Contacts from "./Screens/Contacts/Contacts";
import Chat from "./Screens/Chat/Chat";

const Stack = createStackNavigator();

export default function Routes(props) {
    const { theme: { colors } } = useContext(Context);

    return (
        <NavigationContainer>
            {!props.currentUser ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="signIn"
                        component={SignIn}
                    />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.foreground,
                        shadowOpacity: 0,
                        elevation: 0
                    },
                    headerTintColor: colors.white
                }}>
                    {!props.currentUser.displayName && (
                        <Stack.Screen
                            name="profile"
                            component={Profile}
                            options={{ headerShown: false }}
                        />
                    )}
                    <Stack.Screen
                        name="home"
                        component={Home}
                        options={{ title: "WhatsApp" }}
                    />
                    <Stack.Screen
                        name="contacts"
                        component={Contacts}
                        options={{ title: "Contatos" }}
                    />
                    <Stack.Screen
                        name="chat"
                        component={Chat}
                        options={{ headerTitle: (props) => <ChatHeader {...props} /> }}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}