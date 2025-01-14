export const REACT_CODES = {
  ["timelineProps"]: `
import { TimelineGroup } from "paliga"
function Component() {
  const { paliga } = usePaliga()
  return (
    <>
      <TimelineGroup timeline={[{ x: 200 }, { y: 70 }]} paligaRef={paliga}>
        <div className="box-1 flex flex-col gap-y-2">
          <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
          <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
        </div>
      </TimelineGroup>
      <button onClick={() => paliga.current.play()}>Play</button>
    </>
  )
}`,
  ["progress"]: `
import { TimelineGroup } from "paliga"
function Component() {
  const { paliga } = usePaliga()
  return (
    <>
      <TimelineGroup progress={0.3} timeline={[{ x: 200 }, { y: 70 }]} paligaRef={paliga}>
        <div className="box-1 flex flex-col gap-y-2">
          <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
          <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
        </div>
      </TimelineGroup>
      <button onClick={() => paliga.current.resume()}>Play</button>
    </>
  )
}`,
  ["isAutoPlay"]: `
import { TimelineGroup } from "paliga"
function Component() {  
  return (
    <>
      <TimelineGroup isAutoPlay timeline={[{ x: 200 }, { y: 70 }]} >
        <div className="box-1 flex flex-col gap-y-2">
          <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
          <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
        </div>
      </TimelineGroup>    
    </>
  )
}`,
  ["autoPlayOptions"]: `
import { TimelineGroup } from "paliga"
function Component() {  
  return (
    <>
      <TimelineGroup isAutoPlay autoPlayOptions={{ iteration: 2 }} timeline={[{ x: 200 }, { y: 70 }]} >
        <div className="box-1 flex flex-col gap-y-2">
          <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
          <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
        </div>
      </TimelineGroup>    
    </>
  )
}`,
  ["intersectionPlay"]: `
import { TimelineGroup } from "paliga"
function Component() {  
  return (
    <>
      <TimelineGroup 
        isIntersectionPlay
        intersectionPlayOptions={{ threshold: 1 }} 
        timeline={[{ x: 200 }]} 
      >
        <div className="box-1 flex flex-col gap-y-2">
          <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
          <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
        </div>
      </TimelineGroup>    
    </>
  )
}`,
  ["scrollProgress"]: `
import { TimelineGroup } from "paliga"
function Component() {  
  return (    
    <TimelineGroup 
      isScrollProgress={true}
      scrollProgressOptions={{
        trigger: "20%",
        startY: -100,
        endY: 80,
        duration: 400,        
      }}
      timeline={[{ x: 200 }]} 
    >
      <div className="box-1 flex flex-col gap-y-2">
        <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
        <TimelineGroup.Item className="h-5 w-5 rounded-md bg-warning" />
      </div>
    </TimelineGroup>    
  )
}`,
} as const;
