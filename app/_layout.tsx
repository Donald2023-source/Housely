import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { HeroUINativeProvider } from "heroui-native";
import { useEffect } from "react";
import { Appearance, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  Appearance.setColorScheme("light");

  const queryClient = new QueryClient();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View>Loading ...</View>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
