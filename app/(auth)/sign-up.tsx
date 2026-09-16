import images from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button, Checkbox } from "heroui-native";
import { CheckIcon } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const handleSignUp = async () => {
    console.log("Handle Signup");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4 mt-10">
        <Ionicons onPress={() => router.back()} name="arrow-back" size={28} />
        {/* form */}
        <View className="mt-5">
          <View className="w-[80%] mt-5 gap-2">
            <Text className="text-2xl font-inter font-semibold ">
              Register Account
            </Text>
            <Text className="text-gray-400 font-inter tracking-wide">
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
                keyboardType="email-address"
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
            </View>
            {/* Checkbox */}

            <View className="flex-row items-center gap-4">
              <Checkbox
                isSelected={isSelected}
                onSelectedChange={setIsSelected}
                variant="primary"
                className="bg-gray-400"
              >
                <Checkbox.Indicator className="bg-primary">
                  {({ isSelected }) =>
                    isSelected ? <CheckIcon color="white" /> : null
                  }
                </Checkbox.Indicator>
              </Checkbox>
              <Text className="font-inter text-lg">
                Accept Terms and Conditions
              </Text>
            </View>

            <Button
              variant="primary"
              className="bg-primary mt-4 rounded-lg font-semibold"
            >
              Sign In
            </Button>

            <Text className="font-semibold text-center text-gray-400 ">Or</Text>

            <View className="h-13 p-4 bg-primary/20 rounded-full mx-auto w-13">
              <Image className="h-full w-full" source={images.googleIcon} />
            </View>

            <View className="text-gray-400 flex-row items-center justify-center">
              <Text> Already Have an account? </Text>
              <TouchableOpacity>
                <Text className="font-semibold text-primary">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
