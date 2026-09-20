import { useRouter } from "expo-router";
import { Tabs } from "heroui-native";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingTab from "../../../components/UpcomingTab";
export default function Booking() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className="px-4 h-full bg-white">
        <View className="flex-row items-center justify-between pt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center justify-center rounded-full"
          >
            <ArrowLeft size={21} color="#1F2937" />
          </TouchableOpacity>

          <Text className="text-base font-semibold text-[#1F2937]">
            My Booking
          </Text>
          <View />
        </View>

        <View className="mt-3">
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            variant="primary"
          >
            <Tabs.List>
              <Tabs.Indicator />
              <Tabs.Trigger value="upcoming">
                <Tabs.Label>Upcoming</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger value="completed">
                <Tabs.Label>Completed</Tabs.Label>
              </Tabs.Trigger>
              <Tabs.Trigger value="cancelled">
                <Tabs.Label>Cancelled</Tabs.Label>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="upcoming">
              <UpcomingTab />
            </Tabs.Content>
            <Tabs.Content value="profile">
              <Text>Upcoming</Text>
            </Tabs.Content>
          </Tabs>
        </View>
      </View>
    </SafeAreaView>
  );
}
