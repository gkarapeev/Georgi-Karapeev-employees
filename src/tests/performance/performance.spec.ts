import { parseCSV } from '../../core-functions/parse-csv';
import { ten_thousand_rows } from './10K_rows';

describe('Performance', () => {
	it('should be super fast 🔥', () => {
        const start = performance.now();
		parseCSV('load_test.csv', ten_thousand_rows);
        const end = performance.now();

		expect(end - start).toBeLessThan(500);
	});
});
