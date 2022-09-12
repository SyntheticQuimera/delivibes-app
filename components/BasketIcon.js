import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="mx-4 bg-white p-4 rounded-2xl flex-row items-center space-x-1 shadow-sm border border-gray-200"
      >
        <Text className="text-white font-extrabold text-lg bg-[black] rounded-lg py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-black font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-black font-extrabold">
          <Currency quantity={basketTotal} currency="USD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
