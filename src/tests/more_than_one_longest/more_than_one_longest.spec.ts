import { findProjectWithLongestCoworking } from '../../core-functions/accumulate-utils';
import {
	more_than_one_longest_points
} from './more_than_one_longest';

describe('More than one longest', () => {
	it('should display two longest pairs if needed', () => {
		const longestPair = findProjectWithLongestCoworking(more_than_one_longest_points);
		
		expect(longestPair.length).toBe(2);
	});
});
