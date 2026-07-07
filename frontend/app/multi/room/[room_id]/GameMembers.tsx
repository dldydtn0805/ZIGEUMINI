'use client'

import { apiUrl } from "@/public/src/config/api";

import Image from 'next/image'
import ProfileImage from '@/public/src/assets/images/profile-person-image.png'
import useClickSound from '@/public/src/components/clickSound/DefaultClick'
import socketStore from '@/public/src/stores/websocket/socketStore'
import { ParticipantsType } from '@/public/src/stores/websocket/socketStore'
import axios from 'axios'
import getProfileImage from '@/public/src/utils/getProfileImage'
import useMe from '@/public/src/hooks/useMe'


export default function GameMembers(){
  const { roomId, participants, readyState, hostId } = socketStore();
  const { data: me } = useMe();
  const memberId = me?.memberId;
  const playClickSound = useClickSound();
  const kickUser = (id: number) => {
    axios({
      method: 'delete',
      url: apiUrl(`/multi/kick?roomId=${roomId}&kickMemberId=${id}`),
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
      }
    })
    .then((res)=> {
    })
    .catch((e) => {
      console.error(e)
    })

  }


  return (
    <div className="col-span-3 border-s grid grid-rows-6">
      {
        participants.map((user: ParticipantsType, i: number)=> {
          return(
            <div key={i} className="row-span-1 grid grid-cols-12 items-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <div className="col-span-3 ms-3 text-gray-900 whitespace-nowrap dark:text-white">
                <Image
                  src={getProfileImage(user.asset)}
                  alt='프로필'
                  width={60}
                  style={{
                    borderRadius: '50%'
                  }}
                  />
              </div>
              <div className="col-span-5 text-base font-semibold">
                <div>{user.nickname}</div>
                <div>
                  {
                    hostId === user.memberId ? (
                      <span className=' bg-small-15 text-white text-center text-sm py-0.5 px-3 rounded-md '>방장</span>
                    ) : (
                      <div>
                        { 
                          readyState[user.memberId] === true ? (
                          <span className=' bg-small-11 text-white text-center text-sm py-0.5 px-3 rounded-md '>준비</span>
                        ) : (
                          <span></span>
                        )}
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="col-span-4 px-4">
                {
                  hostId === memberId && hostId != user.memberId ? (
                    <div onClick={()=>{
                      playClickSound();
                      kickUser(user.memberId)
                    }} className=' bg-red-500 text-white text-center py-1 rounded-md hover:cursor-pointer'>내보내기</div>
                  ) : (
                    <div></div>
                  )
                }
              </div>
            </div>  
          )
        })
      }
    </div>
  )
}
