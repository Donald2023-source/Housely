import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AddCard() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View>
        <View className="flex-row items-center justify-between pt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className=" items-center justify-center rounded-full border border-gray-200"
          >
            <ArrowLeft size={21} color="#1F2937" />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-[#1F2937]">Add Card</Text>
          <View />
        </View>
      </View>
    </SafeAreaView>
  );
}
