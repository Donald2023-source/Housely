import { useFetchProperties } from "@/lib/tanstack/property/property";
import { useRouter } from "expo-router";
import { ArrowLeft, Heart, MapPin } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Featured() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const Properties = useFetchProperties();
  console.log(Properties);
  return (
    <SafeAreaView className="w-full">
      <View className="px-4">
        <View className="flex-row items-center justify-between pt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full border border-gray-200"
          >
            <ArrowLeft size={21} color="#1F2937" />
          </TouchableOpacity>

          <Text className="text-base font-semibold text-[#1F2937]">
            Featured Products
          </Text>
          <View />
        </View>
      </View>

      <FlatList
        data={Properties?.data}
        scrollEnabled={false}
        keyExtractor={(item) => String(item?._id)}
        refreshing={Properties.isFetching}
        onRefresh={Properties.refetch}
        columnWrapperStyle={{
          gap: 12,
          marginBottom: 16,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/screens/property/[id]",
                params: {
                  id: item?._id.toString(),
                },
              })
            }
            activeOpacity={0.9}
            className="w-full my-3 px-4"
          >
            <View className="flex-row border-b gap-3 overflow-hidden h-fit border-gray-100">
              <View className="relative  h-fit">
                <Image
                  source={{ uri: item.images[0] }}
                  resizeMode="cover"
                  className="h-24 rounded-2xl w-24"
                />
              </View>

              <View className="p-3 flex-1 gap-1">
                <View className="flex-row items-center justify-between">
                  <Text className="font-semibold text-lg">
                    {item.name.slice(0, 20) + "..."}
                  </Text>
                  <Heart />
                </View>
                <View className="flex-row gap-2 items-center">
                  <MapPin color={"gray"} />
                  <Text className="text-gray-400 text-base">
                    {item.location?.address}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="font-semibold text-primary">
                    {" "}
                    {item.price?.toLocaleString()}
                  </Text>
                  <Text className="text-gray-400 text-base font-semibold">
                    {"4.5"}
                  </Text>
                </View>
              </View>
            </View>
            <View className="border-b border-gray-200 py-1" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
