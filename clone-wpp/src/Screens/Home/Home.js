import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Chats from "../ChatList/Chats";
import Photo from "../Photo/Photo";
import { Ionicons } from '@expo/vector-icons';
import Context from "../../Context/Context";

export default function Home() {
    const Tab = createMaterialTopTabNavigator();
    const { theme: { colors } } = useContext(Context);

    return (
        <Tab.Navigator
            initialRouteName='chats'
            screenOptions={({ route }) => {
                return {
                    tabBarLabel: () => {
                        if (route.name == "fotos")
                            return <Ionicons
                                name="camera"
                                size={20}
                                color={colors.white}
                            />
                        else
                            return (
                                <Text style={{ color: colors.white }}>
                                    {route.name.toLocaleUpperCase()}
                                </Text>
                            )
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: colors.white
                    },
                    tabBarStyle: {
                        backgroundColor: colors.foreground
                    }
                };
            }}>
            <Tab.Screen name='fotos' component={Photo} />
            <Tab.Screen name='chats' component={Chats} />
        </Tab.Navigator>
    )
}