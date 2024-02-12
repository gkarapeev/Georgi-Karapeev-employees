import { validateAndParseCSV } from '../../core-functions/csv-utils';
import { ten_thousand_rows } from './10K_rows';

describe('Performance', () => {
	it('should be super fast 🔥', () => {
        const start = performance.now();
		validateAndParseCSV('load_test.csv', ten_thousand_rows);
        const end = performance.now();

		expect(end - start).toBeLessThan(500);
	});
});
