"use client";

import { apiUrl } from "@/public/src/config/api";

import multigameStore, {
  MultiGameRoomInfoList,
} from "@/public/src/stores/multi/MultiGameStore";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";

export default function GameRoom(props: {
  color: string;
  room: MultiGameRoomInfoList;
}) {
  const playClickSound = useClickSound();

  const { getMultigameRoomInfo, isWaiting } = multigameStore();
  const { color, room } = props;
  const password = room.password;
  const router = useRouter();
  const handleClick = (room: MultiGameRoomInfoList) => {
    if (room.participantsIds.length == 6) {
      Swal.fire({
        title: "정원이 가득 찼습니다.",
        icon: "error",
      });
      return;
    }
    const token = sessionStorage.getItem("accessToken");
    if (!room.isOpen) {
      Swal.fire({
        title: "비밀번호를 입력하세요.",
        input: "password",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "입장",
        showLoaderOnConfirm: true,
      }).then((result) => {
        // cancel을 해도 뜬다.
        if (result.isConfirmed) {
          if (Number(result.value) === password) {
            axios
              .get(apiUrl(`/multi/${room.roomId}`), {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                router.push(`multi/room/${room.roomId}`);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            Swal.fire({
              title: "비밀번호가 일치하지 않습니다.",
              icon: "error",
            });
          }
        }
      });
    } else {
      axios
        .get(apiUrl(`/multi/${room.roomId}`), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
        })
        .catch((error) => {
          console.error(error);
        });
      router.push(`multi/room/${room.roomId}`);
      getMultigameRoomInfo(room.roomId);
    }
  };
  return (
    <div
      className={`hover:-translate-y-1 transition ease-in-out duration-500 h-auto rounded-md shadow-md text-textColor-2 ${color}`}
    >
      <div
        onClick={
          isWaiting
            ? () => {
                playClickSound();
                handleClick(room);
              }
            : () => {}
        }
        className="block p-2  border rounded-lg shadow hover:cursor-pointer"
      >
        <h5 className="mb-1 text-md font-bold tracking-tight">
          {`[${room.roomId}번방] `}
          {room.roomTitle}
        </h5>
        <div className="flex justify-end gap-4 text-sm">
          <div>{room.roundNumber}라운드</div>
          <div>{room.participantsIds.length}명</div>
        </div>
      </div>
    </div>
  );
}
