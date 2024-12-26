import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import IntersectionPlayPage from "../../pages/intersection-play/IntersectionPlayPage";
import PlayPage from "../../pages/play/PlayPage";
import ProgressPage from "../../pages/progress/ProgressPage";
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
          <Route path="/intersection-play" element={<IntersectionPlayPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/scroll-progress" element={<ScrollProgressPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
