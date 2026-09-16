import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router, usePathname } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Home",
      route: "/",
      icon: "home-outline",
      activeIcon: "home",
    },
    {
      name: "Category",
      route: "/category",
      icon: "document-text-outline",
      activeIcon: "chatbubble",
    },
    {
      name: "Chats",
      route: "/chats",
      icon: "chatbubble-outline",
      activeIcon: "chatbubble",
    },

    {
      name: "Profile",
      route: "/profile",
      icon: "person-outline",
      activeIcon: "person",
    },
  ];

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 24,
        zIndex: 999,
        elevation: 999,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "90%",
          height: 70,
          borderRadius: 35,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
          backgroundColor: "rgba(255,255,255,0.1)",
        }}
      >
        <BlurView intensity={150} tint="light" style={{ flex: 1 }}>
          <View className="flex-1 flex-row">
            {tabs.map((tab) => {
              const active = pathname === tab.route;
              return (
                <TouchableOpacity
                  key={tab.route}
                  onPress={() => router.push(tab.route as any)}
                  className="flex-1 items-center justify-center"
                >
                  <Ionicons
                    name={(active ? tab.activeIcon : tab.icon) as any}
                    size={24}
                    color={active ? "#007AFF" : "#8E8E93"}
                  />

                  <Text
                    className={`text-[11px] mt-[3px] ${
                      active ? "text-[#007AFF] font-semibold" : "text-[#8E8E93]"
                    }`}
                  >
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </BlurView>
      </View>
    </View>
  );
}
