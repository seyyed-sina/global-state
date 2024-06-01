import { FC } from "react";
import { clx } from "../utils/helpers";

interface Props {
  className?: string;
}

export const LoadingMask: FC<Props> = ({ className }) => {
  const maskClass = clx(
    "animate-[pulse_850ms_ease_alternate_infinite] rounded-[4px] bg-black/10",
    className
  );

  return <div className={maskClass}></div>;
};
