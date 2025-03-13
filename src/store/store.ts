import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import BeansData from "../data/BeansData";
import CoffeeData from "../data/CoffeeData";

export const useStore = create(
    persist(
        (set, get) => ({
            coffeeList: CoffeeData,
            beansList: BeansData,
            cartPrice: 0,
            favoritesList: [],
            cartList: [],
            orderHistoryList: [],
        }), { name: "coffee-app", storage: createJSONStorage(() => AsyncStorage) },
    )
);