import { View, Image, Text, Pressable } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const Landing = () => {
    const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        style={{ width: "100%", height: 600 }}
        source={require("../assets/images/login.png")}
      />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 40,
            fontFamily: "FiraSans-MediumItalic",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Welcom to Campus Link
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "FiraSans-MediumItalic",
            textAlign: "center",
            paddingTop: 15,
            color: "grey",
          }}
        >
          Your one-stop platform for seamless campus communication and
          connection.
        </Text>
        <Button text="Get Started" onPress={() => router.push("/(auth)/SignUp")} color="#2f9f10" />
        <Pressable onPress={()=>router.push("/(auth)/SignIn")}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Text style={{ color: "grey", fontSize: 15 }}>
            Already have an account?{" "}
          </Text>
          <Text style={{ color: "#2f9f10", fontSize: 15, fontWeight: "bold" }}>
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Landing;
