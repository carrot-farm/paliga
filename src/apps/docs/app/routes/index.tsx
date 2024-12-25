import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import PlayPage from "../../pages/play/PlayPage";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
