import { OTP } from "@/components/OTP";
import { LoginSchema } from "@/types/validations";

import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

type RegisterFormData = z.infer<typeof LoginSchema>;

const ForogotPassword = () => {
  const router = useRouter();
  const [showOtp, setShowOtp] = useState(false);

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
    <SafeAreaView className="flex-1 h-full">
      <View className="px-4 h-full">
        {/* Back button */}
        <Ionicons
          className="mt-10"
          onPress={() => router.back()}
          name="arrow-back"
          size={28}
        />

        {/* Emter Email */}
        {showOtp ? (
          <OTP />
        ) : (
          <View className="h-full">
            <View className="w-[85%] mx-auto gap-5 items-center justify-center flex-1 h-full">
              {/* Header */}
              <View className="w-full gap-2">
                <Text className="text-2xl font-inter font-semibold">
                  Forogot Password !
                </Text>

                <Text className="text-gray-400 font-inter tracking-wide">
                  Select which contact details should we use to reset your
                  password
                </Text>
              </View>

              <View className="w-full">
                <Text className="text-lg font-semibold py-1">Email</Text>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="brokyln@gmail.com"
                      placeholderTextColor="#9DA4AE"
                      className="border w-full border-gray-300 p-5 rounded-xl"
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
              <Button
                variant="primary"
                className="bg-primary w-full mt-4 rounded-lg"
              >
                <Text className="text-white font-semibold">Send Code</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForogotPassword;
