import { useChangePassword } from "@/lib/tanstack/auth";
import useAuth from "@/store/auth";
import { ResetPasswordSchema } from "@/types/validations";

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

type RegisterFormData = z.infer<typeof ResetPasswordSchema>;

export default function ChangePassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { toast } = useToast();
  const { login } = useAuth();
  const changePassword = useChangePassword();
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async (data: RegisterFormData) => {
    try {
      console.log("Signup data:", data);
      if (data.password != confirmPassword) {
        toast.show({
          variant: "danger",
          label: "Passwords do not match!",
          description: "Password change wasn't successul",
        });
      }

      const result = await changePassword.mutateAsync({
        password: data.password,
      });

      if (changePassword.isError) {
        console.log("error", changePassword.error);
      }

      if (result?.success === true) {
        console.log(result);
        toast.show({
          variant: "success",
          label: "Password changed successully!",
          description: "Welcome back",
          icon: <CheckIcon />,
        });
        login({
          name: result?.user?.name,
          email: result?.user?.email,
          isSignedIn: true,
        });
        router.push("/(root)/(tabs)");
      }
      // TODO: send data to your backend
      // await axios.post(`${API_URL}/auth/register`, data);

      // After successful registration
      // router.push("/sign-in");
    } catch (error: unknown | any) {
      console.log("Signup error:", error.response?.data);

      const message =
        error.response?.data?.message ||
        error.response?.data?.data?.message ||
        "Something went wrong";

      toast.show({
        variant: "danger",
        label: message,
        description: "signup wasn't successful!",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-4 mt-10">
        {/* Back button */}
        <Ionicons onPress={() => router.back()} name="arrow-back" size={28} />

        {/* Form */}
        <View className="mt-5">
          {/* Header */}
          <View className="w-[80%] mt-5 gap-2">
            <Text className="text-2xl font-inter font-semibold">
              Create New Password !
            </Text>

            <Text className="text-gray-400 font-inter tracking-wide">
              Please entaer a new password to change
            </Text>
          </View>

          {/* Main form */}
          <View className="mt-8 flex-col gap-5">
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
              </View>
            </View>

            <View className="gap-2">
              <Text className="font-inter font-semibold">Confirm Password</Text>

              <View className="p-4 border border-gray-300 flex-row justify-between rounded-xl items-center">
                <TextInput
                  placeholder="**********"
                  placeholderTextColor="#9DA4AE"
                  className="flex-1 tracking-widest rounded-lg"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"

                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                />
                <Ionicons
                  onPress={() => setShowPassword(!showPassword)}
                  size={25}
                  color="gray"
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                />
              </View>

              {errors.password && (
                <Text className="text-red-500 text-sm">
                  {errors.password.message}
                </Text>
              )}
            </View>
            <Button
              variant="primary"
              className="bg-primary mt-4 rounded-lg"
              onPress={handleSubmit(resetPassword)}
              // onPress={() => router.push("/success")}
            >
              {changePassword.isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold">
                  Change Password
                </Text>
              )}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
