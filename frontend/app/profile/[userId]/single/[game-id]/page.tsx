"use client";

import { apiUrl, hadoopUrl } from "@/public/src/config/api";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // useParams 대신 useRouter를 사용
import { useQuery } from "react-query";

// navbar
import Navbar from "@/app/Navbar";
// BGM
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";

// left
import SingleTradeHistory from "./ReviewSingleTradeHistory";
// middle
import Chart from "./Chart";
// right
import SingleStockTicker from "./ReviewSingleStockTicker";
import SingleRanking from "./ReviewSingleRanking";

// Store
import SingleReviewStore from "@/public/src/stores/profile/SingleReviewStore";
// axios
import axios from "axios";


export default function page() {
  const params = useParams();
  const gameId = params["game-id"];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    selectedIndex,
    setSelectedIndex,
    setRankMemberList,
    stockChartDataList,
    setStockChartDataList,
    stockInfoDtoList,
    setStockInfoDtoList,
    setTradeList,
    setStartDate,
    setEndDate,
    minPriceDateList,
    maxPriceDateList,
    positiveCount,
    setPositiveCount,
    negativeCount,
    setNegativeCount,

  } = SingleReviewStore();

  const fetchSingleGameRecord = async () => {
    try {
      const response = await axios({
        method: "get",
        url: apiUrl(`/single/log?singleGameLogId=${gameId}`),
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setStartDate(response.data.result.startDate.split("T")[0]);
      setEndDate(response.data.result.endDate.split("T")[0]);
      setRankMemberList(response.data.result.rankMemberList);
      setStockChartDataList(response.data.result.stockChartDataList);
      setStockInfoDtoList(response.data.result.stockInfoDtoList);
      fetchPositiveNegativeCount(response.data.result.stockInfoDtoList[0].stockCode, response.data.result.startDate.split("T")[0], response.data.result.endDate.split("T")[0])
      setTradeList(response.data.result.tradeList);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };
  // 해당 stockCode 값을 가진 주식 종목의 등락률 개수
  const fetchPositiveNegativeCount = async (stockCode :string, startDate :string, endDate :string) => {
    try {
      const response = await axios({
        method: "get",
        url: hadoopUrl(`/stock/change-count/start-end?startDate=${startDate}&endDate=${endDate}&stockCode=${stockCode}`),
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        }
      })
      setPositiveCount(response.data.result[0].positiveCount);
      setNegativeCount(response.data.result[0].negativeCount);
      
    } catch (error) {
    }
  }
  useEffect(() => {
    setSelectedIndex(0);
    fetchSingleGameRecord();
    // handleClickStock(0, stockInfoDtoList[0]?.stockCode);
  }, []);

  if (isLoading) {
    return <div className="rainbow"></div>;
  }

  return (
    <div className="grid grid-rows-12 h-screen border-separate">
        <PeacefulBgm />
        <Navbar />
        <div className="row-span-11 grid grid-cols-12">
          <aside className="col-span-2">
            <SingleTradeHistory />
            <div className="grid grid-rows-10 bg-sky-400 m-1 rounded-md p-1">
              <div className="row-span-1 m-auto">{stockInfoDtoList[selectedIndex].stockName}</div>
              <div className="row-span-1 bg-white rounded-sm text-center">최대({maxPriceDateList[0]?.price}원)</div>
          
              {
                maxPriceDateList.map((item :any, index :number) => (
                  <div className="row-span-1">{item.date}</div>
    
                ))
              }

              <div className="row-span-1 bg-white rounded-sm text-center">최소({minPriceDateList[0]?.price}원)</div>
              {
                minPriceDateList.map((item :any, index :number) => (
                  <div>{item.date}</div>
                ))
              }
              <div className="row-span-1 bg-white rounded-sm text-center">증감률(전날 대비)</div>
              <div className="row-span-1 grid grid-cols-4">
                <div className="col-span-1">증가 : </div>
                <div className="col-span-1 text-red-600">{positiveCount}</div>
                <div className="col-span-1">감소 : </div>
                <div className="col-span-1 text-blue-600">{negativeCount}</div>
              </div>              
            </div>
            {/* <SingleStock /> */}
          </aside>
          <main className="col-span-8 grid grid-rows-12">
            <Chart data={stockChartDataList[selectedIndex]?.stockChartList} />
          </main>
          <aside className="col-span-2 grid grid-rows-12">
            <SingleStockTicker></SingleStockTicker>
            <SingleRanking></SingleRanking>
          </aside>
        </div>
      </div>
  );
}
