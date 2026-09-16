import useAuth from "@/store/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { GestureResponderEvent, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const url = process.env.EXPO_PUBLIC_API_URL;
  
  return (
    <SafeAreaView className="p-3 font-sans mt-7 flex-1">
      <Text>Sign In component</Text>
    </SafeAreaView>
  );
};

export default SignIn;
