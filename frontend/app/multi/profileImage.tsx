import Image from "next/image"
import Profile from '@/public/src/assets/images/penguin.png'
import getProfileImage from "@/public/src/utils/getProfileImage"
import useMe from "@/public/src/hooks/useMe"

export default function ProfileImage(){
  const { data: me } = useMe()
  const asset = me?.asset
  return(
    <div className="flex justify-around">
      <Image
        src={getProfileImage(asset)}
        alt="profile-image"
        width={10}
        height={10}
        className="rounded-full"
        />
      <h5 className="mb-1 text-sm font-medium text-gray-900 dark:text-white">개미는 차갑다</h5>
    </div>
  )
}
