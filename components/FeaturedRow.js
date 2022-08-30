import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icons from "react-native-heroicons/solid";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";
import restaurant from "../sanity/schemas/restaurant";
const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id == $id
  ] {
   ..., 
   restaurant[]->{
     ...,
     dishes[]->,
      type-> {
        name
      }
   }
 }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurant);
      });
  }, [id]);

  console.log(restaurants);
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <Icons.ArrowRightIcon color="black" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="pt-4"
      >
        {/* RestaurantsCards */}

        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            id={restaurant.id}
            imgUrl={restaurant.image}
            address={restaurant.address}
            title={restaurant.name}
            dishes={restaurant.dishes}
            rating={restaurant.rating}
            short_description={restaurant.short_description}
            genre={restaurant.type?.name}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;