export const USE_PALIGA_CODES = {
  ["paliga"]: `
import { usePaliga, Timeline } from '@paliga/core'

function Component() {
  const { paliga } = usePaliga();
  return (
    <>
      <Timeline timeline={[{ x: 200 }]} paligaRef={paliga} />      
      <button onClick={() => paliga.current.play()}>Play</button>
    </>
  )
}`.trim(),
} as const;
