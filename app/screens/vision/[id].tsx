
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "@/lib/api";
import { PropertyItem } from "@/types/Properties";
import HouseColorCustomizer from "@/components/VisionCustomizationTool";

export default function VisionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [property, setProperty] = useState<PropertyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Property ID is missing.");
      return;
    }

    let active = true;

    async function fetchProperty() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/property/${id}`);
        const propertyData = response?.data?.data;

        if (!propertyData) {
          throw new Error("Property not found.");
        }

        if (active) setProperty(propertyData);
      } catch (err: any) {
        if (active) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Unable to load this property."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProperty();

    return () => {
      active = false;
    };
  }, [id]);

  const imageUrl = property?.images?.[0];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-row items-center gap-4 border-b border-gray-100 px-5 py-3">
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={24} color="#1F2937" />
        </Pressable>

        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">
            Hously Vision
          </Text>
          <Text className="text-xs text-gray-500">
            Personalise your space
          </Text>
        </View>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#6941C6" />
          <Text className="mt-3 text-sm text-gray-500">
            Loading property...
          </Text>
        </View>
      ) : error || !property ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base font-semibold text-gray-900">
            Couldn't load this property
          </Text>
          <Text className="mt-2 text-center text-sm text-gray-500">
            {error || "The property may no longer be available."}
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-5 rounded-xl bg-[#6941C6] px-5 py-3"
          >
            <Text className="font-semibold text-white">Go back</Text>
          </Pressable>
        </View>
      ) : !imageUrl ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base font-semibold text-gray-900">
            No property photo available
          </Text>
          <Text className="mt-2 text-center text-sm text-gray-500">
            This property needs an image before you can customise its colours.
          </Text>
        </View>
      ) : (
        <HouseColorCustomizer
          propertyId={String(property._id)}
          imageUrl={imageUrl}
        />
      )}
    </SafeAreaView>
  );
}
