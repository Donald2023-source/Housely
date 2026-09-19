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
      name: "Search",
      route: "/search",
      icon: "search-outline",
      activeIcon: "search-outline",
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

          // Glass border
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.22)",

          // Slightly darker glass
          backgroundColor: "rgba(0,0,0,0.16)",

          // Shadow
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.2,
          shadowRadius: 20,
        }}
      >
        <BlurView
          intensity={55}
          tint="dark"
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <View className="flex-1 flex-row">
              {tabs.map((tab) => {
                const active = pathname === tab.route;

                return (
                  <TouchableOpacity
                    key={tab.route}
                    onPress={() => router.push(tab.route as any)}
                    className="flex-1 items-center justify-center"
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={(active ? tab.activeIcon : tab.icon) as any}
                      size={23}
                      color={active ? "#007AFF" : "#8E8E93"}
                    />

                    <Text
                      className={`text-[11px] mt-[3px] ${
                        active
                          ? "text-[#007AFF] font-semibold"
                          : "text-[#8E8E93]"
                      }`}
                    >
                      {tab.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </BlurView>
      </View>
    </View>
  );
}
