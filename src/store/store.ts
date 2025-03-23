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
            addToCart: (cartItem: any) => {
                set((state: any) => {
                    console.log('cartItem', state);
                    //check if item is already in cart
                    const itemIndex = state.cartList.findIndex((item: any) => item.id === cartItem.id);
                    if (itemIndex === -1) {
                        state.cartList.push(cartItem);
                        state.cartPrice += parseInt(cartItem.price.price);
                    }else {
                        state.cartList.splice(itemIndex, 1);
                        state.cartPrice -= parseInt(cartItem.price.price);
                    }
                });
            }
        }), { name: "coffee-app", storage: createJSONStorage(() => AsyncStorage) },
    )
);