import { AggregatedPairOverlapData, PointInTime } from '../utils/types';
import { accumulateOverlaps } from './accumulate-utils';
import { processEvents } from './sweep-line';

export const aggregatePairOverlapData = (
	points: PointInTime[]
): AggregatedPairOverlapData[] => {
    const overlaps = accumulateOverlaps(processEvents(points));

    const pairMap: { [pair: string]: AggregatedPairOverlapData } = {};

	for (const overlap of overlaps) {
		if (!pairMap[overlap.pair]) {
			pairMap[overlap.pair] = {
				pair: overlap.pair,
				overlaps: [],
				totalDaysWorkingTogether: 0,
			};
		}

		pairMap[overlap.pair].totalDaysWorkingTogether +=
			overlap.cumulativeDurationInDays;

		pairMap[overlap.pair].overlaps.push(overlap);
	}

	const aggregatedData = Object.values(pairMap);
	return aggregatedData;
};
