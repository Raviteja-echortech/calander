import React from "react"
import {View,Text} from "react-native"
//import Calender from "./src/Calender"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Calender from "./src/Calender"
import FullyearCalender from "./src/FullyearCalender"
import { routes } from "./routes/routes"
import CreateEvents from "./src/CreateEvents"

const App=()=>{
  const Stack=createNativeStackNavigator()
  const config = { animation: 'slide_from_right' }
  return(
      <NavigationContainer>
    <Stack.Navigator
      initialRouteName={routes.calender}
      screenOptions={{
        headerShown: false,
      }} 
    >
      <Stack.Screen name={routes.calender} component={Calender}  options={config} />
      <Stack.Screen name={routes.FullCalender} component={FullyearCalender} options={config} />
      <Stack.Screen name={routes.CreateEvents} component={CreateEvents} options={config}  />
      </Stack.Navigator>
   </NavigationContainer>
   )
}
export default  App