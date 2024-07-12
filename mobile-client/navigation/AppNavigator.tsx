import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "~/screens/Profile";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="/">
                <Stack.Screen name="/" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 

export default AppNavigator;