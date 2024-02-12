import {
	findProjectWithLongestCoworking
} from '../../core-functions/accumulate-utils';
import { parseCSV } from '../../core-functions/parse-csv';
import {
	three_people_overlapping_csv,
	three_people_overlapping_longest_cumulative_pair,
	three_people_overlapping_points
} from './three_people_overlapping';

describe('Three people overlapping', () => {
	it('should parse csv correctly', () => {
		const result = parseCSV(
			'three_people_overlapping.csv',
			three_people_overlapping_csv
		);
		
		expect(result.payload).toEqual(three_people_overlapping_points);
	});

	it('should generate correct finished overlaps and longest pair', () => {
		const longestPair = findProjectWithLongestCoworking(three_people_overlapping_points);

		expect(longestPair).toEqual(three_people_overlapping_longest_cumulative_pair);
	});
});
