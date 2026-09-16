// components/SplashScreen.tsx

import { Image, View } from "react-native";

export default function Splash() {
  return (
    <View className="flex-1 items-center justify-center bg-[#54408C]">
      <Image
        source={require("../assets/images/logo.png")}
        className="w-32 h-32"
        resizeMode="contain"
      />
    </View>
  );
}
