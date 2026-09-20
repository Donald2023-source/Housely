import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import {
  CreditCardFormData,
  CreditCardFormField,
  CreditCardInput,
  LiteCreditCardInput,
  ValidationState,
} from "react-native-credit-card-input";

const toStatusIcon = (status?: ValidationState) =>
  status === "valid" ? "✅" : status === "invalid" ? "❌" : "❓";

type CardProps = {
  number?: string;
  expiry?: string;
  cvc?: string;
  type?: string;
  focusedField?: CreditCardFormField;
  cardHolder?: string;
};

export default function StylishCard({
  number,
  expiry,
  cvc,
  type,
  focusedField,
  cardHolder,
}: CardProps) {
  const formatNumber = (value?: string) => {
    if (!value) return "•••• •••• •••• ••••";

    const clean = value.replace(/\s/g, "");

    return clean
      .padEnd(16, "•")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  return (
    <LinearGradient
      colors={["#171A3A", "#4B2E83", "#7C3AED"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      {/* Header */}
      <View style={styles.topRow}>
        <Text style={styles.brand}>Housely</Text>

        <Text style={styles.cardType}>
          {type ? type.toUpperCase() : "CARD"}
        </Text>
      </View>

      {/* Chip */}
      <View style={styles.chip}>
        <View style={styles.chipLine} />
        <View style={styles.chipLine} />
        <View style={styles.chipLineVertical} />
      </View>

      {/* Card Number */}
      <Text
        style={[styles.cardNumber, focusedField === "number" && styles.focused]}
      >
        {formatNumber(number)}
      </Text>

      {/* Bottom */}
      <View style={styles.bottomRow}>
        <View style={styles.holderContainer}>
          <Text style={styles.label}>CARD HOLDER</Text>

          <Text style={styles.value}>
            {cardHolder?.toUpperCase() || "YOUR NAME"}
          </Text>
        </View>

        <View>
          <Text style={styles.label}>EXPIRES</Text>

          <Text
            style={[
              styles.value,
              focusedField === "expiry" && styles.focusedText,
            ]}
          >
            {expiry || "MM/YY"}
          </Text>
        </View>

        <View>
          <Text style={styles.label}>CVC</Text>

          <Text
            style={[styles.value, focusedField === "cvc" && styles.focusedText]}
          >
            {cvc || "•••"}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export function CardForm() {
  const [useLiteInput, setUseLiteInput] = useState(false);

  const [focusedField, setFocusedField] = useState<CreditCardFormField>();

  const [formData, setFormData] = useState<CreditCardFormData>();

  const [cardHolder, setCardHolder] = useState("");
  const [loading, setLoading] = useState(true);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StylishCard
        focusedField={focusedField}
        number={formData?.values.number}
        expiry={formData?.values.expiry}
        cvc={formData?.values.cvc}
        type={formData?.values.type}
        cardHolder={cardHolder}
      />

      <View style={styles.form}>
        <Text style={styles.inputLabel}>Card holder name</Text>

        <TextInput
          value={cardHolder}
          onChangeText={setCardHolder}
          placeholder="Enter name on card"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="words"
          style={styles.textInput}
        />

        <Text style={styles.inputLabel}>Card details</Text>

        {useLiteInput ? (
          <LiteCreditCardInput
            autoFocus={false}
            style={styles.cardInput}
            onChange={setFormData}
            onFocusField={setFocusedField}
          />
        ) : (
          <CreditCardInput
            autoFocus={false}
            style={styles.cardInput}
            onChange={setFormData}
            onFocusField={setFocusedField}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 650,
    alignSelf: "center",

    paddingTop: 10,
    paddingBottom: 50,
  },

  card: {
    width: "97%",
    maxWidth: 400,
    height: 225,
    alignSelf: "center",

    borderRadius: 24,
    padding: 24,

    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  cardType: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  chip: {
    width: 45,
    height: 34,
    borderRadius: 7,
    backgroundColor: "#D8C27A",
    marginTop: 22,
    overflow: "hidden",
    justifyContent: "center",
  },

  chipLine: {
    height: 1,
    backgroundColor: "rgba(80,60,20,0.4)",
    marginVertical: 4,
  },

  chipLineVertical: {
    position: "absolute",
    left: 21,
    width: 1,
    height: "100%",
    backgroundColor: "rgba(80,60,20,0.4)",
  },

  cardNumber: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "600",
    letterSpacing: 2,
    marginTop: 18,
  },

  focused: {
    textShadowColor: "rgba(255,255,255,0.8)",
    textShadowRadius: 8,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: "auto",
  },

  holderContainer: {
    flex: 1,
  },

  label: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 3,
  },

  value: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.7,
  },

  focusedText: {
    color: "#fff",
  },

  circleOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.06)",
    right: -70,
    top: -60,
  },

  circleTwo: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.04)",
    left: -80,
    bottom: -70,
  },

  form: {
    width: "95%",
    maxWidth: 390,
    alignSelf: "center",
    marginTop: 30,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#29243D",
    marginBottom: 8,
    marginTop: 18,
  },

  textInput: {
    height: 52,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E1EE",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#17132B",
  },

  cardInput: {
    backgroundColor: "#fff",
    borderRadius: 14,

    overflow: "hidden",
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },

  switchText: {
    fontSize: 13,
    color: "#6B6578",
  },

  validation: {
    marginTop: 24,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#EFEBF8",
  },

  validationTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#34265C",
    marginBottom: 12,
  },

  validationItem: {
    fontSize: 13,
    color: "#625A75",
    marginTop: 6,
  },
});
