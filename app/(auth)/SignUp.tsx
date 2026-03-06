import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useAuth } from "@/lib/authContext";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !password || !image) {
      Alert.alert("Error", "Please fill in all fields and select an image");
      return;
    }

    try {
      await signUp(name, email, password, image);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Sign Up Failed", error.message || "An error occurred");
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 100,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Create new account
          </Text>

          <TouchableOpacity onPress={pickImage}>
            <Image
              style={{
                width: 200,
                height: 200,
                marginTop: 50,
                alignSelf: "center",
                borderRadius: 100,
              }}
              source={
                image
                  ? { uri: image }
                  : require("../../assets/images/profile.jpg")
              }
            />
          </TouchableOpacity>

          <Text style={{ textAlign: "center", marginTop: 10, color: "#888" }}>
            Tap image to upload profile photo
          </Text>

          <View style={{ padding: 20, gap: 20 }}>
            <InputField label="Full Name" value={name} onChangeText={setName} />

            <InputField label="Email" value={email} onChangeText={setEmail} />

            <InputField
              label="Password"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />

            <Button text="Sign Up" onPress={handleSignUp} color="#2f9f10" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
