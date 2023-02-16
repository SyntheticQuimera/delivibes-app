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
import SearchRestaurantCard from "../components/SearchRestaurantCard";

const SearchScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "restaurant"] {
          name,
          short_description,
          image,
          lat,
          long,
          address,
          rating,
          type->,
          dishes[]->{
            name,
            short_description,
            price,
            image
          }
        }`
      )
      .then((data) => {
        setData(data);
        setFilteredData(data);
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
      <View className='bg-white pt-12 '>
        <Animatable.View
          animation='slideInDown'
          iterationCount={1}
          className='flex-row items-center space-x-2 pb-4 mx-4'>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className=' rounded-full bg-black p-2'>
            <Icons.ArrowLeftIcon size={20} color='white' />
          </TouchableOpacity>
          <View className=' flex-1 flex-row items-center space-x-2 bg-gray-50 p-2 rounded-2xl'>
            <Icons.MagnifyingGlassIcon color='gray' size={20} />
            <TextInput
              onChangeText={(event) => {
                searchFilterFunction(event);
              }}
              placeholder='Type Here...'
              keyboardType='default'
            />
          </View>
        </Animatable.View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className='bg-gray-50'>
        <Text className='px-4 py-4 font-bold text-xl'>Restaurants</Text>
        {filteredData?.map((data) => (
          <SearchRestaurantCard
            key={data.id}
            imgUrl={data.image}
            address={data.address}
            title={data.name}
            dishes={data.dishes}
            rating={data.rating}
            short_description={data.short_description}
            genre={data.type?.name}
            long={data.long}
            lat={data.lat}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default SearchScreen;
