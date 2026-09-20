import { useFetchProperties } from "@/lib/tanstack/property/property";
import { useRouter } from "expo-router";
import { Chip } from "heroui-native";
import { MapPin } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpcomingTab() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const Properties = useFetchProperties();
  return (
    <SafeAreaView>
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
            className="w-full"
          >
            <View className="flex-row  gap-3 overflow-hidden h-fit ">
              <View className="relative  h-fit">
                <Image
                  source={{ uri: item.images[0] }}
                  resizeMode="cover"
                  className="h-18 rounded-2xl w-18"
                />
              </View>

              <View className="px-3 flex-1 gap-2">
                <View className="flex-row">
                  <Text className="font-medium text-black/60 text-[15px]">
                    {item.name.slice(0, 20) + "..."}
                  </Text>
                </View>
                <View className="flex-row gap-1 items-center">
                  <MapPin size={15} color={"gray"} />
                  <Text className="text-gray-400">
                    {item.location?.address}
                  </Text>
                </View>
                <View className="flex-row gap-1 justify-between items-center">
                  <Text>12 Aug - 14 Aug</Text>
                  <Chip
                    variant="tertiary"
                    color="warning"
                    className="text-gray-400"
                  >
                    <Chip.Label>Waiting</Chip.Label>
                  </Chip>
                </View>
              </View>
            </View>
            <View className="border-b border-gray-100 my-4" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
