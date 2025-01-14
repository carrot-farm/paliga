import { BrowserRouter, Route, Routes } from "react-router-dom";
import TransitionAnimationPage from "../../pages/animation/TransitionAnimationPage";
import Home from "../../pages/Home";
import IntersectionPlayPage from "../../pages/intersection-play/IntersectionPlayPage";
import ReverseMethodPage from "../../pages/methods/ReverseMethodPage";
import PausePage from "../../pages/pause/PausePage";
import PlayPage from "../../pages/play/PlayPage";
import ProgressPage from "../../pages/progress/ProgressPage";
import ReactDevIntersectionPlayPage from "../../pages/react/dev/ReactDevIntersectionPlayPage";
import ReactDevPlayPage from "../../pages/react/dev/ReactDevPlayPage";
import ReactDevScrollProgress1Page from "../../pages/react/dev/ReactDevScrollProgress1Page";
import ReactDevScrollProgress2Page from "../../pages/react/dev/ReactDevScrollProgress2Page";
import ReactDevTimelineGroupPage from "../../pages/react/dev/ReactDevTimelineGroupPage";
import ReactDevPage from "../../pages/react/ReactDevPage";
import ReactTimelineGroupPage from "../../pages/react/ReactTimelineGroupPage";
import ReactTimelinePage from "../../pages/react/ReactTimelinePage";
import ReactUsePaligaPage from "../../pages/react/ReactUsePaligaPage";
import ScrollProgressPage from "../../pages/scroll-progress/scrollProgressPage";
import TimelinePage from "../../pages/timeline/TimelinePage";
import { MainLayout } from "../../widgets/MainLayout";

export function BaseRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/pause" element={<PausePage />} />
          <Route path="/intersection-play" element={<IntersectionPlayPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/scroll-progress" element={<ScrollProgressPage />} />
          <Route path="/methods">
            <Route path="reverse" element={<ReverseMethodPage />} />
          </Route>
          <Route path="/animation">
            <Route path="transition" element={<TransitionAnimationPage />} />
          </Route>
          <Route path="/react">
            <Route path="timeline" element={<ReactTimelinePage />} />
            <Route path="timeline-group" element={<ReactTimelineGroupPage />} />
            <Route path="dev">
              <Route index element={<ReactDevPage />} />
              <Route path="play" element={<ReactDevPlayPage />} />
              <Route path="intersectino-play" element={<ReactDevIntersectionPlayPage />} />
              <Route path="scroll-progress-1" element={<ReactDevScrollProgress1Page />} />
              <Route path="scroll-progress-2" element={<ReactDevScrollProgress2Page />} />
              <Route path="timeline-group" element={<ReactDevTimelineGroupPage />} />
            </Route>
            <Route path="use-paliga" element={<ReactUsePaligaPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
