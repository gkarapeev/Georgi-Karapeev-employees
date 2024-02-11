import {
	FinishedOverlap,
	AccumulatedOverlap,
	PointInTime,
	AggregatedPairOverlapData,
} from '../utils/types';
import { processEvents } from './sweep-line';

export const accumulateOverlaps = (
	overlaps: FinishedOverlap[]
): AccumulatedOverlap[] => {
	const accumulated = overlaps.reduce((acc, overlap) => {
		const key = `${overlap.projectId}_${overlap.pair}`;

		if (acc[key]) {
			acc[key].cumulativeDurationInDays += overlap.durationInDays;
		} else {
			acc[key] = {
				projectId: overlap.projectId,
				pair: overlap.pair,
				cumulativeDurationInDays: overlap.durationInDays,
			};
		}
		return acc;
	}, {} as { [key: string]: AccumulatedOverlap });

	return Object.values(accumulated);
};

export const findLongestCumulativeOverlap = (
	overlaps: FinishedOverlap[]
): AccumulatedOverlap[] => {
	const accumulated = accumulateOverlaps(overlaps);

	return accumulated.reduce(
		(longest, current) => {
			if (
				current.cumulativeDurationInDays ===
				longest[0].cumulativeDurationInDays
			) {
				const isSame = current.pair === longest[0].pair;
				return isSame ? longest : [...longest, current];
			}

			return current.cumulativeDurationInDays >
				longest[0].cumulativeDurationInDays
				? [current]
				: longest;
		},
		[accumulated[0]]
	);
};

export const aggregatePairOverlapData = (
	overlaps: AccumulatedOverlap[]
): AggregatedPairOverlapData[] => {
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

export const findProjectWithLongestCoworking = (
	points: PointInTime[]
): AccumulatedOverlap[] => {
	return findLongestCumulativeOverlap(processEvents(points));
};