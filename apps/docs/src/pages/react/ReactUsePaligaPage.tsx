"use client";
import { Timeline, usePaliga } from "@paliga/core/src";
import { USE_PALIGA_CODES } from "../../features/hooks/constants/usePaligaCodes";
import { TestSection } from "../../features/test/components/TestSection";
import { SectionTitle } from "../../shared/components/SectionTitle";

/** ===== Components ===== */
function ReactUsePaligaPage({}: ReactUsePaligaPageProps) {
  const { paliga } = usePaliga();
  return (
    <div>
      <SectionTitle>usePaliga()</SectionTitle>

      <div className="flex flex-col gap-y-10">
        <TestSection
          title="paliga"
          titleLink="paliga"
          description="`new Paliga()` 인스턴스."
          code={USE_PALIGA_CODES["paliga"]}
          onPlay={() => paliga.current.play()}
        >
          <Timeline
            className="bg-warning h-5 w-5 rounded-md"
            timeline={[{ x: 200 }]}
            paligaRef={paliga}
          />
        </TestSection>
      </div>
    </div>
  );
}

/** ===== Others ===== */

/** ===== Types ===== */
export type ReactUsePaligaPageProps = {};

export default ReactUsePaligaPage;
