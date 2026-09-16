import { InputOTP } from "heroui-native";
import { useState } from "react";

export function OTP() {
  const [value, setValue] = useState("");

  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@");

    if (!username || !domain) return email;

    const visibleCharacters = username.slice(0, 2);

    return `${visibleCharacters}***@${domain}`;
  };

  return (
    <InputOTP value={value} onChange={setValue} maxLength={6}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  );
}
