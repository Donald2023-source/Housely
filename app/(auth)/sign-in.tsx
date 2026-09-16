import images from "@/constants/images";
import { LoginSchema } from "@/types/validations";

import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

type RegisterFormData = z.infer<typeof LoginSchema>;

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",

      password: "",
    },
  });

  const handleSignUp = async (data: RegisterFormData) => {
    console.log("Signup data:", data);

    // TODO: send data to your backend
    // await axios.post(`${API_URL}/auth/register`, data);

    // After successful registration
    // router.push("/sign-in");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4 mt-10">
        {/* Back button */}
        <Ionicons onPress={() => router.back()} name="arrow-back" size={28} />

        {/* Form */}
        <View className="mt-5">
          {/* Header */}
          <View className="w-[80%] mt-5 gap-2">
            <Text className="text-2xl font-inter font-semibold">
              Welcome Back !
            </Text>

            <Text className="text-gray-400 font-inter tracking-wide">
              Sign in with your email and password or social media to continue
            </Text>
          </View>

          {/* Main form */}
          <View className="mt-8 flex-col gap-5">
            {/* Email */}
            <View className="gap-2">
              <Text className="font-inter font-semibold">Email</Text>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="brokyln@gmail.com"
                    placeholderTextColor="#9DA4AE"
                    className="border border-gray-300 p-5 rounded-xl"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              {errors.email && (
                <Text className="text-red-500 text-sm">
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Password */}
            <View className="gap-2">
              <Text className="font-inter font-semibold">Password</Text>

              <View className="p-4 border border-gray-300 flex-row justify-between rounded-xl items-center">
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="**********"
                      placeholderTextColor="#9DA4AE"
                      className="flex-1 tracking-widest rounded-lg"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />

                <Ionicons
                  onPress={() => setShowPassword(!showPassword)}
                  size={25}
                  color="gray"
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                />
              </View>

              <TouchableOpacity
                onPress={() => router.push("/forgot-password")}
                className="ml-auto py-1"
              >
                <Text className="text-primary font-semibold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {errors.password && (
                <Text className="text-red-500 text-sm">
                  {errors.password.message}
                </Text>
              )}
            </View>

            <Button
              variant="primary"
              className="bg-primary mt-4 rounded-lg"
              onPress={handleSubmit(handleSignUp)}
            >
              <Text className="text-white font-semibold">Sign In</Text>
            </Button>

            <Text className="font-semibold text-center text-gray-400">Or</Text>

            {/* Google */}
            <TouchableOpacity
              activeOpacity={0.7}
              className="h-13 p-4 bg-primary/20 rounded-full mx-auto w-13"
            >
              <Image className="h-full w-full" source={images.googleIcon} />
            </TouchableOpacity>

            {/* Sign in */}
            <View className="flex-row items-center gap-1 justify-center">
              <Text className="text-lg text-gray-400">
                Don&apos;t Have an account?
              </Text>

              <TouchableOpacity onPress={() => router.push("/sign-in")}>
                <Text className="font-semibold text-lg text-primary">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
