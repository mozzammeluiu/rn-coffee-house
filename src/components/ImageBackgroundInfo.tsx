import React from 'react'
import { ImageBackground, ImageProps, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import GradientBGIcon from './GradientBGIcon';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favorite: boolean;
    name: string;
    special_ingrident: string;
    ingredients: string;
    average_rating: string;
    ratings_count: string;
    roasted: string;
    BackHandler: any;
    ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    EnableBackHandler,
    imagelink_portrait,
    type,
    id,
    favorite,
    name,
    special_ingrident,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    ToggleFavourite,
}) => {
    return (
        <View>
            <ImageBackground source={imagelink_portrait} style={styles.backgroundImage}>
                {EnableBackHandler ? <View style={styles.imageHeaderContainerWithBack}>
                    <TouchableOpacity>
                        <GradientBGIcon name="left" color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <GradientBGIcon
                            name="like"
                            color={favorite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                            size={FONTSIZE.size_16}
                        />
                    </TouchableOpacity>
                </View> : <View style={styles.imageHeaderContainerWithOutBack}>
                    <TouchableOpacity
                    >
                        <GradientBGIcon
                            name="like"
                            color={
                                favorite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                            }
                            size={FONTSIZE.size_16}
                        />
                    </TouchableOpacity>
                </View>}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between',
    },
    imageHeaderContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imageHeaderContainerWithOutBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
})
export default ImageBackgroundInfo