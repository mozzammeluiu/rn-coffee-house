import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'react-native-linear-gradient'
import { COLORS, SPACING } from '../theme/theme'
import CustomIcon from './CustomIcon'

interface GradientBGIconProps {
    name: string;
    size: number;
    color: string;
}
const GradientBGIcon: React.FC<GradientBGIconProps> = ({ name, color, size }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.linearGradient}
            >
                <CustomIcon name={name} size={size} color={color} />
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow: 'hidden'
    },
    linearGradient: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default GradientBGIcon