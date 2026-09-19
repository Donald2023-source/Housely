import * as Clipboard from "expo-clipboard";
import { Link } from "expo-router";
import { Button, Dialog, useToast } from "heroui-native";
import { CheckIcon, Copy } from "lucide-react-native";
import { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity } from "react-native";
interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  propertyId: string;
}
export default function CopyDialog({ isOpen, setIsOpen, propertyId }: Props) {
  const link = `http://localhost:8081/property/${propertyId}`;

  const { toast } = useToast();
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(link);
    toast.show({
      variant: "success",
      label: "Copied to clipboard!",
      icon: <CheckIcon />,
    });
  };
  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          variant="blur"
          blurViewProps={{
            intensity: 40,
            tint: "dark",
          }}
        />
        <Dialog.Content>
          <Dialog.Trigger className="hidden" asChild>
            <Button>Open Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Close onPress={() => setIsOpen(false)} />
          <Dialog.Title className="my-2">Share Link</Dialog.Title>
          <Dialog.Description className="h-15 rounded-lg bg-primary/5">
            <TouchableOpacity
              onPress={copyToClipboard}
              className="flex-row w-full p-3 h-full items-center justify-between"
            >
              <Link
                className="p-2  underline text-primary rounded-lg"
                href={`http://localhost:8081/property/${propertyId}`}
              >
                <Text className="w-full border">{link.slice(0, 45)}</Text>
              </Link>
              <Copy onPress={copyToClipboard} size={20} color="gray" />
            </TouchableOpacity>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
