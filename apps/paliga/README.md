# Paliga Docs

## Installation

```
npm install @paliga/core
```

## Usage

. js

```
const paliga = new Paliga();
const box1 = document.getElementById('box1')

paliga.timeline([box1], { x: 200 }).play()
```

. react

```
import { Timeline } from "@paliga/core"

function Component() {
  return (
    <>
      <Timeline isAutoPlay timeline={[{ x: 200 }]}  />
    </>
  )
}

```
