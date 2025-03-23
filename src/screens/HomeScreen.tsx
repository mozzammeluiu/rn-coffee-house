import React, { act } from 'react';
import { Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

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
const HomeScreen = ({ navigation }: any) => {
  const coffeeList = useStore((state: any) => state.coffeeList);
  const beansList = useStore((state: any) => state.beansList);
  const [categories, setCategories] = React.useState<string[]>(['All', ...getCategories(coffeeList)]);
  const [searchText, setSearchText] = React.useState('');
  const [categoryIndex, setCategoryIndex] = React.useState<{
    index: number;
    category: string
  }>({ index: 0, category: categories[0] });
  const [sortedCoffee, setSortedCoffee] = React.useState(sortCoffee(coffeeList, categoryIndex.category));
  const tabBarHeight = useBottomTabBarHeight();
  const listRef = React.useRef<FlatList>(null);
  function handleSearch(text: string) {
    if (text !== '') {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({ index: 0, category: 'All' });
      const filteredCoffee = coffeeList.filter((coffee: any) => coffee.name.toLowerCase().includes(searchText.toLowerCase()));
      setSortedCoffee(filteredCoffee);
    }
  }
  function resetSearchCoffee() {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...coffeeList]);
    setSearchText('');
  };
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
              onChangeText={(text) => {
                setSearchText(text)
                handleSearch(text)
              }}
            />
            {searchText.length > 0 ? (
              <TouchableOpacity
                onPress={resetSearchCoffee}>
                <CustomIcon
                  style={styles.InputIcon}
                  name="close"
                  size={FONTSIZE.size_16}
                  color={COLORS.primaryLightGreyHex}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
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
                    listRef?.current?.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
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

          {/* Coffee Flatlist */}
          <FlatList
            ListEmptyComponent={
              <View style={styles.emptyListContainer}>
                <Text style={styles.categoryText}>No Coffee Available</Text>
              </View>
            }
            ref={listRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sortedCoffee}
            contentContainerStyle={styles.coffeeScrollViewStyle}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
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
                </TouchableOpacity>
              )
            }}
          />

          <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>

          {/* Beans Flatlist */}

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={beansList}
            contentContainerStyle={[
              styles.flatListContainer,
              { marginBottom: tabBarHeight },
            ]}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Details', {
                      index: item.index,
                      id: item.id,
                      type: item.type,
                    });
                  }}>
                  <CoffeeCard
                    id={item.id}
                    index={item.index}
                    type={item.type}
                    roasted={item.roasted}
                    imagelink_square={item.imagelink_square}
                    name={item.name}
                    special_ingredient={item.special_ingredient}
                    average_rating={item.average_rating}
                    price={item.prices[2]}
                    buttonPressHandler={() => { }}
                  />
                </TouchableOpacity>
              );
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
  InputIcon: {
    marginHorizontal: SPACING.space_20,
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
    marginBottom: SPACING.space_4,
    color: COLORS.primaryLightGreyHex,
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
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  emptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  coffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
})
export default HomeScreen;