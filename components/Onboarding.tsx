import { onboardingData } from "@/constants/Onboarding-data";
import { OnboardingItem } from "@/types";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding({
  item,
  next,
  active,
}: {
  item: OnboardingItem;
  next: () => void;
  active: number;
}) {
  const router = useRouter();
  return (
    <View className="p-3 h-full ">
      <TouchableOpacity
        onPress={() => router.push("/sign-in")}
        className="py-3 px-5 rounded-full text-gray-300 border border-gray-400 ml-auto"
      >
        <Text className="text-gray-800">Skip</Text>
      </TouchableOpacity>

      <View className="flex-1 gap-4 items-center justify-center">
        <Image source={item.image} resizeMode="contain" />

        <Text className="text-4xl font-bold leading-11 w-[85%] mt-3 text-center mx-auto ">
          {item.name}
        </Text>
        <Text className="tracking-wide  text-gray-500 font-light w-[85%] leading-relaxed text-center mx-auto">
          {item.description}
        </Text>

        <View className="flex-row justify-center items-center mt-3">
          {onboardingData?.map((_: any, index: any) => (
            <View
              key={index}
              className={`mx-1 rounded-full ${
                index === active ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-gray-300"
              }`}
            />
          ))}
        </View>
        <View className="w-full mt-7 flex-col gap-5">
          <TouchableOpacity
            onPress={next}
            className="p-5 mx-auto w-[80%]  bg-primary rounded-lg"
          >
            <Text className="text-white text-center font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
