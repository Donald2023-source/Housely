import BottomNav from "@/components/BottomNav";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1 h-full relative">
      <Slot />
      <BottomNav />
    </SafeAreaView>
  );
}
