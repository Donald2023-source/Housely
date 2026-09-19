import CopyDialog from "@/components/CopyDialog";
import images from "@/constants/images";
import api from "@/lib/api";
import { PropertyItem } from "@/types/Properties";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Heart,
  MapPin,
  Share2,
  Toilet,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PropertyDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [property, setProperty] = useState<PropertyItem | null>(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const fetchProperty = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/property/${id}`);

      const propertyData = res?.data?.data;

      setProperty(propertyData);

      if (propertyData?.images?.length) {
        setActiveImage(propertyData.images[0]);
      }
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

  if (loading) {
    return (
      <View className="flex-1 h-full items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#6941C6" />
      </View>
    );
  }

  if (!property) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold">Property not found</Text>

        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 rounded-full bg-[#6941C6] px-5 py-3"
        >
          <Text className="font-semibold text-white">Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full border border-gray-200"
          >
            <ArrowLeft size={21} color="#1F2937" />
          </TouchableOpacity>

          <Text className="text-base font-semibold text-[#1F2937]">
            Property Details
          </Text>

          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setIsOpen(true)}
              className="h-11 w-11 items-center justify-center rounded-full border border-gray-200"
            >
              <Share2 size={19} color="#1F2937" />
            </TouchableOpacity>

            <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-full border border-gray-200">
              <Heart size={19} color="#1F2937" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Image */}
        <View className="mt-5 px-4">
          <Image
            source={{ uri: activeImage || property.images?.[0] }}
            resizeMode="cover"
            className="h-[280px] w-full rounded-3xl"
          />

          {/* Listing type */}
          <View className="absolute left-7 top-3 rounded-full bg-white px-4 py-2">
            <Text className="text-xs font-semibold capitalize text-[#6941C6]">
              For {property.listingType}
            </Text>
          </View>

          {/* Verified */}
          {property.verified && (
            <View className="absolute right-7 top-3 rounded-full bg-white px-4 py-2">
              <Text className="text-xs font-semibold text-green-600">
                ✓ Verified
              </Text>
            </View>
          )}
        </View>

        {/* Image thumbnails */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 10,
            paddingTop: 12,
          }}
        >
          {property.images?.map((image, index) => {
            const isActive = image === activeImage;

            return (
              <TouchableOpacity
                key={`${image}-${index}`}
                onPress={() => setActiveImage(image)}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: image }}
                  resizeMode="cover"
                  className={`h-20 w-20 rounded-xl ${
                    isActive ? "border-2 border-[#6941C6]" : ""
                  }`}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className="mt-5 px-4">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <Text
                className="text-xl font-bold text-[#1F2937]"
                numberOfLines={2}
              >
                {property.name}
              </Text>

              <View className="mt-2 flex-row items-center">
                <MapPin size={17} color="#9CA3AF" />

                <Text
                  className="ml-1 flex-1 text-sm text-gray-500"
                  numberOfLines={1}
                >
                  {property.location?.address}
                </Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-lg font-bold text-[#6941C6]">
                {property.currency === "NGN" ? "₦" : "$"}
                {property.price?.toLocaleString()}
              </Text>

              {property.listingType === "rent" && (
                <Text className="text-xs text-gray-400">per year</Text>
              )}
            </View>
          </View>
        </View>

        <View className="mx-3 mt-6 rounded-2xl p-4">
          <Text className="mb-4 text-lg font-bold text-[#1F2937]">
            Property Details
          </Text>

          <View className="flex-row justify-between">
            <View className="items-center">
              <View className="mb-2 h-11 w-11 items-center justify-center rounded-full bg-[#6941C6]/10">
                <BedDouble size={21} color="#6941C6" />
              </View>

              <Text className="text-lg font-bold">{property.bedrooms}</Text>

              <Text className="text-xs text-gray-400">Bedrooms</Text>
            </View>

            <View className="items-center">
              <View className="mb-2 h-11 w-11 items-center justify-center rounded-full bg-[#6941C6]/10">
                <Bath size={21} color="#6941C6" />
              </View>

              <Text className="text-lg font-bold">{property.bathrooms}</Text>

              <Text className="text-xs text-gray-400">Bathrooms</Text>
            </View>

            <View className="items-center">
              <View className="mb-2 h-11 w-11 items-center justify-center rounded-full bg-[#6941C6]/10">
                <Toilet size={21} color="#6941C6" />
              </View>

              <Text className="text-lg font-bold">{property.toilets}</Text>

              <Text className="text-xs text-gray-400">Toilets</Text>
            </View>

            {/* Area */}
            <View className="items-center">
              <View className="mb-2 h-11 w-11 items-center justify-center rounded-full bg-[#6941C6]/10">
                <Text className="font-bold text-[#6941C6]">m²</Text>
              </View>

              <Text className="text-lg font-bold">{property.area}</Text>

              <Text className="text-xs text-gray-400">Area</Text>
            </View>
          </View>
        </View>

        <View className="mt-6 px-4">
          <Text className="text-lg font-bold text-[#1F2937]">Description</Text>

          <Text className="mt-2 leading-6 text-gray-500">
            {property.description}
          </Text>
        </View>

        {property.features?.length > 0 && (
          <View className="mt-6 px-4">
            <Text className="text-lg font-bold text-[#1F2937]">
              Features & Amenities
            </Text>

            <View className="mt-3 flex-row flex-wrap gap-2">
              {property.features.map((feature, index) => (
                <View
                  key={`${feature}-${index}`}
                  className="rounded-full bg-[#6941C6]/10 px-4 py-2"
                >
                  <Text className="text-sm font-medium text-[#6941C6]">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View className="mx-4 mt-6 rounded-2xl border border-gray-100 p-4">
          <Text className="mb-4 text-lg font-bold">Agent</Text>

          <View className="flex-row items-center">
            {typeof property.agent !== "string" && property.agent?.avatar ? (
              <Image
                source={{ uri: property.agent.avatar }}
                className="h-14 w-14 rounded-full"
              />
            ) : (
              <View className="h-14 w-14 items-center justify-center rounded-full bg-[#6941C6]/10">
                <Text className="text-lg font-bold text-[#6941C6]">
                  {typeof property.agent !== "string"
                    ? property.agent?.name?.charAt(0)
                    : "A"}
                </Text>
              </View>
            )}

            <View className="ml-3 flex-1">
              <Text className="font-semibold text-[#1F2937]">
                {typeof property.agent !== "string"
                  ? property.agent?.name
                  : "Property Agent"}
              </Text>

              <Text className="mt-1 text-sm text-gray-400">
                Real Estate Agent
              </Text>
            </View>

            <TouchableOpacity className="rounded-full bg-[#6941C6] px-4 py-2.5">
              <Text className="font-semibold text-white">Contact</Text>
            </TouchableOpacity>
          </View>
          <Image
            className="w-full h-[180px] mt-5 rounded-2xl"
            source={images.map}
          />
        </View>
        <CopyDialog
          propertyId={property?._id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <View className=" px-4 py-3">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/screens/Payment/[id]",
                params: {
                  id: property?._id.toString(),
                },
              })
            }
            className="items-center rounded-2xl bg-[#6941C6] py-4"
          >
            <Text className="text-base font-bold text-white">Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
