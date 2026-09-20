import images from "@/constants/images";
import { useFetchProperties } from "@/lib/tanstack/property/property";
import { useRouter } from "expo-router";
import { useToast } from "heroui-native";

import {
  BellDot,
  Heart,
  MapPin,
  MessageCircleMore,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";

import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

// const [Properties, setProperties] = useState<PropertyItem[]>([]);

export default function Index() {
  const Properties = useFetchProperties();
  const { toast } = useToast();
  const router = useRouter();
  // console.log(Properties);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="px-3">
        <View className="flex-row justify-between items-center">
          <View className="flex-row gap-3 items-center">
            <MapPin fill="#6941C6" color="#d1d5dc" size={38} />

            <View>
              <Text className="text-xs text-gray-400">Your location</Text>

              <Text className="text-base font-semibold">FCT, Abuja</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => router.push("/screens/notifications/notifications")}
              className="p-2.5 border border-gray-300 rounded-full"
            >
              <BellDot color="#1F2A37" size={22} />
            </TouchableOpacity>

            <TouchableOpacity className="p-2.5 border border-gray-300 rounded-full">
              <MessageCircleMore color="#1F2A37" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/search")}
          className="p-4 mt-5 rounded-2xl border border-gray-300 flex-row justify-between items-center"
        >
          <View className="flex-row items-center gap-3">
            <Search color="#6941C6" size={21} />

            <Text className="text-gray-400">Search property...</Text>
          </View>

          <SlidersHorizontal color="#6941C6" size={21} />
        </TouchableOpacity>

        <View className="w-full rounded-2xl mt-4 relative h-[140px] overflow-hidden">
          <Image
            className="w-full h-full"
            resizeMode="cover"
            source={images.promoImg}
          />

          <View className="absolute px-4 gap-3 justify-center inset-0">
            <Text className="text-white text-xl font-bold w-[45%] tracking-wide">
              GET YOUR 20% CASHBACK
            </Text>

            <Text className="text-white text-xs">Expired 25 Aug 2022</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-6">
          <Text className="text-xl font-bold">Featured Properties</Text>

          <TouchableOpacity
            onPress={() => router.push("/screens/FeaturedProperty")}
          >
            <Text className="text-[#6941C6] font-semibold">See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={Properties?.data}
          keyExtractor={(item) => String(item?._id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 16,
            paddingVertical: 16,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.9} className="w-[290px]">
              {/* Image */}
              <View className="relative">
                <Image
                  source={{ uri: item.images[0] }}
                  resizeMode="cover"
                  className="w-full h-[230px] rounded-2xl"
                />

                <View className="absolute bg-black/40 rounded-2xl w-full h-full backdrop-blur-lg" />

                <View className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full">
                  <Text className="text-xs font-semibold text-[#6941C6]">
                    {item.price.toLocaleString()}
                  </Text>
                </View>
              </View>
              <View className="flex-row mt-3 px-3 absolute gap-2 bottom-5 items-center justify-between w-full">
                <View className="">
                  <Text
                    className="text-white text-lg font-bold"
                    numberOfLines={1}
                  >
                    {item.name.slice(0, 8)}
                  </Text>

                  <View className="flex-row gap-2 items-center">
                    <MapPin size={20} color={"gray"} />
                    <Text className="text-gray-200">
                      {item.location?.address}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="w-8 items-center justify-center  h-8  bg-white p-2 rounded-full">
                  <Heart size={15} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />

        <View className="mt-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-[#1F2937]">Nearby</Text>

            <TouchableOpacity>
              <Text className="text-[#6941C6] text-base font-medium">
                See all
              </Text>
            </TouchableOpacity>
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
                className="flex-1 my-3"
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
                    <Text className="font-semibold text-base">{item.name}</Text>
                    <View className="flex-row gap-2 items-center">
                      <MapPin size={18} color={"gray"} />
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
              </TouchableOpacity>
            )}
          />
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
