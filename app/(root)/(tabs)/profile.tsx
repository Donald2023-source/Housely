import useAuth from "@/store/auth";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Clock2,
  CreditCardCheck,
  Info,
  Settings,
} from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const profileData = [
    {
      title: "Settings",
      icon: <Settings color="#6941C6" size={21} />,
      route: "/settings",
    },
    {
      title: "Payment",
      icon: <CreditCardCheck color="#6941C6" size={21} />,
      route: "/payment",
    },
    {
      title: "Notifications",
      icon: <Bell color="#6941C6" size={21} />,
      route: "/notifications",
    },
    {
      title: "Recently Viewed",
      icon: <Clock2 color="#6941C6" size={21} />,
      route: "/recently-viewed",
    },
    {
      title: "About",
      icon: <Info color="#6941C6" size={21} />,
      route: "/about",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="h-full mb-24 px-5 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between pt-3">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white"
          >
            <ArrowLeft size={20} color="#1F2937" />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-[#1F2937]">Profile</Text>

          <View className="w-10" />
        </View>

        {/* Profile */}
        <View className="items-center border-b border-gray-100 pb-8 pt-8">
          <View className="rounded-full border-4 border-[#F3EEFF] p-1">
            <Image
              className="h-[104px] w-[104px] rounded-full"
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
            />
          </View>

          <Text className="mt-4 text-xl font-semibold text-[#1F2937]">
            {user?.name || "User"}
          </Text>

          <Text className="mt-1 text-sm text-gray-500">{user?.email}</Text>
        </View>

        <View className="mt-7 gap-3">
          {profileData.map((item) => (
            <TouchableOpacity
              key={item.title}
              activeOpacity={0.7}
              onPress={() => router.push(item.route as any)}
              className="flex-row items-center justify-between rounded-2xl py-4"
            >
              <View className="flex-row items-center">
                <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#F3EEFF]">
                  {item.icon}
                </View>

                <Text className="ml-4 text-[15px] font-medium text-[#344054]">
                  {item.title}
                </Text>
              </View>

              <ChevronRight size={19} color="#98A2B3" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={logout}
          activeOpacity={0.7}
          className="mt-8 h-14 mb-24 items-center justify-center rounded-2xl bg-red-50"
        >
          <Text className="text-[15px] font-semibold text-red-500">
            Sign out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
