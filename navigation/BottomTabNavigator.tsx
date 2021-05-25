import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/welcomeScreen";
import PackagesumScreen from "../screens/PackagesumScreen";
import QRScreen from "../screens/QRScreen";
import FoodRegistrationScreen from "../screens/FoodRegistration";
import filterDataScreen from "../screens/filterData";
import packageDetailsScreen from '../screens/packageDetailsScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Nekkanti"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Nekkanti"
        component={TabOneNavigator}
        // options={{
        //   tabBarIcon: ({ color }) => 
        //   <TabBarIcon name="ios-code" color={color} />,
        // }}
      />
      {/* <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'iAsset Tracker' }}
      />
      <TabOneStack.Screen
        name='RegistrationScreen'
        component={RegistrationScreen}
        options={{ headerTitle: 'iAsset Tracker' }}
      />
      <TabOneStack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerTitle: 'iAsset Tracker' }}
      />
      <TabOneStack.Screen
        name='WelcomeScreen'
        component={WelcomeScreen}
        options={{ headerTitle: 'iAsset Tracker' }}
      />
      <TabOneStack.Screen
        name='PackagesumScreen'
        component={PackagesumScreen}
        options={{ headerTitle: 'iAsset Tracker' }}
      />  
      <TabOneStack.Screen
        name='QRScreen'
        component={QRScreen}
        options={{ headerTitle: 'iAsset Tracker' }}
      />        
      <TabOneStack.Screen
        name='FoodRegistrationScreen'
        component={FoodRegistrationScreen}
        options={{ headerTitle: 'iAsset Tracker' }}
      /> 
      
      <TabOneStack.Screen
        name='filterDataScreen'
        component={filterDataScreen}
        options={{ headerTitle: 'iAsset Tracker' }}
      /> 

      <TabOneStack.Screen
        name='packageDetailsScreen'
        component={packageDetailsScreen}
        options={{ headerTitle: 'iAsset Tracker' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
