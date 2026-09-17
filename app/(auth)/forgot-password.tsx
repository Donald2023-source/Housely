import { OTP } from "@/components/OTP";
import { requestResetCode } from "@/lib/tanstack/auth";
import { EmailSchema } from "@/types/validations";

import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Button, useToast } from "heroui-native";
import { CheckIcon } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

export type resetTokenFormData = z.infer<typeof EmailSchema>;

const ForogotPassword = () => {
  const router = useRouter();
  const [showOtp, setShowOtp] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<resetTokenFormData>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const requestCode = requestResetCode();
  const { toast } = useToast();
  const email = watch("email");

  const sendToken = async (data: resetTokenFormData) => {
    try {
      const result = await requestCode.mutateAsync({
        email: data.email,
      });

      console.log("Signup response:", result);

      if (result.success === true) {
        setShowOtp(true);
        return;
      }

      toast.show({
        variant: "success",
        label: `${result?.message}`,
        icon: <CheckIcon />,
      });
    } catch (error: any) {
      console.log("reset error:", error.response?.data);

      const message =
        error.response?.data?.message ||
        error.response?.data?.data?.message ||
        "Something went wrong";

      toast.show({
        variant: "danger",
        label: message,
        description: "reset token wasn't sent",
      });
    }
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
          <OTP email={email} />
        ) : (
          <ScrollView className="h-full mt-10">
            <View className="w-full mx-auto gap-5 items-center justify-center  flex-1 h-full">
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
                // onPress={() => setShowOtp(true)}
                className="bg-primary w-full mt-4 rounded-lg"
                // onPress={() => router.push("/change-password")}
                onPress={handleSubmit(sendToken)}
              >
                {requestCode.isPending ? (
                  <ActivityIndicator color={"white"} />
                ) : (
                  <Text className="text-white font-semibold">Send Code</Text>
                )}
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForogotPassword;
