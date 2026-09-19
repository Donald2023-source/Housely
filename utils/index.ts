import { useToast } from "heroui-native";
import { CheckIcon } from "lucide-react-native";
import { createElement } from "react";
const addToFavourites = async () => {
  const { toast } = useToast();
  toast.show({
    variant: "success",
    label: "Login successful!",
    description: "Welcome to Housely",
    icon: createElement(CheckIcon),
  });
};
