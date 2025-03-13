import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const FavoritesScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>FavoritesScreen</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({})
export default FavoritesScreen;