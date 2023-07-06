import throttleEvent from "@utils/throttleEvent";
import {useMemo} from "react";

export default function useThrottle(delay: number) {
  // Мемоизируем функцию
  return useMemo(() => throttleEvent(delay), [delay]);
}
