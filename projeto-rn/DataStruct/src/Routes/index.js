import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Menu from "../Components/Menu"
import Lde from "../Components/LDE"
import FCE from "../Components/FCE"
import Hash from "../Components/HASH"

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}} tabBar={props=><Menu {...props}/>}>
        <Tab.Screen name="FDE" component={Lde} />
        <Tab.Screen name="HEAP" component={FCE} />
        <Tab.Screen name="HASH" component={Hash} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
