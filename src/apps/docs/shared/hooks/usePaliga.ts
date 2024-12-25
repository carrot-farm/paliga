import { useEffect, useMemo } from "react";
import { Paliga } from "../../../../core/Paliga";

export const usePaliga = () => {
  const paliga = useMemo(() => new Paliga(), []);

  useEffect(() => {
    paliga.initialize();
  }, []);

  return { paliga };
};
