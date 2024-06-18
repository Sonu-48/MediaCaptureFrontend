import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screen/Home";
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import { Image } from "react-native";
import File from "../screen/File/File";


const Tab = createBottomTabNavigator();
const BottomTabNavigation = ()=>{
    return(
        <Tab.Navigator
        tabBarHideOnKeyboard={true}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: '#fff',
          tabBarLabelStyle: {
            fontSize: 13,
          },
          tabBarStyle: {
            backgroundColor: '#28435F',
            borderTopWidth: 0,
            elevation: 0,
            paddingTop:10,
            paddingBottom:10,
            height:70
            
          },
          tabBarIcon: ({focused, color}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              return <Icon name={iconName} size={30} color={color} />;
            } else if (route.name === 'File') {
              iconName = 'addfile';
              return <Icons name={iconName} size={30} color={color} />;
            }
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
         <Tab.Screen
          name="File"
          component={File}
          options={{
            headerShown: false,
          }}
        />
         {/* <Tab.Screen
          name="Image"
          component={Image}
          options={{
            headerShown: false,
          }}
        /> */}
      </Tab.Navigator>
    );
}
export default BottomTabNavigation;