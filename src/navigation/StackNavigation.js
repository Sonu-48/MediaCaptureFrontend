import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SplachScreen from "../screen/SplachScreen";
import Login from "../component/Login";
import Signup from "../component/Signup";
import Home from "../screen/Home";
import BottomTabNavigation from "./BottomTabNavigation";



const StackNavigation = ()=>{
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator initialRouteName="SplachScreen">
            <Stack.Screen name="SplachScreen" component={SplachScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
            {/* <Stack.Screen name="Home" component={Home} options={{headerShown:true}}/> */}
            <Stack.Screen name="Home" component={BottomTabNavigation} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}
export default StackNavigation;