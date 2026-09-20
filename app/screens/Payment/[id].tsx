import { CardForm } from "@/components/CreditCard";
import PaymentLoader from "@/components/PaymentLoader";
import images from "@/constants/images";
import api from "@/lib/api";
import { PropertyItem } from "@/types/Properties";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BottomSheet, Button } from "heroui-native";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CreditCard,
  MapPin,
  Plus,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function PaymentDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const fetchProperty = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/property/${id}`);

      const propertyData = res?.data?.data;

      setProperty(propertyData);
      // console.log("Property Data", propertyData);
    } catch (error) {
      console.log("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (!property) {
    return (
      <View className="h-full flex items-center justify-center">
        <ActivityIndicator size="large" color={"#7F56D9"} />
      </View>
    );
  }

  return (
    <View className="h-full  px-4 bg-white">
      {showLoader && (
        <View className="absolute  inset-0">
          <BlurView
            tint="dark"
            className="absolute inset-0 z-100 w-screen h-screen"
          />
          <View className="absolute inset-0 items-center justify-center z-100">
            <PaymentLoader />
          </View>
        </View>
      )}
      <SafeAreaView className="h-full bg-white">
        <View>
          <View className="flex-row items-center justify-between pt-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className=" items-center justify-center "
            >
              <ArrowLeft size={25} color="#1F2937" />
            </TouchableOpacity>

            <Text className="text-base font-semibold text-[#1F2937]">
              Payment Details
            </Text>
            <View />
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.9} className="my-3">
          <View className="flex-row items-center gap-3 overflow-hidden border h-fit p-2 border-gray-300 rounded-xl">
            <View className="relative  h-fit">
              <Image
                source={{ uri: property.images[0] }}
                resizeMode="cover"
                className="h-24 rounded-2xl w-24"
              />
            </View>

            <View className="p-3 flex-1 gap-1">
              <Text className="font-semibold text-lg">{property.name}</Text>
              <View className="flex-row gap-2 items-center">
                <MapPin color={"gray"} />
                <Text className="text-gray-400 text-base">
                  {property.location?.address}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="font-semibold text-primary">
                  {" "}
                  {property.price?.toLocaleString()}
                </Text>
                <Text className="text-gray-400 text-base font-semibold">
                  {"4.5"}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View>
          <View>
            <Text className="text-xl font-bold">Period</Text>
            <View className="flex-row items-center gap-3 py-3">
              <CalendarDays color={"#7F56D9"} strokeWidth={1.5} size={40} />
              <View>
                <Text className="text-base text-gray-400">Date</Text>
                <Text className="text-lg font-semibold">
                  Aug 2026 - Aug 2027
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 text-base">
              Make sure to check your date before making any sort of payments
            </Text>
          </View>

          {/* Payment Methods */}
          <View className="my-7">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-[#1F2937]">
                Payment Method
              </Text>

              <Text className="text-xs text-gray-400">Select one</Text>
            </View>

            {/* Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setSelectedPayment("card");
                setIsOpen(true);
              }}
              className={`mt-3 rounded-2xl border p-4 ${
                selectedPayment === "card"
                  ? "border-[#7F56D9] bg-[#F8F5FF]"
                  : "border-gray-100 bg-white"
              }`}
            >
              <View className="flex-row items-center">
                <View className="w-11 h-11 rounded-xl bg-[#F4F0FF] items-center justify-center">
                  <CreditCard size={22} color="#7F56D9" strokeWidth={1.7} />
                </View>

                <View className="flex-1 ml-3">
                  <Text className="text-base font-semibold text-[#1F2937]">
                    Credit or Debit Card
                  </Text>

                  <Text className="text-xs text-gray-400 mt-1">
                    Visa, Mastercard and Verve
                  </Text>
                </View>

                {selectedPayment === "card" ? (
                  <View className="w-6 h-6 rounded-full bg-[#7F56D9] items-center justify-center">
                    <Check size={14} color="white" strokeWidth={3} />
                  </View>
                ) : (
                  <Plus size={23} color="#9CA3AF" />
                )}
              </View>
            </TouchableOpacity>

            {/* PayPal */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedPayment("paypal")}
              className={`mt-3 rounded-2xl border p-4 ${
                selectedPayment === "paypal"
                  ? "border-[#7F56D9] bg-[#F8F5FF]"
                  : "border-gray-100 bg-white"
              }`}
            >
              <View className="flex-row items-center">
                <View className="w-11 h-11 rounded-xl bg-[#F8FAFF] items-center justify-center">
                  <Image
                    source={images.paypal}
                    className="w-7 h-7"
                    resizeMode="contain"
                  />
                </View>

                <View className="flex-1 ml-3">
                  <Text className="text-base font-semibold text-[#1F2937]">
                    PayPal
                  </Text>

                  <Text className="text-xs text-gray-400 mt-1">
                    Pay securely with your PayPal account
                  </Text>
                </View>

                {selectedPayment === "paypal" ? (
                  <View className="w-6 h-6 rounded-full bg-[#7F56D9] items-center justify-center">
                    <Check size={14} color="white" strokeWidth={3} />
                  </View>
                ) : (
                  <Plus size={23} color="#9CA3AF" />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-xl font-bold">Price Details</Text>

            <View className="gap-3 mt-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-500 font-medium text-base">
                  Period Time
                </Text>
                <Text className="text-gray-700 text-base">1 Year</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-500 font-medium text-base">
                  Yearly Payment
                </Text>
                <Text className="text-gray-700 text-base">
                  N{property?.price.toLocaleString()}
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-500 font-medium text-base">Tax</Text>
                <Text className="text-gray-700 text-base">N30,000</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-500 font-medium text-base">
                  Total
                </Text>
                <Text className="text-primary font-semibold text-lg">
                  N{Number(property?.price + 30000).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <BottomSheet
          className="rounded-t-[32px]"
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <BottomSheet.Trigger asChild>
            <TouchableOpacity className="p-5 mx-auto w-[80%] hidden bg-primary rounded-lg">
              <Text className="text-white text-center font-semibold">New</Text>
            </TouchableOpacity>
          </BottomSheet.Trigger>

          <BottomSheet.Portal>
            <BottomSheet.Overlay
              variant="blur"
              blurViewProps={{
                intensity: 40,
                tint: "dark",
              }}
            />
            <BottomSheet.Content className="bg-white">
              <View className="gap-1 mt-4 mb-6">
                <CardForm />

                <Button
                  onPress={() => {
                    setIsOpen(false);
                    setShowLoader(true);
                  }}
                  className="text-white rounded-lg bg-primary text-center font-semibold"
                >
                  Pay Now
                </Button>
              </View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </SafeAreaView>
    </View>
  );
}
