import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const PaymentScreen = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>PaymentScreen</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({})
export default PaymentScreen;