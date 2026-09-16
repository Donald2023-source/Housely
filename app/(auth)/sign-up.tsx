import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    console.log("Handle Signup");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4">
        <Ionicons name="arrow-back" size={28} />
        {/* form */}{" "}
        <View>
          <View className="w-[80%] mt-5 gap-2">
            <Text className="text-2xl font-inter font-semibold ">
              Register Account
            </Text>
            <Text className="text-gray-400 tracking-wide">
              Sign in with your email and password or social media to continue
            </Text>
          </View>
          {/* Main form container*/}
          <View className="mt-8 flex-col gap-5">
            {/* Email */}
            <View className="gap-2">
              <Text className="font-inter font-semibold">Email</Text>
              <TextInput
                placeholder="brokyln@gmail.com"
                placeholderTextColor={"#9DA4AE"}
                className="border border-gray-300 p-5 rounded-xl"
              />
            </View>

            {/* Username */}
            <View className="gap-2">
              <Text className="font-inter font-semibold">UserName</Text>
              <TextInput
                placeholder="Username"
                placeholderTextColor={"#9DA4AE"}
                className="border border-gray-300 p-5 rounded-xl"
              />
            </View>

            {/* Password */}
            <View className="gap-2">
              <Text className="font-inter font-semibold">Password</Text>
              <View className="p-4 border border-gray-300 flex-row justify-between rounded-xl items-center">
                <TextInput
                  placeholder="**********"
                  placeholderTextColor={"#9DA4AE"}
                  className="tracking-widest rounded-lg"
                  secureTextEntry={!showPassword}
                />
                {showPassword ? (
                  <Ionicons
                    onPress={() => setShowPassword(!showPassword)}
                    size={25}
                    name="eye-outline"
                    color="gray"
                  />
                ) : (
                  <Ionicons
                    onPress={() => setShowPassword(!showPassword)}
                    color="gray"
                    size={25}
                    name="eye-off-outline"
                  />
                )}
              </View>

              <Button className="bg-primary rounded-lg" variant="primary">
                Sign Up{" "}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
