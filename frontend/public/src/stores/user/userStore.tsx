export interface FriendInfo {
  result: Friend[];
}

export interface Friend {
  memberId: number;
  nickname: string;
  assets: number;
  isLogin: boolean;
}

export interface UserInfo {
  result: UserProfile;
}

export interface UserProfile {
  memberId: number;
  email: string;
  nickname: string;
  birthYear: number;
  gender: string;
  asset: number;
  rankPoint: number;
  win: number;
  lose: number;
  singleAvgRoi: number;
  multiAvgRoi: number;
}
