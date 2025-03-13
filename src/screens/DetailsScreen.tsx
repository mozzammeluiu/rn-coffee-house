import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const DetailsScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>DetailsScreen</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({})
export default DetailsScreen;