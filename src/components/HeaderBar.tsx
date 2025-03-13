import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

interface HeaderBarProps {
    title?: string;
}
const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
    return (
        <View style={styles.container}>
            <GradientBGIcon name="menu" size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex} />
            <Text style={styles.text}>{title}</Text>
            <ProfilePic />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_semibold
    }
})

export default HeaderBar