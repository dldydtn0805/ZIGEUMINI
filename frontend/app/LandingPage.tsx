"use client";
import React from "react";
import { HeroParallax } from "../public/src/components/ui/hero-parallax";
import community from "@/public/src/assets/images/Landing/community.png";
import fundCreate from "@/public/src/assets/images/Landing/fundCreate.png";
import fundLobby from "@/public/src/assets/images/Landing/fundLobby.png";
import profile from "@/public/src/assets/images/Landing/profile.png";
import profileFriend from "@/public/src/assets/images/Landing/profileFriend.png";
import quiz from "@/public/src/assets/images/Landing/quiz.png";
import fundDetail from "@/public/src/assets/images/Landing/fundDetail.png";
import chartRsi from "@/public/src/assets/images/Landing/chartRsi.png";
import chartMacd from "@/public/src/assets/images/Landing/chartMacd.png";
import tradeBuy from "@/public/src/assets/images/Landing/tradeBuy2.png";
import tradeSell from "@/public/src/assets/images/Landing/tradeSell2.png";
import shortBuy from "@/public/src/assets/images/Landing/shortBuy.png";
import shortSell from "@/public/src/assets/images/Landing/shortSell.png";
import boardDetail from "@/public/src/assets/images/Landing/boardDetail.png";
import chartTotal from "@/public/src/assets/images/Landing/chartTotal.png";

export function LandingPage() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "shortSell",
    link: "#",
    thumbnail: shortSell,
  },
  {
    title: "shortBuy",
    link: "#",
    thumbnail: shortBuy,
  },
  {
    title: "tradeBuy",
    link: "#",
    thumbnail: tradeBuy,
  },
  {
    title: "tradeSell",
    link: "#",
    thumbnail: tradeSell,
  },
  {
    title: "chartTotal",
    link: "#",
    thumbnail: chartTotal,
  },

  {
    title: "fundDetail",
    link: "#",
    thumbnail: fundDetail,
  },
  {
    title: "fundCreate",
    link: "#",
    thumbnail: fundCreate,
  },
  {
    title: "fundLobby",
    link: "#",
    thumbnail: fundLobby,
  },
  {
    title: "chartRsi",
    link: "#",
    thumbnail: chartRsi,
  },
  {
    title: "chartMacd",
    link: "#",
    thumbnail: chartMacd,
  },

  {
    title: "profile",
    link: "#",
    thumbnail: profile,
  },
  {
    title: "profileFriend",
    link: "#",
    thumbnail: profileFriend,
  },
  {
    title: "quiz",
    link: "#",
    thumbnail: quiz,
  },
  {
    title: "community",
    link: "#",
    thumbnail: community,
  },
  {
    title: "boardDetail",
    link: "#",
    thumbnail: boardDetail,
  },
];
