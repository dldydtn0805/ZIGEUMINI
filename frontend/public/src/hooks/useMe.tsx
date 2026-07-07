import { apiUrl } from "@/public/src/config/api";
import axios from "axios";
import { useQuery } from "react-query";
import { UserInfo, UserProfile } from "../stores/user/userStore";

const fetchMe = async () => {
  const response = await axios<UserInfo>({
    method: "get",
    url: apiUrl("/member"),
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });

  return response.data.result;
};

export default function useMe() {
  const hasAccessToken =
    typeof window !== "undefined" && !!sessionStorage.getItem("accessToken");

  return useQuery<UserProfile, Error>("me", fetchMe, {
    enabled: hasAccessToken,
    staleTime: 1000 * 60 * 5,
  });
}
