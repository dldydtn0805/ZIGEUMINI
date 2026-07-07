import bronze from "@/public/src/assets/images/Tier/bronze.png";
import silver from "@/public/src/assets/images/Tier/silver.png";
import gold from "@/public/src/assets/images/Tier/gold.png";
import platinum from "@/public/src/assets/images/Tier/platinum.png";
import diamond from "@/public/src/assets/images/Tier/diamond.png";
import master from "@/public/src/assets/images/Tier/master.png";
import challenger from "@/public/src/assets/images/Tier/challenger.png";

export default function getProfileRank(rankPoint?: number | null) {
  const rankPointValue = rankPoint ?? 0;

  if (rankPointValue < 100) {
    return bronze;
  } else if (rankPointValue < 200) {
    return silver;
  } else if (rankPointValue < 300) {
    return gold;
  } else if (rankPointValue < 400) {
    return platinum;
  } else if (rankPointValue < 500) {
    return diamond;
  } else if (rankPointValue < 600) {
    return master;
  } else return challenger;
}
