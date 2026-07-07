import { create } from "zustand";

type FriendRequestType = {
  memberId: number;
  nickname: string;
  assets: number;
  isLogin: boolean;
};
type SentFriendRequestType = {
  memberId: number;
  nickname: string;
  assets: number;
  isLogin: boolean;
};
type Store = {
  toggleButton: string;
  setToggleButton: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  friendRequests: FriendRequestType[];
  setFriendRequests: (value: FriendRequestType[]) => void;
  isSentOpen: boolean;
  setIsSentOpen: (value: boolean) => void;
  sentFriendRequests: SentFriendRequestType[];
  setSentFriendRequests: (value: SentFriendRequestType[]) => void;
  isBoardOpen: null | number;
  setIsBoardOpen: (value: number | null) => void;
};

const profileStore = create<Store>((set) => ({
  toggleButton: "single",
  setToggleButton: (value) => set({ toggleButton: value }),
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
  friendRequests: [],
  setFriendRequests: (value) => set({ friendRequests: value }),
  isSentOpen: false,
  setIsSentOpen: (value) => set({ isSentOpen: value }),
  sentFriendRequests: [],
  setSentFriendRequests: (value) => set({ sentFriendRequests: value }),
  isBoardOpen: null,
  setIsBoardOpen: (value) => set({ isBoardOpen: value }),
}));

export default profileStore;
