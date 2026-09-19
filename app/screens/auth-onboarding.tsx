import images from "@/constants/images";
import useAuth from "@/store/auth";
import { useRouter } from "expo-router";
import { BottomSheet } from "heroui-native";
import { CheckIcon } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthOnboarding() {
  const router = useRouter();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const locations = ["FCT Abuja", "Port Harcourt", "Jos Plateau"];

  const handleSelect = (item: string) => {
    setSelected(item);
    setIsOpen(false);
    if (selected) {
      router.push("/(root)/(tabs)");
      return console.log("selected");
    }
  };

  return (
    <SafeAreaView>
      <View className="p-3 h-full">
        <TouchableOpacity
          onPress={() => router.push("/sign-in")}
          className="py-3 px-5 rounded-full border border-gray-400 ml-auto"
        >
          <Text className="text-gray-800">Skip</Text>
        </TouchableOpacity>

        <View className="flex-1 gap-4 items-stretch justify-between">
          <View className="flex-1 gap-4 items-center justify-center">
            <Image
              source={images.authOnb}
              className="w-full h-[280px]"
              resizeMode="contain"
            />

            <Text className="text-4xl font-bold leading-11 w-[90%] mt-3 text-center mx-auto">
              Hi {user?.name}, Nice to meet you!
            </Text>
            <Text className="tracking-wide text-lg text-gray-500 font-light w-[85%] leading-relaxed text-center mx-auto">
              Choose your location to find property around you
            </Text>
          </View>

          <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
            <BottomSheet.Trigger asChild>
              <TouchableOpacity className="p-5 mx-auto w-[80%] bg-primary rounded-lg">
                <Text className="text-white text-center font-semibold">
                  {selected || "Select Active Location"}
                </Text>
              </TouchableOpacity>
            </BottomSheet.Trigger>

            <BottomSheet.Portal>
              <BottomSheet.Overlay
                variant="blur"
                blurViewProps={{
                  intensity: 40,
                  tint: "dark",
                }}
              />
              <BottomSheet.Content className="bg-white">
                <BottomSheet.Title>Choose your location</BottomSheet.Title>

                <View className="gap-1 mt-4 mb-6">
                  {locations.map((item) => {
                    const isSelected = selected === item;

                    return (
                      <TouchableOpacity
                        key={item}
                        className="py-3.5 px-1 flex-row items-center justify-between"
                        onPress={() => handleSelect(item)}
                        activeOpacity={0.7}
                      >
                        <Text
                          className={`text-base ${
                            isSelected
                              ? "font-semibold text-primary"
                              : "font-medium text-gray-800"
                          }`}
                        >
                          {item}
                        </Text>
                        {isSelected && <CheckIcon size={20} color="#000" />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </BottomSheet.Content>
            </BottomSheet.Portal>
          </BottomSheet>
        </View>
      </View>
    </SafeAreaView>
  );
}
