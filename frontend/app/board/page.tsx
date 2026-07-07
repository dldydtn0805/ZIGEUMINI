"use client";
import Navbar from "@/app/Navbar";
import BoardList from "./BoardList";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";
import { useQuery } from "react-query";
import WaitingBgm from "@/public/src/components/bgm/WaitingBgm";


export default function page() {
  return (
    <div className="grid grid-rows-12 h-screen">
        <WaitingBgm></WaitingBgm>
        <Navbar />
        <BoardList />
      </div>
  );
}
