import Onboarding from "@/components/Onboarding";
import { onboardingData } from "@/constants/Onboarding-data";
import useAuth from "@/store/auth";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const [active, setActive] = useState(0);

  const { user } = useAuth();
  console.log(user);

  const router = useRouter();

  if (user?.isSignedIn) {
    return <Redirect href="/(root)/(tabs)" />;
  }

  const currentSlide = onboardingData[active];

  const handleNext = () => {
    if (active < onboardingData.length - 1) {
      setActive((prev) => prev + 1);
      console.log(active);
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <SafeAreaView className="flex-1  bg-white">
      <Onboarding active={active} next={handleNext} item={currentSlide} />
    </SafeAreaView>
  );
}
