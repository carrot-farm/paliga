import { useEffect, useRef } from "react";
import { Paliga } from "../../";
import "./App.css";

function App() {
  const kniRef = useRef<Paliga | null>(null);
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  // const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    // setAnimate(true);
    // kniRef.current?.play({});
    // kniRef.current?.progress(0.6);
    // kniRef.current?.intersectionPlay();
    // kniRef.current?.scrollProgress({ start: -200, end: 400 });
  };

  useEffect(() => {
    if (!ref1.current || !ref2.current) {
      return;
    }

    kniRef.current = new Paliga();
    // kniRef.current.animate([ref1.current, ref2.current], {
    kniRef.current
      .animate([ref1.current], {
        x: 400,
        y: 600,
        duration: 700,
        // delay: 500,
        // iteration: 2,
        // opacity: 0.5,
        // direction: "alternate",
        // easing: "easeOutBounce",
        // each: ({ delay = 0 }, i) => ({
        //   delay: delay + i * 200,
        // }),
        // onFrame: ({ progress }) => ({
        //   y: -200 * progress + 200 * 2 * progress ** 2,
        // }),
      })
      .animate([ref2.current], {
        x: 700,
        y: 600,
        duration: 700,
      })
      .scrollProgress({ start: 0, end: 400, duration: 500 });
    // .animate([ref2.current], {
    //   y: -200,
    //   // delay: 2000,
    //   duration: 2000,
    //   easing: "easeOutBounce",
    // });
    // .play();
  }, [ref1.current, ref2.current]);

  return (
    <div style={{ height: "300vh" }}>
      {/* <div>
        <button onClick={handleClick}>play</button>
        <button onClick={() => kniRef.current?.pause()}>Pause</button>
      </div> */}
      <div></div>
      <div
        style={{
          position: "relative",
          backgroundColor: "#efefef",
          width: "100%",
          height: "600px",
          marginTop: "200px",
        }}
      >
        <div
          className="box-1"
          ref={ref1}
          style={{
            // position: "absolute",
            backgroundColor: "red",
            // top: "calc(100vh + 300px)",
            width: 20,
            height: 20,
          }}
        ></div>
        <div
          className="box-2"
          ref={ref2}
          style={{
            // position: "absolute",
            // top: "20px",
            backgroundColor: "blue",
            width: 20,
            height: 20,
            // ...(animate
            //   ? {
            //       transform: "translate3d(200px,0px,0px)",
            //       transition: "transform 1s ease-in-out",
            //     }
            //   : undefined),
          }}
          // onTransitionEnd={() => setAnimate(false)}
        ></div>
      </div>
    </div>
  );
}

export default App;
