"use client";
/** ===== Components ===== */
function PauseIcon({}: PauseIconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M208 432h-48a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16zm144 0h-48a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v320a16 16 0 0 1-16 16z"></path>
    </svg>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type PauseIconProps = {};

export default PauseIcon;
