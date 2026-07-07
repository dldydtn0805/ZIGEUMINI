import lv1 from "@/public/src/assets/images/Level/lv1.png";
import lv2 from "@/public/src/assets/images/Level/lv2.png";
import lv3 from "@/public/src/assets/images/Level/lv3.png";
import lv4 from "@/public/src/assets/images/Level/lv4.png";
import lv5 from "@/public/src/assets/images/Level/lv5.png";

export default function getProfileImage(asset?: number | null) {
  const assetValue = asset ?? 0;

  if (assetValue < 10000000) {
    return lv1;
  } else if (assetValue < 20000000) {
    return lv2;
  } else if (assetValue < 30000000) {
    return lv3;
  } else if (assetValue < 40000000) {
    return lv4;
  }
  return lv5;
}
