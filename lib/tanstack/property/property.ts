import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function fetchProperties() {
  const response = await api.get("/property");

  return response.data?.data;
}


export function useFetchProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });
}

