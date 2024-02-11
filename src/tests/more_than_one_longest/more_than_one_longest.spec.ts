import { findLongestCoworkingPair } from '../../app/utils/accumulate-utils';
import {
	more_than_one_longest_points
} from './more_than_one_longest';

describe('More than one longest', () => {
	it('should display two longest pairs if needed', () => {
		const longestPair = findLongestCoworkingPair(more_than_one_longest_points);
		
		expect(longestPair.length).toBe(2);
	});
});
