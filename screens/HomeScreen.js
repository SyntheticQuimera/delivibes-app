import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/solid";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [searchPress, setSearchPress] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      ..., 
      restaurant[]->{
        ...,
        dishes[]->,
         type-> {
           name
         }
      }
    }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <>
      <SafeAreaView className=" bg-white pt-12 ">
        {/* Header */}

        <View className="flex-row pb-3 items-center justify-between mx-4">
          <View className="flex-1 ">
            <TouchableOpacity className="bg-black rounded-2xl  justify-center  h-8 w-40  ">
              <Text className="font-bold text-white  text-center ">
                Deliver Now!
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row space-x-4 flex-1 justify-end">
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Icons.MagnifyingGlassIcon size={28} color="black" />
            </TouchableOpacity>
            <Icons.UserIcon size={28} color="black" />
            <Icons.AdjustmentsHorizontalIcon size={28} color="black" />
          </View>
        </View>

        <Text className="font-bold text-xl  mx-4 mb-2">
          Current Location
          <Icons.ChevronDownIcon size={20} color="black" />
        </Text>
        {/* Search */}

        {/* Body */}
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} className="bg-gray-50">
        {/* Categories */}
        <Categories />

        {/* Featured */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default HomeScreen;
