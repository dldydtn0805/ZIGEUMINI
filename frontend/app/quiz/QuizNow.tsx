"use client";
import { useState } from "react";
import quizStore from "@/public/src/stores/quiz/quizStore";
import useMe from "@/public/src/hooks/useMe";

export default function QuizNow() {
  const { data: me } = useMe();
  const asset = me?.asset;
  const { success } = quizStore();

  return (
    <div className="row-span-1 grid grid-cols-12">
      <div className="col-start-4 col-end-10 items-center bg-small-8 grid grid-cols-12 mb-4 rounded-b-md ">
        <div className="col-start-2 col-end-4 text-start text-white">
          맞춘 문제 : {success}/5
        </div>
        <div className="col-start-6 col-end-12 text-end  text-white">
          보유 시드 머니 : {asset?.toLocaleString()} 원
        </div>
      </div>
    </div>
  );
}
