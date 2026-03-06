import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await signIn(email, password);
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Sign In Failed", error.message || "An error occurred");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6">
            <Text className="text-2xl font-bold text-center mb-8">
              Sign In to CampusLink
            </Text>

            <InputField label="Email" value={email} onChangeText={setEmail} />

            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button text="Sign In" onPress={handleSignIn} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
