import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import UserData from './UserData';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StatusBar } from 'react-native';
import UserForm from './UserForm';
import Custommodal from './modal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button, Image } from 'react-native';
import Data from './Data';
import Users from './Users';
import UpdateForm from './UpdateForm';
import Login from './Login';
import Otp from './Otp';
const stack = createNativeStackNavigator();
const bottomTabNavigator = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const HomeStack = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
      <stack.Screen name="HomeScreen" component={SettingsStack} />
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="Modal" component={Custommodal} />
      <stack.Screen name="UserForm" component={UserForm} />
      <stack.Screen name="UserData" component={UserData} />
      
      <stack.Screen name="Otp" component={Otp}   />

    </stack.Navigator>
  )
}

const UserStack = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="UserScreen" component={Users} />

      <stack.Screen name="UpdateForm" component={UpdateForm}   />
    </stack.Navigator>
  )
}
function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Button title='go to Modal' onPress={() => navigation.navigate("Modal")} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
const SettingsStack = () => {
  return (
    <bottomTabNavigator.Navigator screenOptions={{ tabBarActiveTintColor: 'orange', headerShown: false }}>
<bottomTabNavigator.Screen name="Home" component={HomeScreen} 
         />
      <bottomTabNavigator.Screen name="Setting" component={SettingsScreen} options={{
        tabBarIcon: () => (
          <Image source={require('../assets/gear.png')} style={{ height: 25, width: 25 }} />
        ),
      }} />
      <bottomTabNavigator.Screen name="User" component={UserStack} options={{
        headerShown: false, tabBarIcon: () => (
          <Image source={require('../assets/user.png')} style={{ height: 25, width: 25 }} />
        )
      }} />
      <bottomTabNavigator.Screen name="Data" component={Data} options={{
        headerShown: false, tabBarIcon: () => (
          <Image source={require('../assets/analytics.png')} style={{ height: 25, width: 25 }} />
        )
      }} />
    </bottomTabNavigator.Navigator>
  )
}

const Navigator = () => {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"orange"} barStyle={"dark-content"} />
      {/* <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "orange", tabBarIndicatorStyle: { backgroundColor: 'orange' }, tabBarPressColor: 'orange', tabBarBounces: true }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator> */}
      <HomeStack/>

    </NavigationContainer>
  )
}

export default Navigator

