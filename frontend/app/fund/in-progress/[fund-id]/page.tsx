'use client'

import Navbar from "@/app/Navbar";
import InprogressFundDetail from "./InprogressFundDetail";
import PeacefulBgm from "@/public/src/components/bgm/PeacefulBgm";



export default function Page(){
  return(    <div className='relative bg-background-1'>
      <div className="grid grid-rows-12 h-screen border-separate" >
        <PeacefulBgm></PeacefulBgm>
        <Navbar/>
        <InprogressFundDetail/>
      </div>
    </div>
  )
}