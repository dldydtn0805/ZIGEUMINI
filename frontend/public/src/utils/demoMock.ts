import axios from "axios";
import { isDemoMode } from "./demoMode";

type MockBody = any;

const demoUser = {
  memberId: 1,
  email: "demo@zigeum.local",
  nickname: "지금이니",
  birthYear: 1998,
  gender: "MAN",
  asset: 12000000,
  rankPoint: 1520,
  win: 18,
  lose: 4,
  singleAvgRoi: 12.4,
  multiAvgRoi: 8.6,
};

const demoFriends = [
  { memberId: 2, nickname: "하이", assets: 9800000, isLogin: true },
  { memberId: 3, nickname: "민트", assets: 10100000, isLogin: false },
];

const demoBoards = [
  {
    communityId: 1,
    title: "오늘의 매매 복기",
    content: "데모용 커뮤니티 글입니다.",
    memberId: 1,
    nickname: "지금이니",
    createdAt: "2026-07-01T00:00:00Z",
  },
];

const demoNotifications = [
  { alarmType: "FRIENDASK", member: "지금이니", sender: "민트", content: "친구 요청이 도착했습니다." },
];

const demoGameLogs = [
  {
    memberId: 1,
    gameLogId: 1,
    nickname: "지금이니",
    result: "WIN",
    roi: 12.4,
    createdAt: "2026-07-01T00:00:00Z",
  },
];

const ok = (result: MockBody = {}) => ({ status: 200, data: { status: 200, result } });

const match = (pathname: string, part: string) => pathname.includes(part);

const queryValue = (url: URL, key: string) => url.searchParams.get(key) ?? "";

const makeGameChart = (roomId: number) => ({
  roomId,
  stockChartList: [
    { date: "2026-07-01", markerPrice: 100, highPrice: 110, lowPrice: 95, endPrice: 108, tradingVolume: 1200 },
    { date: "2026-07-02", markerPrice: 108, highPrice: 112, lowPrice: 101, endPrice: 104, tradingVolume: 900 },
  ],
});

const multiRoomList = [
  { roomId: 1, roomTitle: "데모 멀티방", roundNumber: 3, participantsIds: [1, 2], isOpen: true, password: 0 },
];

const fundItem = {
  fundId: 1,
  fundName: "데모 펀드",
  managerNickname: "지금이니",
  period: 7,
  minimumAmount: 10000,
  participantCount: 3,
  capacity: 5,
  industry: "반도체",
  fundMembers: [
    { nickname: "지금이니", investmentAmount: 50000 },
    { nickname: "민트", investmentAmount: 30000 },
  ],
};

const demoMockResponse = (method: string, urlString: string, body?: any) => {
  const url = new URL(urlString, "http://localhost");
  const { pathname } = url;

  if (match(pathname, "/oauth2/authorization/kakao")) {
    return null;
  }

  if (pathname === "/api/member") return ok(demoUser);
  if (pathname === "/api/member/profile") return ok(demoUser);
  if (pathname === "/api/member/privilege/check") return ok(["USER"]);
  if (pathname === "/api/member/nickname/check") return ok(false);
  if (pathname === "/api/member/additional-info") return ok({ accessToken: "demo-access-token", refreshToken: "demo-refresh-token" });
  if (pathname === "/api/member/single-game-log") return ok(demoGameLogs);
  if (pathname === "/api/member/multi-game-log") return ok(demoGameLogs);
  if (pathname === "/api/alarm/login") return ok(true);
  if (pathname === "/api/alarm/unread-notification-count") return ok(1);
  if (pathname === "/api/alarm/my-notification") return ok(demoNotifications);
  if (pathname === "/api/single/is-existing-single-game") return ok({ isExistSingleGame: false, singleGameChance: 3 });
  if (pathname === "/api/member/list") return ok(demoFriends);
  if (pathname === "/api/member/search") return ok(demoFriends.filter((item) => item.nickname.includes(queryValue(url, "nickname"))));
  if (pathname === "/api/friend/list") return ok(demoFriends);
  if (pathname === "/api/friend/check-friend") return ok(true);
  if (pathname === "/api/friend-ask/receive-list") return ok([
    { sender: "민트", content: "친구 요청", alarmType: "FRIENDASK" },
  ]);
  if (pathname === "/api/friend-ask/send-list") return ok([]);
  if (pathname.startsWith("/api/friend-ask") || pathname.startsWith("/api/friend/delete")) return ok(true);
  if (pathname === "/api/community/all") return ok(demoBoards);
  if (pathname === "/api/community/mylist") return ok(demoBoards);
  if (pathname === "/api/community") return ok(demoBoards[0]);
  if (pathname === "/api/community/write") return ok(true);
  if (pathname.startsWith("/api/community/write-multi")) return ok(true);
  if (pathname === "/api/single") return ok({
    gameId: 1,
    stockChartData: {
      stockId: 1,
      stockChartList: makeGameChart(1).stockChartList,
    },
  });
  if (pathname === "/api/single/tomorrow") return ok(true);
  if (pathname === "/api/single/buy" || pathname === "/api/single/sell") return ok(true);
  if (pathname === "/api/single/log") return ok({ singleGameLogId: 1, result: [] });
  if (pathname === "/api/single/log/member") return ok([{ memberId: 1, singleGameStockId: 1, nickname: "지금이니" }]);
  if (pathname === "/api/multi") return ok({ multiWaitRoomInfoList: multiRoomList, multiGameRoomInfoList: multiRoomList, totalGameRoomCounts: 1, totalWaitRoomCounts: 1 });
  if (pathname === "/api/multi/1") return ok({ roomId: 1, roomTitle: "데모 멀티방" });
  if (pathname === "/api/multi/create-room") return ok({ roomId: 1 });
  if (pathname === "/api/multi/room-info") return ok({ roomId: 1, roomTitle: "데모 멀티방" });
  if (pathname === "/api/multi/game-chart") return ok(makeGameChart(1));
  if (pathname === "/api/multi/player-info") return ok([
    { nickName: "지금이니", day: 1, rank: 1, totalAsset: 12000000 },
    { nickName: "민트", day: 1, rank: 2, totalAsset: 11000000 },
  ]);
  if (pathname === "/api/multi/round-result") return ok(true);
  if (pathname === "/api/multi/tomorrow") return ok(true);
  if (pathname === "/api/multi/ready" || pathname === "/api/multi/start-game" || pathname === "/api/multi/exit" || pathname === "/api/multi/invite" || pathname === "/api/multi/kick") return ok(true);
  if (pathname.startsWith("/api/multi/")) return ok({ roomId: 1, roomTitle: "데모 멀티방" });
  if (pathname === "/api/quiz") return ok({ quizId: 1, question: "데모 퀴즈", choices: ["A", "B"], answer: "A" });
  if (pathname === "/api/quiz/update") return ok(true);
  if (pathname === "/api/fund/recruiting-list" || pathname === "/api/fund/running-list" || pathname === "/api/fund/managing-list" || pathname === "/api/fund/investing-list") return ok([fundItem]);
  if (pathname === "/api/fund/other-investing-list" || pathname === "/api/fund/other-managing-list") return ok([fundItem]);
  if (pathname === "/api/fund/fund-detail") return ok(fundItem);
  if (pathname === "/api/fund/fundname/check") return ok(true);
  if (pathname === "/api/fund/game/today") return ok(true);
  if (pathname === "/api/fund/open" || pathname === "/api/fund/register" || pathname === "/api/fund/start" || pathname === "/api/fund/close" || pathname === "/api/fund/game/buy" || pathname === "/api/fund/game/sell" || pathname === "/api/fund/game/tomorrow") return ok(true);
  if (pathname === "/api/fund/game") return ok({ fundId: Number(queryValue(url, "fundId")) || 1, stockChartData: makeGameChart(1) });
  if (pathname === "/hadoop/stock/change-count/start-end") return ok({ count: 42, startDate: queryValue(url, "startDate"), endDate: queryValue(url, "endDate") });

  return ok({});
};

export const installDemoMock = () => {
  if (!isDemoMode() || typeof window === "undefined") return;

  const originalFetch = globalThis.fetch.bind(globalThis);
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const anyInput = input as any;
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input instanceof Request
            ? input.url
            : anyInput.toString();
    const method = init?.method ?? (input instanceof Request ? input.method : "GET");
    const mocked = demoMockResponse(method, url);
    if (mocked) {
      return new Response(JSON.stringify(mocked.data), {
        status: mocked.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    return originalFetch(input as any, init);
  }) as typeof fetch;

  axios.interceptors.request.use((config: any) => {
    if (!config.url) return config;
    const mocked = demoMockResponse((config.method ?? "get").toUpperCase(), config.url, config.data);
    if (mocked) {
      config.adapter = async () => ({
        data: mocked.data,
        status: mocked.status,
        statusText: "OK",
        headers: {},
        config,
        request: {},
      });
    }
    return config;
  });
};
