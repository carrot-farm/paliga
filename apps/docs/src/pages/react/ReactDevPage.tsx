"use client";
import { Link } from "react-router-dom";

/** ===== Components  ===== */
function ReactDevPage({}: ReactDeugrops) {
  return (
    <div className="flex flex-col gap-y-10">
      <ul className="flex list-disc flex-col gap-y-5">
        <li>
          <Link to="/react/dev/play" className="hover:underline">
            Play
          </Link>
        </li>
        <li>
          <Link to="/react/dev/intersectino-play" className="hover:underline">
            Intersection Play
          </Link>
        </li>
        <li>
          <Link to="/react/dev/scroll-progress-1" className="hover:underline">
            Scroll Progress
          </Link>
        </li>
        <li>
          <Link to="/react/dev/scroll-progress-2" className="hover:underline">
            Scroll Progress( container )
          </Link>
        </li>
        <li>
          <Link to="/react/dev/timeline-group" className="hover:underline">
            Timeline Group
          </Link>
        </li>
      </ul>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactDeugrops = {};

export default ReactDevPage;
