import { FinishedOverlap, AccumulatedOverlap, PointInTime } from "../../types";
import { processEvents } from "./sweep-line";

export const accumulateOverlaps = (overlaps: FinishedOverlap[]): AccumulatedOverlap[] => {
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

	return accumulated.reduce((longest, current) => {
		if (current.cumulativeDurationInDays === longest[0].cumulativeDurationInDays) {
			const isSame = current.pair === longest[0].pair;
			return isSame ? longest : [...longest, current];
		}

		return current.cumulativeDurationInDays > longest[0].cumulativeDurationInDays ? [current] : longest;
	}, [accumulated[0]]);
};

export const findLongestCoworkingPair = (points: PointInTime[]): AccumulatedOverlap[] => {
	return findLongestCumulativeOverlap(processEvents(points));
};