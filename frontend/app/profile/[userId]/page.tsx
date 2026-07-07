"use client";
import Image from "next/image";
import styles from "./page.module.css";
import UserInfo from "./ProfileInfo";
import Navbar from "@/app/Navbar";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";
import profileStore from "@/public/src/stores/profile/profileStore";
import { useQuery } from "react-query";
import ProfileFriendRequest from "./ProfileFriendRequest";
import ProfileSentFriendRequest from "./ProfileSentFriendRequest";
import ProfileBoardDetail from "./ProfileBoardDetail";

export default function page() {
  const { isBoardOpen, setIsBoardOpen } = profileStore();
  return (
    <div className="grid grid-rows-12 h-screen">
        <PeacefulBgm></PeacefulBgm>
        <Navbar></Navbar>
        {isBoardOpen && (
          <ProfileBoardDetail
            isBoardOpen={isBoardOpen}
            setIsBoardOpen={setIsBoardOpen}
          ></ProfileBoardDetail>
        )}
        <UserInfo></UserInfo>
      </div>
  );
}
