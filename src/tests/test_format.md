- Each test-case should be in its own folder {NAME}

- The folder should contain 3 items:
    - {NAME}.csv
    - {NAME}.spec.ts
    - {NAME}.ts

- The .ts file should declare the following constants in this order:
    - {NAME}_csv: string
    - {NAME}_points: PointInTime[]
    - {NAME}_finished_overlaps: FinishedOverlap[]
    - {NAME}_accumulated_overlaps: AccumulatedOverlap[]
    - {NAME}_longest_cumulative_pair: AccumulatedOverlap[]
