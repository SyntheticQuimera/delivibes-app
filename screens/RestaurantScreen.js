import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import * as Icons from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
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
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView showsVerticalScrollIndicator={false} className="bg-gray-50">
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-300 absolute"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="absolute top-10 left-5 p-2 mt-2 bg-white rounded-full"
          >
            <Icons.ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View className="bg-white rounded-t-3xl mt-48">
          <View className="px-4 pt-4">
            <Text className="font-bold text-3xl">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Icons.StarIcon color="gold" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text>{rating}</Text> · {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <Icons.MapPinIcon color="green" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  {" "}
                  Nearby · {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 justify-between p-4 border-y border-gray-300">
            <Icons.QuestionMarkCircleIcon
              color="black"
              opacity={0.6}
              size={20}
            />
            <Text className=" pr-28">Have a food allergy?</Text>
            <Icons.ChevronRightIcon color="black" />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-6 pt-6 mb-4 font-bold text-xl">Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
