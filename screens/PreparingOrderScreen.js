import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className=" flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/R.gif")}
        animation="bounceIn"
        iterationCount={1}
        className="h-44 w-60"
      />

      <Animatable.Text
        animation="bounceIn"
        iterationCount={1}
        className=" my-10 text-black font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      <Progress.CircleSnail size={60} indeterminate={true} color="black" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
