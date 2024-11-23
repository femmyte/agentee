import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/api-client";

export function useFetch(
  url,
  key,
  query = {},
  options = { refetchOnWindowFocus: true }
) {
  const fetchData = async () => {
    const { data } = await apiClient.get(url, {
      params: { ...query },
    });

    return data;
  };
  return useQuery([key, query], () => fetchData(), {
    ...options,
  });
}
