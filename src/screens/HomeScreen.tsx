import React, { act } from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

function getCategories(coffeeList: any): string[] {
  const categories = coffeeList.map((coffee: any) => coffee.name);
  return Array.from(new Set(categories));
}
function sortCoffee(coffeeList: any, category: string) {
  if (category === 'All') {
    return coffeeList;
  }
  return coffeeList.filter((coffee: any) => coffee.name === category);
}
const HomeScreen = () => {
  const coffeeList = useStore((state: any) => state.coffeeList);
  const beansList = useStore((state: any) => state.beansList);
  const [categories, setCategories] = React.useState<string[]>(['All', ...getCategories(coffeeList)]);
  const [searchText, setSearchText] = React.useState('');
  const [categoryIndex, setCategoryIndex] = React.useState<{
    index: number;
    category: string
  }>({ index: 0, category: categories[0] });
  const [sortedCoffee, setSortedCoffee] = React.useState(sortCoffee(coffeeList, categoryIndex.category));
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}>
          {/* header */}
          <HeaderBar />
          <Text style={styles.title}>Find the best {'\n'} coffee for you</Text>
          {/* input */}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => { }}>
              <CustomIcon
                style={styles.inputIcon}
                name="search"
                size={FONTSIZE.size_18}
                color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Find your coffee..."
              placeholderTextColor={COLORS.primaryLightGreyHex}
              style={styles.inputText}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          {/* Category Scroller */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollViewStyle}
          >
            {categories?.map((category, index) => (
              <View key={index.toString()} style={styles.categoryScrollViewContainer}>
                <TouchableOpacity
                  style={styles.categoryScrollViewItem}
                  onPress={() => {
                    setCategoryIndex({ index, category });
                    setSortedCoffee(sortCoffee(coffeeList, category));
                  }}>
                  <Text
                    style={[
                      styles.categoryText,
                      categoryIndex.index === index ? { color: COLORS.primaryOrangeHex } : { color: COLORS.primaryLightGreyHex }
                    ]}>
                    {category}
                  </Text>
                  {categoryIndex.index === index ? (
                    <View
                      style={styles.activeCategory}
                    />
                  ) : <></>}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          {/* Coffee List */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sortedCoffee}
            contentContainerStyle={styles.coffeeScrollViewStyle}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (<TouchableOpacity>
                <CoffeeCard id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[0]}
                  buttonPressHandler={() => { }} 
                />
              </TouchableOpacity>)
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: SPACING.space_30,
    borderRadius: SPACING.space_20,
    backgroundColor: COLORS.primaryGreyHex,
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20
  },
  inputText: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  },
  categoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryScrollViewItem: {
    alignItems: 'center'
  },
  categoryText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginBottom: SPACING.space_4
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  coffeeScrollViewStyle: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_20
  }
})
export default HomeScreen;