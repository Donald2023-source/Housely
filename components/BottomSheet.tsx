import images from "@/constanst/images";
import { Ionicons } from "@expo/vector-icons";
import type { Dispatch, SetStateAction } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface bookItem {
  volumeInfo: {
    title: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}
export default function BottomSheet({
  item,
  setItem,
}: {
  item: bookItem | null;
  setItem: Dispatch<SetStateAction<bookItem | null>>;
}) {
  return (
    <View className="absolute pt-4 gap-5 items-center -bottom-16 h-fit pb-32 shadow-xl bg-white w-screen rounded-t-[30px] left-0 right-0">
      <View className=" w-full">
        <Image
          className=" w-full mx-auto rounded-3xl"
          style={{
            width: 220,
            height: 250,
          }}
          source={
            item?.volumeInfo?.imageLinks?.thumbnail
              ? {
                  uri: item.volumeInfo.imageLinks.thumbnail.replace(
                    "http://",
                    "https://",
                  ),
                }
              : images.img4
          }
        />
      </View>
      <View className="px-4">
        <Text className="font-bold text-2xl">{item?.volumeInfo?.title}</Text>
        <Image className="my-4" source={images.img5} />
        <Text className="line-clamp-3 leading-7 text-gray-500">
          {item?.volumeInfo?.description}
        </Text>
        <View className="gap-2 my-3">
          <Text className="font-bold text-2xl">Reviews</Text>
          <View className="flex-row gap-3">
            <Ionicons size={25} color="#FBAE05" name="star" />
            <Ionicons size={25} color="#FBAE05" name="star" />
            <Ionicons size={25} color="#FBAE05" name="star" />
            <Ionicons size={25} color="#FBAE05" name="star" />
            <Ionicons size={25} color="#FBAE05" name="star-half" />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setItem(null)}
          className="p-5 mt-3 rounded-full  bg-primary"
        >
          <Text className="text-white text-center">Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
