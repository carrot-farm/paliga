export const GUIDE_CODES = {
  ["usage_1"]: `import { Paliga } from '@paliga/core'
import { HTMLDivElement } from 'react'

function Component() {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!divRef.current) {
      return
    }
    const paliga = new Paliga();
    paliga.timeline([divRef.current], { x: 200 }).play()
  }, [])

  return (
    <>
      <div ref={divRef}></div>
    </>
  )
}
`,
  ["usage_2"]: `import { Timeline } from '@paliga/core'
import { HTMLDivElement } from 'react'

function Component() {
  return (
    <>
      <Timeline isAutoPlay timeline={[{x: 200}]} />
    </>
  )
}
`,
} as const;
