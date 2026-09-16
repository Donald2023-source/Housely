import useAuth from "@/store/auth";
import { Redirect, Slot } from "expo-router";

export default function RootLayout() {
  const { user } = useAuth();

  console.log(user);
  if (!user?.isSignedIn) return <Redirect href="/sign-in" />;

  return <Slot />;
}
