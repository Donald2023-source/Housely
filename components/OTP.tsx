import { Button, InputOTP } from "heroui-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export function OTP() {
  const [value, setValue] = useState("");

  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@");

    if (!username || !domain) return email;

    const visibleCharacters = username.slice(0, 2);

    return `${visibleCharacters}***@${domain}`;
  };

  return (
    <ScrollView className="flex-1 mt-10 w-[85%] mx-auto h-full">
      <View className=" gap-2">
        <Text className="text-2xl font-inter font-semibold">
          Verify Your Email !
        </Text>

        <Text className="text-gray-400 text-lg font-inter tracking-tight">
          Please enter 6 digit verification that have been sent to your email
          address
        </Text>
      </View>
      <InputOTP
        className="w-full mt-8"
        value={value}
        onChange={setValue}
        maxLength={6}
      >
        <InputOTP.Group>
          <InputOTP.Slot className="bg-gray-400" index={0} />
          <InputOTP.Slot className="bg-gray-400" index={1} />
          <InputOTP.Slot className="bg-gray-400" index={2} />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot className="bg-gray-400" index={3} />
          <InputOTP.Slot className="bg-gray-400" index={4} />
          <InputOTP.Slot className="bg-gray-400" index={5} />
        </InputOTP.Group>
      </InputOTP>

      <View className="items-center justify-center gap-2 my-5">
        <Text>Didn&apos;t recieve code?</Text>
        <TouchableOpacity>
          <Text className="text-red-500 ">Resend Code</Text>
        </TouchableOpacity>
      </View>

      <Button variant="primary" className="bg-primary mt-6 rounded-lg">
        <Text className="text-white font-semibold">Verify</Text>
      </Button>
    </ScrollView>
  );
}
