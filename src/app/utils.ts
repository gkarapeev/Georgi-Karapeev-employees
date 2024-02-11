import { AggregatedPairOverlapData, OverlapGridData } from '../utils/types';

export const makeGridData = (
	data: AggregatedPairOverlapData[]
): OverlapGridData[] => {
	return data.map((item) => {
        const [ person_1, person_2] = item.pair.split('-').map(n => Number(n));

        return {
			...item,
			person_1,
			person_2,
		};
	}).sort((a, b) => b.totalDaysWorkingTogether - a.totalDaysWorkingTogether);
};
