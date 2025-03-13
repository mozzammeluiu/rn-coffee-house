import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../store/store';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';

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
            <TouchableOpacity onPress={() => {}}>
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
            showsHorizontalScrollIndicator={false}>
            {categories?.map((category, index) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  setCategoryIndex({ index, category });
                  setSortedCoffee(sortCoffee(coffeeList, category));
                }}>
                <Text
                  style={{
                    color: categoryIndex.index === index ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex,
                    fontSize: FONTSIZE.size_16,
                    fontFamily: FONTFAMILY.poppins_semibold,
                    margin: SPACING.space_20
                  }}>
                  {category}
                </Text>
                {categoryIndex.index === index ?(
                  <View
                    style={{
                      height: 2,
                      width: '100%',
                      backgroundColor: COLORS.primaryOrangeHex
                    }}
                  />
                ):<></>}
              </TouchableOpacity>
            ))}
            </ScrollView>
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
  inputIcon:{
    marginHorizontal: SPACING.space_20
  },
  inputText:{
    flex:1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  }
})
export default HomeScreen;