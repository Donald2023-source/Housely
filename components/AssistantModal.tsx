import api from "@/lib/api";
import { Button } from "heroui-native";
import { useState } from "react";
import { FlatList, Modal, Text, TextInput, View } from "react-native";
export const AssistantModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMsg = { role: "user", parts: [{ text: input }] };
    setMessages([...messages, userMsg]);

    const res = await api.post("/assistant/chat", {
      message: input,
      history: messages,
    });
    const aiMsg = { role: "model", parts: [{ text: res.data.data.reply }] };

    setMessages((prev) => [...prev, aiMsg]);
    setInput("");
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-white p-6">
        <FlatList
          data={messages}
          renderItem={({ item }) => <Text>{item.parts[0].text}</Text>}
        />
        <TextInput
          value={input}
          onChangeText={setInput}
          className="border p-4"
        />
        <Button onPress={sendMessage}>Send</Button>
      </View>
    </Modal>
  );
};
