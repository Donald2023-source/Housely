import BottomNav from "@/components/BottomNav";
import { Slot } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  
  return (
    <View className="flex-1 h-full relative">
      <Slot />
      <BottomNav />
    </View>
  );
}
