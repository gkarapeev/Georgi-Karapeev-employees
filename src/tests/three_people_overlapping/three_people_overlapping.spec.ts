import {
	accumulateOverlaps,
	findLongestCoworkingPair,
	findLongestCumulativeOverlap,
} from '../../core-functions/accumulate-utils';
import { validateAndParseCSV } from '../../core-functions/csv-utils';
import { processEvents } from '../../core-functions/sweep-line';
import {
	three_people_overlapping_csv,
	three_people_overlapping_finished_overlaps,
	three_people_overlapping_longest_cumulative_pair,
	three_people_overlapping_points,
} from './three_people_overlapping';

describe('Three people overlapping', () => {
	it('should parse csv correctly', () => {
		const result = validateAndParseCSV(
			'three_people_overlapping.csv',
			three_people_overlapping_csv
		);
		
		expect(result.payload).toEqual(three_people_overlapping_points);
	});

	it('should generate correct finished overlaps and longest pair', () => {
		const longestPair = findLongestCoworkingPair(three_people_overlapping_points);

		expect(longestPair).toEqual(three_people_overlapping_longest_cumulative_pair);
	});
});
