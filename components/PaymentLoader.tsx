"use client";

import { useRouter } from "expo-router";
import { Check, LockKeyhole } from "lucide-react-native";
import { useEffect, useState } from "react";

import { Text, View } from "react-native";

const COMPLETION_DELAY = 3000;

export function PaymentLoader() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsSuccessful(true);
      router.push("/(root)/(tabs)");
    }, COMPLETION_DELAY);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <View className="payment-page" aria-live="polite">
      <View className="payment-card bg-white " aria-label="Payment status">
        <View
          className={`status-icon items-center justify-center ${isSuccessful ? "status-icon-success" : ""}`}
        >
          {isSuccessful ? (
            <Check className="success-check" strokeWidth={2.5} />
          ) : (
            <View className="loader-ring animate-pulse" />
          )}
        </View>

        <View className="status-copy  text-center items-center justify-center">
          <Text className="eyebrow">Payment</Text>
          <Text>
            {isSuccessful ? "Payment successful" : "Processing payment"}
          </Text>
          <Text className="supporting-copy text-center">
            {isSuccessful
              ? "Your payment has been confirmed and your order is on its way."
              : "Please wait while we securely confirm your payment."}
          </Text>
        </View>

        <View className="secure-note">
          <LockKeyhole size={14} strokeWidth={2.2} />
          <Text>Securely processed</Text>
        </View>
      </View>
    </View>
  );
}

export default PaymentLoader;

/* React Native port:
 * Replace the CSS ring with ActivityIndicator and toggle this same state after 2500ms.
 */
