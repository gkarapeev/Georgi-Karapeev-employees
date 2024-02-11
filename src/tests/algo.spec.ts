import { processEvents } from '../app/utils/algo';
import {
	p11_35days_p22_45days_points,
	p11_35days_p22_45days_overlaps,
} from './mock-events';

describe('Sweep line algorithm', () => {
	it('should match input and output', () => {
		const result = processEvents(p11_35days_p22_45days_points);
		expect(result).toEqual(p11_35days_p22_45days_overlaps);
	});
});
