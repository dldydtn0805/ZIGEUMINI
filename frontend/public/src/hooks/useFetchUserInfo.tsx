import { apiUrl } from "@/public/src/config/api";
import { useEffect } from "react";
import axios from "axios";
import userStore, { UserInfo } from "../stores/user/userStore";

export default function useFetchUserInfo() {
  const {
    setAsset,
    setBirthYear,
    setEmail,
    setGender,
    setLose,
    setMemberId,
    setMultiAvgRoi,
    setNickname,
    setRankPoint,
    setSingleAvgRoi,
    setWin,
  } = userStore();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await axios<UserInfo>({
          method: "get",
          url: apiUrl(`/member`),
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });
        setAsset(response.data.result.asset);
        setBirthYear(response.data.result.birthYear);
        setEmail(response.data.result.email);
        setGender(response.data.result.gender);
        setLose(response.data.result.lose);
        setMemberId(response.data.result.memberId);
        setMultiAvgRoi(response.data.result.multiAvgRoi);
        setNickname(response.data.result.nickname);
        setRankPoint(response.data.result.rankPoint);
        setSingleAvgRoi(response.data.result.singleAvgRoi);
        setWin(response.data.result.win);
      } catch (error) {
        throw error;
      }
    }

    fetchUserInfo();
  }, []);
}
