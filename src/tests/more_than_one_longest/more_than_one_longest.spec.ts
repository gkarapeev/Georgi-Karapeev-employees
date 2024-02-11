import { accumulateOverlaps, findLongestCumulativeOverlap } from '../../app/utils/accumulate-utils';
import { validateAndParseCSV } from '../../app/utils/csv-utils';
import { processEvents } from '../../app/utils/sweep-line';
import {
	more_than_one_longest_csv,
} from './more_than_one_longest';

describe('More than one longest', () => {
	it('should display two longest pairs if needed', () => {
		const result = validateAndParseCSV(
			'more_than_one_longest.csv',
			more_than_one_longest_csv
		);

		const overlaps = processEvents(result.payload!);
		const accumulatedOverlaps = accumulateOverlaps(overlaps);
		const longestCumulativeOverlap = findLongestCumulativeOverlap(accumulatedOverlaps);
		
		expect(longestCumulativeOverlap.length).toBe(2);
	});
});
