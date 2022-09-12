import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import * as Progress from "react-native-progress";
import * as Icons from "react-native-heroicons/solid";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const [destination, setDestination] = useState({
    latitude: restaurant.lat + 0.01,
    longitude: restaurant.long + 0.01,
  });
  const origin = {
    latitude: restaurant.lat,
    longitude: restaurant.long,
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5 mt-8">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Icons.XCircleIcon color="black" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-black text-lg">Order Help</Text>
        </View>
        <View className="bg-black mx-5 my-2 rounded-2xl p-6 z-50 shadow-sm">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-200">Estimated Arrival</Text>
              <Text className="text-4xl font-bold text-white">
                44-55 Minutes
              </Text>
            </View>
          </View>
          <Progress.Bar size={30} color="white" indeterminate={true} />
          <Text className="mt-3 text-gray-300">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        className="flex-1 -mt-12 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="red"
        />
        <Marker
          draggable
          coordinate={destination}
          onDragEnd={(direction) =>
            setDestination(direction.nativeEvent.coordinate)
          }
          pinColor="orangered"
        />
        <Polyline
          coordinates={[origin, destination]}
          strokeColor="black"
          strokeWidth={4}
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-20">
        <Image
          source={require("../assets/avatar.png")}
          className="h-12 w-12 bg-gray-300 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">James Rosch</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
