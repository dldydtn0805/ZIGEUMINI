"use client";

import { apiUrl } from "@/public/src/config/api";

import Header from "./header";
import GameStatus from "./gameStatus";
import RoundChart from "./roundChart";
import Chat from "../../chat";
import TradeHistory from "./tradeHistory";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import TradeButtons from "../../tradeButton";
import GameMembers from "./GameMembers";
import axios from "axios";
import socketStore from "@/public/src/stores/websocket/socketStore";
import type { stockChartInterface } from "@/public/src/stores/multi/MultiGameStore";
import InGameBgm from "@/public/src/components/bgm/InGameBgm";
import { useQuery } from "react-query";

export type dataType = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

type MultiGameChartResult = {
  multiGameLogId: number;
  stockId: number;
  stockChartList: stockChartInterface[];
};

type MultiGameChartResponse = {
  result: MultiGameChartResult;
};

export default function page() {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // for chrome. deprectaed.
  };

  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
  // 새로고침 방지 로직

  const preventGoBack = () => {
    history.pushState(null, "", location.href);
  };
  useEffect(() => {
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);
  //  뒤로가기 방지 로직
  const {
    day,
    setDay,
    roundNumber,
    roomId,
    gameId,
    multiGameStockIds,
    setMultiGameLogId,
    setTodayEndPrice,
    setPlayers,
    setResultNumberCount,
  } = socketStore();

  useEffect(() => {
    setResultNumberCount(0);
  }, []);

  const {
    setAveragePrice,
    setCash,
    setInitialAsset,
    setProfitMargin,
    setShortAveragePrice,
    setShortStockAmount,
    setStockAmount,
    setStockValue,
    setTotalAsset,
    setTotalPurchaseAmount,
    setUnrealizedGain,
    setTradeList,
  } = socketStore();

  const currentStock = multiGameStockIds[roundNumber - 1];

  const fetchMultigameData = async () => {
    if (!currentStock) {
      throw new Error("현재 라운드의 종목 정보가 없습니다.");
    }

    const response = await axios<MultiGameChartResponse>({
      method: "post",
      url: apiUrl("/multi/game-chart"),
      data: {
        roundNumber: roundNumber,
        stockId: currentStock.stockId,
        gameId: gameId,
        firstDayStockChartId: currentStock.firstDayStockChartId,
        roomId: roomId,
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });

    return response.data.result;
  };

  const {
    data: multiGameChart,
    isLoading,
    isError,
  } = useQuery(
    [
      "MultiGameChart",
      roomId,
      gameId,
      roundNumber,
      currentStock?.stockId,
      currentStock?.firstDayStockChartId,
    ],
    fetchMultigameData,
    {
      enabled: !!roomId && !!gameId && !!roundNumber && !!currentStock,
      retry: 1,
      onSuccess: (result) => {
        setMultiGameLogId(result.multiGameLogId);
        setTodayEndPrice(result.stockChartList[300]?.endPrice ?? 0);
      },
    }
  );

  useEffect(() => {
    if (currentStock) {
      setDay(1);
      setAveragePrice(0);
      setCash(10000000);
      setInitialAsset(10000000);
      setProfitMargin(0);
      setShortAveragePrice(0);
      setShortStockAmount(0);
      setStockAmount(0);
      setStockValue(0);
      setTotalAsset(10000000);
      setTotalPurchaseAmount(0);
      setUnrealizedGain(0);
      setTradeList([]);
    }
  }, [
    currentStock,
    setDay,
    setAveragePrice,
    setCash,
    setInitialAsset,
    setProfitMargin,
    setShortAveragePrice,
    setShortStockAmount,
    setStockAmount,
    setStockValue,
    setTotalAsset,
    setTotalPurchaseAmount,
    setUnrealizedGain,
    setTradeList,
  ]);

  const params = useParams<{ room_id?: string; game_id?: string }>();
  const room_id: string | undefined = params.room_id;
  const game_id: string | undefined = params.game_id;

  const fetchMultiPlayUsers = async () => {
    const response = await axios({
      url: apiUrl(`/multi/player-info`),
      method: `post`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      data: {
        gameId: game_id,
        roundNumber: 1,
        roomId: room_id,
      },
    });
    setPlayers(response.data.result);
  };

  useEffect(() => {
    if (!isLoading && !isError && multiGameChart && room_id && game_id) {
      fetchMultiPlayUsers();
    }
  }, [isLoading, isError, multiGameChart, room_id, game_id]);

  if (!currentStock || isLoading) {
    return <div className="rainbow"></div>;
  }
  if (isError || !multiGameChart) {
    return <div>Error</div>;
  }

  return (
    <div>
      {/* <RoundResult/> */}
      <div className="grid grid-rows-12 h-screen border-separate">
        <Header />
        <InGameBgm></InGameBgm>
        <div className="row-span-11 grid grid-cols-12 border">
          <aside className="col-span-2 text-center border p-2 grid grid-rows-12">
            <GameStatus
              currentPrice={
                multiGameChart.stockChartList[299 + day]?.endPrice ?? 0
              }
            />
            <TradeHistory />
          </aside>
          <main className="col-span-8 grid grid-rows-12">
            <RoundChart
              data={
                multiGameChart?.stockChartList
                  ? multiGameChart.stockChartList.slice(0, 300 + day)
                  : null
              }
            />
            <div className="row-span-3 border">
              <Chat />
            </div>
          </main>
          <div className="col-span-2 grid grid-rows-12">
            <TradeButtons />
            <GameMembers />
          </div>
        </div>
      </div>
    </div>
  );
}
