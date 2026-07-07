import { apiUrl, SOCKET_URL } from "@/public/src/config/api";
// useWebSocket.ts
import { useEffect, useRef } from "react";
import { CompatClient, IMessage, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Swal from "sweetalert2";
import socketStore from "../stores/websocket/socketStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import useMe from "./useMe";

type ReadyState = Record<number, boolean>;

type SocketParticipant = {
  memberId: number;
  nickname: string;
  gameRoi: number;
  rankPoint: number;
  win: number;
  lose: number;
  asset: number;
  currentRank: number;
};

type MultiGameStockId = {
  firstDayStockChartId: number;
  stockId: number;
};

type SocketPlayer = {
  nickName: string;
  day: number;
  rank: number;
  totalAsset: number;
};

type SocketMessageResult = {
  hostId?: number;
  participants?: SocketParticipant[];
  roomId?: number;
  roomTitle?: string;
  readyState?: ReadyState;
  maxRoundNumber?: number;
  inviterNickname?: string;
  gameId?: number;
  multiGameStockIds?: MultiGameStockId[];
};

type SocketMessage = {
  type:
    | "MESSAGE"
    | "EXIT"
    | "ROOMINFO"
    | "INVITE"
    | "FRIENDASK"
    | "KICKED"
    | "START"
    | "MULTIGAMEINFO"
    | "MULTIRESULT";
  result?: SocketMessageResult | SocketPlayer[];
};

export const useWebSocket = () => {
  const client = useRef<CompatClient>({} as CompatClient);
  const { setClientObject, clientObject, setResultNumberCount } = socketStore();
  const { data: me } = useMe();
  const memberId = me?.memberId;
  const nickname = me?.nickname;
  const {
    receiveMessages,
    setReceiveMessages,
    addReceiveMessages,
    deleteReceiveMessages,
    setMaxRoundNumber,
    setRoundNumber,
    setGameId,
    setMultiGameStockIds,
    setDay,
    sortPlayersByTotalAsset,
  } = socketStore();

  const { receiveAlarm, setReceiveAlarm, roomInfo, setRoomInfo } =
    socketStore();
  const {
    setHostId,
    setParticipants,
    setRoomId,
    setRoomTitle,
    setReadyState,
    setPlayers,
    setMultiGameLogId,
    setIsGameOver,
    incrementresultNumberCount,
  } = socketStore();

  const router = useRouter();
  const fetchAlarmData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: apiUrl("/alarm/unread-notification-count"),
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      // 요청이 성공적으로 완료되면 여기에서 응답을 처리합니다.
      if (Number(response.data.result) > 0) {
        setReceiveAlarm(true);
      }
    } catch (error) {
      // 요청이 실패하면 오류를 처리합니다.
      console.error(error);
      // 오류에 따른 추가적인 처리를 할 수 있습니다.
    }
  };

  useEffect(() => {
    if (memberId) {
      fetchAlarmData();
      client.current = Stomp.over(() => {
        const sock = new SockJS(SOCKET_URL);
        return sock;
      });
      Swal.fire(`${nickname}님 환영합니다.`);
      setClientObject(client);
      client.current.connect({}, () => {
        client.current.subscribe(`/api/sub/${memberId}`, (message: IMessage) => {
          const parsedMessage = JSON.parse(message.body) as SocketMessage;
          const messageResult =
            parsedMessage.result && !Array.isArray(parsedMessage.result)
              ? parsedMessage.result
              : undefined;
          // Swal.fire(`${parsedMessage.type} 신호 감지!`);
          if (parsedMessage.type === "MESSAGE") {
            addReceiveMessages(parsedMessage);
          }

          if (parsedMessage.type === "ROOMINFO") {
            setHostId(messageResult?.hostId ?? 0);
            setParticipants(messageResult?.participants ?? []);
            setRoomId(messageResult?.roomId ?? 0);
            setRoomTitle(messageResult?.roomTitle ?? "");
            setReadyState(messageResult?.readyState ?? {});
            setMaxRoundNumber(messageResult?.maxRoundNumber ?? 0);
          }

          if (parsedMessage.type === "INVITE") {
            Swal.fire({
              title: "친구 초대",
              text: `${messageResult?.inviterNickname ?? "친구"}님이 초대하셨습니다.`,
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "네",
              cancelButtonText: "아니오",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  icon: "success",
                });
                axios({
                  url: apiUrl(`/multi/${messageResult?.roomId ?? 0}`),
                  method: "get",
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                });
                router.push(`/multi/room/${messageResult?.roomId ?? 0}`);
              }
            });
          }

          if (parsedMessage.type === "FRIENDASK") {
            setReceiveAlarm(true);
          }

          if (parsedMessage.type === "KICKED") {
            router.push(`/multi`);
          }

          if (parsedMessage.type === "START") {
            setGameId(messageResult?.gameId ?? 0);
            setMultiGameStockIds(messageResult?.multiGameStockIds ?? []);
            setRoomId(messageResult?.roomId ?? 0);
            setDay(1);
            router.push(
              `${messageResult?.roomId ?? 0}/play/${messageResult?.gameId ?? 0}`
            );
          }

          if (parsedMessage.type === "MULTIGAMEINFO") {
            setPlayers(Array.isArray(parsedMessage.result) ? parsedMessage.result : []);
          }

          if (parsedMessage.type === "MULTIRESULT") {
            incrementresultNumberCount();
          }
        });
      });
      return () => {
        if (client.current) {
          client.current.disconnect();
          Swal.fire("서버와의 연결이 끊어졌습니다.");
        }
      };
    }
  }, [memberId]);
};
