import api from "@/lib/api";
import { PropertyItem } from "@/types/Properties";
import { useRouter } from "expo-router";
import { MapPin, Search, Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<PropertyItem[]>([]);

  useEffect(() => {
    if (!search.trim()) {
      setProperties([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await api.post("/property/search", {
          query: search.trim(),
        });

        setProperties(res.data.data);
      } catch (error) {
        console.error("Search error:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Search */}
      <View className="px-3">
        <View className="mt-5 flex-row items-center rounded-2xl border border-gray-300 px-4">
          <Search color="#6941C6" size={21} />

          <TextInput
            value={search}
            onChangeText={setSearch}
            className="ml-3 flex-1 py-4"
            placeholder="Search Property ..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Loading */}
      {loading ? (
        <View className="mt-8 items-center justify-center">
          <ActivityIndicator color="#6941C6" />
        </View>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingBottom: 30,
          }}
          ListHeaderComponent={
            properties.length > 0 ? (
              <Text className="py-4 text-lg font-semibold">
                Results ({properties.length})
              </Text>
            ) : null
          }
          ListEmptyComponent={
            search.trim() ? (
              <View className="items-center py-10">
                <Text className="text-base font-medium text-gray-700">
                  No properties found
                </Text>

                <Text className="mt-1 text-sm text-gray-400">
                  Try another search
                </Text>
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              className="mb-4"
              onPress={() => {
                router.push({
                  pathname: "/screens/property/[id]",
                  params: {
                    id: item._id.toString(),
                  },
                });
              }}
            >
              <View className="flex-row items-center gap-3 overflow-hidden border-b border-gray-100 pb-4">
                <Image
                  source={{
                    uri: item.images?.[0],
                  }}
                  resizeMode="cover"
                  className="h-28 w-28 rounded-2xl"
                />

                <View className="flex-1 gap-2  py-1">
                  <Text className="text-base font-semibold" numberOfLines={1}>
                    {item.name}
                  </Text>

                  <View className="flex-row items-center gap-1">
                    <MapPin size={15} color="gray" />

                    <Text
                      className="flex-1 text-sm text-gray-400"
                      numberOfLines={1}
                    >
                      {item.location?.address}
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <Text className="font-semibold">
                      {item.currency === "NGN" ? "₦" : "$"}
                      {item.price?.toLocaleString()}
                    </Text>

                    <View className="flex-row items-center gap-1">
                      <Star size={14} color="#F59E0B" fill="#F59E0B" />

                      <Text className="text-sm font-semibold text-gray-500">
                        {item.rating}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
