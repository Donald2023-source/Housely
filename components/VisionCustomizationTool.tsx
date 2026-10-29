
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const PAINT_COLORS = [
  { name: "Pure White", hex: "#F5F5F0", category: "Neutrals" },
  { name: "Cream", hex: "#F2E1C2", category: "Neutrals" },
  { name: "Sand Beige", hex: "#D4B996", category: "Neutrals" },
  { name: "Warm Grey", hex: "#A6A6A0", category: "Neutrals" },
  { name: "Sage Green", hex: "#A3B18A", category: "Greens" },
  { name: "Olive Green", hex: "#80865A", category: "Greens" },
  { name: "Sky Blue", hex: "#91B8D8", category: "Blues" },
  { name: "Deep Blue", hex: "#345B83", category: "Blues" },
  { name: "Terracotta", hex: "#C4775A", category: "Warm colours" },
  { name: "Soft Peach", hex: "#E9B7A0", category: "Warm colours" },
  { name: "Slate Grey", hex: "#7B8187", category: "Darks" },
  { name: "Charcoal", hex: "#41464B", category: "Darks" },
];

type HouseColorCustomizerProps = {
  propertyId: string;
  imageUrl: string;
  accessToken?: string;
};

export default function HouseColorCustomizer({
  propertyId,
  imageUrl,
  accessToken,
}: HouseColorCustomizerProps) {
  const [selectedColor, setSelectedColor] = useState(PAINT_COLORS[0]);
  const [surface, setSurface] = useState<"exterior_wall" | "interior_wall">(
    "exterior_wall"
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generatePreview() {
    if (!API_URL) {
      setError("Configure EXPO_PUBLIC_API_URL in your environment.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/api/vision/customize`,
        {
          propertyId,
          color: selectedColor.hex,
          surface,
        },
        {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
          timeout: 120000,
        }
      );

      // The backend returns a URL for the newly generated preview.
      // It must not replace the original property image.
      setPreviewUrl(response.data.previewUrl);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ??
            "Could not generate the preview. Please try again."
        );
      } else {
        setError("Something went wrong while generating the preview.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-2xl font-bold text-gray-900">
        Hously Vision
      </Text>

      <Text className="mt-2 text-sm text-gray-500">
        Explore paint colours and visualise a new look for this property.
      </Text>

      <View className="mt-5 overflow-hidden rounded-2xl bg-gray-100">
        <Image
          source={{ uri: previewUrl || imageUrl }}
          className="h-64 w-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-2">
          <Text className="text-xs font-medium text-white">
            {previewUrl ? "Colour preview" : "Original property photo"}
          </Text>
        </View>
      </View>

      <Text className="mt-6 text-base font-semibold text-gray-900">
        Which surface?
      </Text>

      <View className="mt-3 flex-row gap-3">
        {[
          { label: "Exterior walls", value: "exterior_wall" },
          { label: "Interior walls", value: "interior_wall" },
        ].map((item) => {
          const active = surface === item.value;

          return (
            <Pressable
              key={item.value}
              onPress={() => {
                setSurface(
                  item.value as "exterior_wall" | "interior_wall"
                );
                setPreviewUrl(null);
              }}
              className={`rounded-xl border px-4 py-3 ${
                active
                  ? "border-violet-600 bg-violet-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  active ? "text-violet-700" : "text-gray-700"
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text className="mt-6 text-base font-semibold text-gray-900">
        Choose a paint colour
      </Text>

      <View className="mt-4 flex-row flex-wrap gap-x-4 gap-y-5">
        {PAINT_COLORS.map((color) => {
          const active = selectedColor.hex === color.hex;

          return (
            <Pressable
              key={color.hex}
              onPress={() => {
                setSelectedColor(color);
                setPreviewUrl(null);
                setError("");
              }}
              accessibilityRole="button"
              accessibilityLabel={`Select ${color.name}`}
              accessibilityState={{ selected: active }}
              className="w-[21%] items-center"
            >
              <View
                className={`h-14 w-14 items-center justify-center rounded-full ${
                  active
                    ? "border-[3px] border-violet-600"
                    : "border border-gray-200"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {active && (
                  <View className="h-3 w-3 rounded-full bg-white/90" />
                )}
              </View>

              <Text
                numberOfLines={2}
                className="mt-2 text-center text-xs text-gray-700"
              >
                {color.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-4 rounded-xl bg-gray-50 p-4">
        <Text className="text-sm font-medium text-gray-800">
          Selected: {selectedColor.name}
        </Text>
        <Text className="mt-1 text-xs text-gray-500">
          {selectedColor.hex} · {surface === "exterior_wall" ? "Exterior walls" : "Interior walls"}
        </Text>
      </View>

      {error ? (
        <Text className="mt-3 text-sm text-red-600">{error}</Text>
      ) : null}

      <Pressable
        onPress={generatePreview}
        disabled={loading}
        className={`mt-5 items-center rounded-xl px-5 py-4 ${
          loading ? "bg-violet-400" : "bg-violet-600"
        }`}
      >
        {loading ? (
          <View className="flex-row items-center gap-2">
            <ActivityIndicator color="#FFFFFF" />
            <Text className="font-semibold text-white">
              Generating preview...
            </Text>
          </View>
        ) : (
          <Text className="font-semibold text-white">
            {previewUrl ? "Generate another preview" : "Preview this colour"}
          </Text>
        )}
      </Pressable>

      <Text className="mt-3 text-center text-xs text-gray-400">
        This is a visual preview, not a guarantee of the property's actual
        paint colour.
      </Text>
    </ScrollView>
  );
}
