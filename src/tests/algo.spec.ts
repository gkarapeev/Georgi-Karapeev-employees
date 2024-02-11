import { accumulateOverlaps, processEvents } from '../app/utils/algo';
import { CumulativeTimePerPairPerProject } from '../types';
import {
	p11_35days_p22_45days_points,
	p11_35days_p22_45days_overlaps,
} from './mock-events';
import { p11_35days_accumulated, p11_35days_interval } from './should-join-intervals';

describe('Sweep line algorithm', () => {
	it('should match input and output', () => {
		const result = processEvents(p11_35days_p22_45days_points);
		expect(result).toEqual(p11_35days_p22_45days_overlaps);
	});

	it('should accumulate days worked on same project from different intervals', () => {
		const result: CumulativeTimePerPairPerProject[] = accumulateOverlaps(p11_35days_interval);
		expect(result[0]).toEqual(p11_35days_accumulated);
	});
});
