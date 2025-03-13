import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const OrderHistoryScreen = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView>
          <Text>OrderHistoryScreen</Text>
        </SafeAreaView>
        </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({})
export default OrderHistoryScreen;