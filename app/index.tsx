import Onboarding from "@/components/Onboarding";
import { onboardingData } from "@/constants/Onboarding-data";
import api from "@/lib/api";
import useAuth from "@/store/auth";
import { Redirect, useRouter } from "expo-router";
import { useToast } from "heroui-native";
import { X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const [active, setActive] = useState(0);
  const { user } = useAuth();
  console.log(user);

  const router = useRouter();
  const { toast } = useToast();

  const getUser = async () => {
    try {
      const res = await api.get("/auth/user");
      // console.log("Authenticated user", res.data.data);
    } catch (err: Error | any) {
      // console.log("Auth user res", err?.response?.data?.status);
      if (err?.response?.data?.status == 401) {
        toast.show({
          variant: "danger",
          label: "Session expired!",
          description: "Please login again",
          icon: <X />,
        });
        router.push("/sign-in");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
