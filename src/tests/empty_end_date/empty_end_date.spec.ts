import { parseCSV } from '../../core-functions/parse-csv';
import { empty_end_date_csv } from '../empty_end_date/empty_end_date';

describe('Empty or NULL end date', () => {
	it('should convert empty string, null, and NULL to TODAY', () => {
		const result = parseCSV('test.csv', empty_end_date_csv);

		expect(result.payload![1].date.getDate()).toBe(new Date().getDate());
	});
});
