import fetchData from "@/utils/fetchData";
import { apiUrl } from "@/utils/utils";
import { Key, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const carouselWidth = width - 45;
console.log(apiUrl);

export default function BooksCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState<any | []>([]);
  useEffect(() => {
    const fetchVolumes = async () => {
      const data = await fetchData("/volumes");

      setData(data?.data?.slice(0, 3));
    };

    fetchVolumes();
  }, []);

  return (
    <View className="w-full mt-7">
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicaator={false}
        keyExtractor={(item) => item.id}
        snapToInterval={carouselWidth}
        decelerationRate="fast"

        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / carouselWidth,
          );

          setCurrentIndex(index);
        }}
        renderItem={({ item }) =>
          !data ? (
            <ActivityIndicator />
          ) : (
            <View
              className="bg-primary/10 flex-row items-center pr-4 pl-6 rounded-xl justify-between"
              style={{
                width: carouselWidth,
                height: 200,
              }}
            >
              <View className="w-1/2 flex gap-4">
                <Text className="text-2xl font-semibold">Special Offer</Text>
                <Text className="">Discount 25%</Text>
                <TouchableOpacity className="p-3 w-32 bg-primary rounded-full">
                  <Text className="text-white text-center">Order Now</Text>
                </TouchableOpacity>
              </View>

              <Image
                resizeMode="contain"
                source={{
                  uri: item?.volumeInfo?.imageLinks?.thumbnail,
                }}
                style={{
                  width: 120,
                  height: 160,
                }}
              />
            </View>
          )
        }
      />

      <View className="flex-row justify-center items-center mt-3">
        {data?.map((_: any, index: Key | null | undefined) => (
          <View
            key={index}
            className={`mx-1 rounded-full ${
              index === currentIndex
                ? "w-5 h-2 bg-black"
                : "w-2 h-2 bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
