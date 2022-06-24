import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import SignIn from "./Screens/SignIn/SignIn";

const Stack = createStackNavigator();

export default function Routes(props) {
    return(
        <NavigationContainer>
            {!props.currentUser ? (
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="signIn" component={SignIn} />
                </Stack.Navigator>
            ) : (
                <Text>Olá!</Text>
            )}
        </NavigationContainer>
    );
}