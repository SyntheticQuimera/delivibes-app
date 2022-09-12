import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icons from "react-native-heroicons/solid";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import sanityClient from "../sanity";
import { urlFor } from "../sanity";

const SearchScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
   *[_type == "restaurant" ] 
    `
      )
      .then((data) => {
        try {
          setData(data);
          setFilteredData(data);
        } catch (error) {}
      });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <>
      <View className="bg-white pt-12 ">
        <Animatable.View
          animation="slideInDown"
          iterationCount={1}
          className="flex-row items-center space-x-2 pb-4 mx-4"
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className=" rounded-full bg-black p-2"
          >
            <Icons.ArrowLeftIcon size={20} color="white" />
          </TouchableOpacity>
          <View className=" flex-1 flex-row items-center space-x-2 bg-gray-50 p-2 rounded-2xl">
            <Icons.MagnifyingGlassIcon color="gray" size={20} />
            <TextInput
              onChangeText={(event) => {
                searchFilterFunction(event);
              }}
              placeholder="Type Here..."
              keyboardType="default"
            />
          </View>
        </Animatable.View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-gray-50">
        <Text className="px-4 py-4 font-bold text-xl">Restaurants</Text>

        {filteredData?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate("Restaurant");
            }}
            className="bg-white mx-4 shadow-sm rounded-2xl my-2"
          >
            <View className="flex-row ">
              <Image
                source={{
                  uri: urlFor(item.image).url(),
                }}
                className=" h-full w-20   rounded-l-2xl"
              />

              <View className="ml-4 my-2">
                <Text className="font-bold text">{item.name}</Text>
                <View className="flex-row items-center space-x-1">
                  <Icons.StarIcon color="gold" opacity={0.5} size={22} />
                  <Text className="text-xs text-gray-500">{item.rating}</Text>
                </View>

                <View className="flex-row items-center space-x-1">
                  <Icons.MapPinIcon color="green" opacity={0.4} size={22} />
                  <Text className="text-xs text-gray-500">
                    Nearby · {item.address}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default SearchScreen;
