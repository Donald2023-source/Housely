import images from "@/constants/images";
import { Button } from "heroui-native";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SuccessPage() {
  return (
    <SafeAreaView className="h-full items-center  justify-center">
      <View className="h-full items-center justify-center">
        <View className="h-[50%] w-[80%] m-auto *:justify-items-stretch justify-center">
          <View className="h-full items-center justify-centers">
            <Image source={images.successImage} />
            <Text className="font-bold text-2xl">Sucess !</Text>
            <Text className="text-center text-lg py-2 text-gray-400">
              You password has been changed. Please log in again with a new
              password.
            </Text>
          </View>

          <Button variant="primary" className="bg-primary mt-4 rounded-lg">
            <Text className="text-white font-semibold">Continue</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
