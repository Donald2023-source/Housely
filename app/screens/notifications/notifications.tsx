import { useRouter } from "expo-router";
import { ArrowLeft, Bell, CheckCircle2 } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SafeAreaView className="">
      <View className="bg-white h-full">
        <View className="flex-row items-center justify-between px-5 pt-3 pb-5">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-full border border-gray-200"
          >
            <ArrowLeft size={21} color="#1F2937" />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-[#1F2937]">
            Notifications
          </Text>

          <View className="w-11" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View className="px-5 pt-4 pb-3">
            <Text className="text-sm font-medium text-gray-500">Recent</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => setIsOpen(!isOpen)}
            className=""
          >
            <View className="flex-row p-4">
              <View className="relative mr-4">
                <View className="h-12 w-12 items-center justify-center rounded-full bg-[#F0EBFF]">
                  <CheckCircle2 size={24} color="#6941C6" strokeWidth={2} />
                </View>

                <View className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-[#FAF9FF] bg-red-500" />
              </View>

              <View className="flex-1 ">
                <View className="flex-row items-start justify-between">
                  <Text className="flex-1 pr-3 text-[15px] font-semibold text-[#1F2937]">
                    Welcome to Housely
                  </Text>

                  <Text className="text-xs text-gray-400">Just now</Text>
                </View>

                <Text className="mt-2 text-sm leading-5 text-gray-600">
                  Congratulations, your profile is now active.
                </Text>

                <View className="px-4 py-3 border-b border-gray-200" />
              </View>
            </View>
          </TouchableOpacity>

          <View className="items-center px-10 pt-16">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-gray-50">
              <Bell size={27} color="#98A2B3" />
            </View>

            <Text className="mt-4 text-base font-semibold text-[#344054]">
              You're all caught up
            </Text>

            <Text className="mt-1 text-center text-sm leading-5 text-gray-400">
              New notifications about your properties and account activity will
              appear here.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
