import { FinishedOverlap, CumulativeTimePerPairPerProject } from "../../types";

export const accumulateOverlaps = (overlaps: FinishedOverlap[]): CumulativeTimePerPairPerProject[] => {
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
	}, {} as { [key: string]: CumulativeTimePerPairPerProject });

	return Object.values(accumulated);
};

export const findLongestCumulativeOverlap = (
	overlaps: CumulativeTimePerPairPerProject[]
): CumulativeTimePerPairPerProject => {
	return overlaps.reduce((longest, current) => {
		return current.cumulativeDurationInDays > longest.cumulativeDurationInDays
			? current
			: longest;
	}, overlaps[0]);
};
