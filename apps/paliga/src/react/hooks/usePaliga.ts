import { useRef } from "react";
import { Paliga } from "../../core/Paliga";

export const usePaliga = () => {
  const paliga = useRef<Paliga>(new Paliga());

  return { paliga };
};
