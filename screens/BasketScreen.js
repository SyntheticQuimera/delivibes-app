import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { selectRestaurant } from "../features/restaurantSlice";
import { urlFor } from "../sanity";

import * as Icons from "react-native-heroicons/solid";
const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  const groupedItems = useMemo(() => {
    return items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
  }, [items]);

  return (
    <SafeAreaView
      showsVerticalScrollIndicator={false}
      className="flex-1 pt-8 bg-white"
    >
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-gray-200 bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full absolute top-5 right-5 "
          >
            <Icons.XCircleIcon color="black" size={30} />
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200 py-4">
          {Object.entries(groupedItems).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white px-5 p-4 rounded-2xl mx-4 mb-4 shadow-sm"
            >
              <Text className="text-lg">{items.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="h-12 w-12 rounded-2xl"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                ${items[0]?.price.toFixed(2)}
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text className="font-extrabold text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row items-center pb-3 space-x-4 border-b border-gray-200">
            <Image
              source={require("../assets/avatar.png")}
              className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />
            <Text className="flex-1">Deliver in 50-75 min</Text>
            <TouchableOpacity>
              <Text className="font-extrabold">Change</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">${basketTotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">$5.99</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="">Order Total</Text>
            <Text className="font-extrabold">${5.99 + basketTotal}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-2xl bg-black p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
