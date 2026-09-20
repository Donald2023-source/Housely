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
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();

  const profileData = [
    {
      title: "Settings",
      icon: <Settings color="#7F56D9" size={30} />,
      route: "/settings",
    },

    {
      title: "Payment",
      icon: <CreditCardCheck color="#7F56D9" size={30} />,
      route: "/payment",
    },
    {
      title: "Notification",
      icon: <Bell color="#7F56D9" size={30} />,
      route: "/notifications",
    },
    {
      title: "Recently Viewed",
      icon: <Clock2 color="#7F56D9" size={30} />,
      route: "/recently-viewed",
    },
    {
      title: "About",
      icon: <Info color="#7F56D9" size={30} />,
      route: "/about",
    },
  ];
  return (
    <SafeAreaView>
      <View className="px-4">
        <View className="flex-row items-center justify-between pt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center justify-center rounded-full border border-gray-200"
          >
            <ArrowLeft size={21} color="#1F2937" />
          </TouchableOpacity>

          <Text className="text-base font-semibold text-[#1F2937]">
            Profile
          </Text>
          <View />
        </View>

        <View className="items-center gap-1 justify-center h-72 border-b border-gray-300">
          <Image
            className="w-[100px] h-[100px] rounded-full"
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
          />
          <Text className="text-lg">{user?.name}</Text>
          <Text className="text-gray-500">{user?.email}</Text>
        </View>

        <View className="mt-8 gap-8">
          {profileData?.map((item, idx) => (
            <TouchableOpacity className="flex-row justify-between" key={idx}>
              <View className="flex-row items-center gap-3">
                <Text className="text-primary">{item?.icon}</Text>
                <Text className="text-base text-black/60">{item?.title}</Text>
              </View>
              <ChevronRight color="gray" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity className="rounded-2xl mt-10">
          <Text className=" text-red-600 text-center font-semibold text-base">
            Signout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
