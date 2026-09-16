import useAuth from "@/store/auth";

import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const profile = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const logoutUser = async () => {
    const res = await fetch(`$/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Logged out");
    logout();
     router.push("/sign-in");
  };
  return (
    <View>
      <Text>profile</Text>
      <TouchableOpacity className="p-3 bg-primary" onPress={logoutUser}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default profile;
