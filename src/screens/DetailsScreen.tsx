import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import { COLORS } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';

const DetailsScreen = ({ navigation, route }: any) => {
    const itemOfIndex = useStore((state: any) => route.params.type === "coffee" ? state.coffeeList : state.beansList)[route.params.index];
    console.log('DetailsScreen', route.params);
    return (
        <View style={styles.container}>
            <ScrollView>
                <ImageBackgroundInfo 
                    EnableBackHandler={true}
                    imagelink_portrait={itemOfIndex.imagelink_portrait}
                    type={itemOfIndex.type}
                    id={itemOfIndex.id}
                    favorite={itemOfIndex.favorite}
                    name={itemOfIndex.name}
                    special_ingrident={itemOfIndex.special_ingrident}
                    ingredients={itemOfIndex.ingredients}
                    average_rating={itemOfIndex.average_rating}
                    ratings_count={itemOfIndex.ratings_count}
                    roasted={itemOfIndex.roasted}
                    BackHandler={itemOfIndex.BackHandler}
                    ToggleFavourite={itemOfIndex.ToggleFavourite} 
                />
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex
    }
})
export default DetailsScreen;