"use client";
import { useRef } from "react";
// import { TestSection } from "../shared/TestSection";

/** ===== Components ===== */
function Home({}: HomeProps) {
  const box1 = useRef<HTMLDivElement | null>(null);

  return (
    <div className="">
      <h3 className="font-semibold">Animate</h3>

      {/* <TestSection 
        description="2000ms 동안 x 축으로 200px 이동"
        onReady={({ paliga }) => {
          if(!box1.current) {
            return
          }
          paliga.animate([box1.current],{ 
            x: 200,
            duration: 2000
          });
        }}
        onPlay={({ paliga }) => paliga?.play()}
      >
        <TestSection.Box className="bg-red-500" ref={box1} />
      </TestSection> */}
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type HomeProps = {};

export default Home;
