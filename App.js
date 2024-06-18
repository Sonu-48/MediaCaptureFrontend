import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackNavigation from "./src/navigation/StackNavigation";


function App(){
  return(
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#28435F"/>
        <StackNavigation/>
      </SafeAreaProvider>
    </NavigationContainer>
    
  );
}
export default App;