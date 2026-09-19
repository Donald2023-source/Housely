import api from "@/lib/api";
import { PropertyItem } from "@/types/Properties";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function PaymentDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyItem | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchProperty = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/property/${id}`);

      const propertyData = res?.data?.data;

      setProperty(propertyData);
      console.log("Property Data", propertyData);
    } catch (error) {
      console.log("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (!property) {
    return (
      <View className="h-full flex items-center justify-center">
        <ActivityIndicator size="large" color={"#7F56D9"} />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View>
        <View className="flex-row items-center justify-between pt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full border border-gray-200"
          >
            <ArrowLeft size={21} color="#1F2937" />
          </TouchableOpacity>

          <Text className="text-base font-semibold text-[#1F2937]">
            Payment Details
          </Text>
          <View />
        </View>
      </View>

      <View>
        <Text className="text-primary">{property?.name}</Text>
      </View>
    </SafeAreaView>
  );
}
