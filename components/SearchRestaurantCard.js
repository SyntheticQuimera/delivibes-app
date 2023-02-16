import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import * as IconsOutline from "react-native-heroicons/outline";
import * as Icons from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const SearchRestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className='bg-white flex flex-row shadow-sm rounded-2xl my-1'>
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className='h-24 w-24 rounded-l-2xl'
      />

      <View className='px-3 pb-4'>
        <Text className='font-bold text-lg pt-2'>{title}</Text>
        <View className='flex-row items-center space-x-1'>
          <Icons.StarIcon color='gold' opacity={0.5} size={22} />
          <Text className='text-xs text-gray-500'>{rating}</Text>
          <Text className='text-xs text-gray-500'>· {genre}</Text>
        </View>

        <View className='flex-row items-center space-x-1'>
          <Icons.MapPinIcon color='green' opacity={0.4} size={22} />
          <Text className='text-xs text-gray-500'>Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchRestaurantCard;
