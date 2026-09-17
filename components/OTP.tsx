import { useValidateCode } from "@/lib/tanstack/auth";
import { useRouter } from "expo-router";
import { Button, InputOTP, useToast } from "heroui-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export function OTP({ email }: { email: string }) {
  const [value, setValue] = useState("");
  const router = useRouter();
  console.log(email);

  const validate = useValidateCode();
  const { toast } = useToast();
  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@");

    if (!username || !domain) return email;

    const visibleCharacters = username.slice(0, 2);

    return `${visibleCharacters}***@${domain}`;
  };
  const handleVerify = async () => {
    if (value.length !== 6) {
      toast.show({
        variant: "warning",
        label: "Invalid code",
        description: "Please enter the 6-digit verification code.",
      });

      return;
    }

    try {
      const result = await validate.mutateAsync({
        email,
        token: value,
      });

      console.log("Verification result:", result);

      if (result.success === true) {
        router.push("/change-password");
      }

      toast.show({
        variant: "success",
        label: "Code verified",
        description: "You can now reset your password.",
      });


    } catch (error: any) {
      console.log("Verification error:", error.response?.data);

      const message =
        error.response?.data?.message ||
        error.response?.data?.data?.message ||
        "Something went wrong";

      toast.show({
        variant: "danger",
        label: "Verification failed",
        description: message,
      });
    }
  };

  return (
    <ScrollView className="flex-1 mt-10 w-[95%]  mx-auto h-full">
      <View className="gap-2">
        <Text className="text-2xl font-inter font-semibold">
          Verify Your Email !
        </Text>

        <Text className="text-gray-400 text-lg font-inter tracking-tight">
          {`Please enter 6 digit verification that have been sent to  ${maskEmail(email)}`}
        </Text>
      </View>
      <InputOTP
        className="w-fit px-1 mt-8"
        value={value}
        onChange={setValue}
        maxLength={6}
      >
        <InputOTP.Group>
          <InputOTP.Slot className="bg-gray-200" index={0} />
          <InputOTP.Slot className="bg-gray-200" index={1} />
          <InputOTP.Slot className="bg-gray-200" index={2} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot className="bg-gray-200" index={3} />
          <InputOTP.Slot className="bg-gray-200" index={4} />
          <InputOTP.Slot className="bg-gray-200" index={5} />
        </InputOTP.Group>
      </InputOTP>

      <View className="items-center justify-center gap-2 my-5">
        <Text>Didn&apos;t recieve code?</Text>
        <TouchableOpacity>
          <Text className="text-red-400 ">Resend Code</Text>
        </TouchableOpacity>
      </View>

      <Button
        onPress={handleVerify}
        variant="primary"
        className="bg-primary mt-6 rounded-lg"
        isDisabled={validate.isPending}
      >
        <Text className="text-white font-semibold">
          {validate.isPending ? "Verifying..." : "Verify"}
        </Text>
      </Button>
    </ScrollView>
  );
}
