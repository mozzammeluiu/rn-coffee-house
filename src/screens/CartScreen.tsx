import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView>
          <Text>CartScreen</Text>
        </SafeAreaView>
        </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({})
export default CartScreen ;