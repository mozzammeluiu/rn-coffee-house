import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32
interface priceProps {
    size: string;
    price: string;
    currency: string;
}
interface CoffeeCardProps {
    id: string;
    index: number;
    type: string;
    roasted: string;
    name: string;
    imagelink_square: any;
    special_ingredient: string;
    average_rating: number;
    price: priceProps;
    buttonPressHandler: any;
}
const CoffeeCard: React.FC<CoffeeCardProps> = ({ id,
    index,
    type,
    roasted,
    name,
    imagelink_square,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
            <ImageBackground
                source={imagelink_square}
                style={styles.cardImage}
                resizeMode='cover'
            >
                <View style={styles.cardRatingContainer}>
                    <CustomIcon
                        name="star"
                        color={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_18}
                    />
                    <Text style={styles.cardRatingText}>{average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardSubtitle}>{special_ingredient}</Text>
            <View style={styles.cardFooterRow}>
                <Text style={styles.cardPriceCurrency}>
                    $ <Text style={styles.cardPrice}>{price.price}</Text>
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        buttonPressHandler({
                            id,
                            index,
                            type,
                            roasted,
                            imagelink_square,
                            name,
                            special_ingredient,
                            prices: [{ ...price, quantity: 1 }],
                        });
                    }}>
                    <BGIcon
                        color={COLORS.primaryWhiteHex}
                        name={'add'}
                        BGColor={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_10}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
    },
    cardImage: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        overflow: 'hidden',
        marginBottom: SPACING.space_15
    },
    cardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    cardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },
    cardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    cardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
    },
    cardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    cardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    cardPrice: {
        color: COLORS.primaryWhiteHex,
    },
})

export default CoffeeCard