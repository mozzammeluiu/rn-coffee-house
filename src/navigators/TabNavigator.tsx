import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import { BlurView } from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBarStyle,
      headerShown: false,
      tabBarBackground: () => (
        <BlurView
          overlayColor=""
          blurAmount={15}
          style={styles.BlurViewStyles}
        />
      ),
    }}
      initialRouteName='Home'>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomIcon
              name="home"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          )
        }}
      />
      <Tab.Screen name="Cart" component={CartScreen} options={{
        tabBarIcon: ({ focused }) => (
          <CustomIcon
            name="cart"
            size={25}
            color={
              focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
            }
          />
        )
      }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{
        tabBarIcon: ({ focused }) => (
          <CustomIcon
            name="like"
            size={25}
            color={
              focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
            }
          />
        )
      }} />
      <Tab.Screen name="History" component={OrderHistoryScreen} options={{
        tabBarIcon: ({ focused }) => (
          <CustomIcon
            name="bell"
            size={25}
            color={
              focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
            }
          />
        )
      }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;