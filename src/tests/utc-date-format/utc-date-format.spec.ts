import { parseCSV } from '../../core-functions/parse-csv';
import { utc_date_format_csv, utc_date_format_csv_invalid, utc_date_format_points } from './utc-date-format';

describe('UTC Date string format', () => {
	it('should support UTC date strings as input', () => {
		const result = parseCSV('utc_date_format.csv', utc_date_format_csv);

		expect(result.payload).toEqual(utc_date_format_points);
	});

	it('should break when no valid format is found', () => {
		const result = parseCSV('utc_date_format.csv', utc_date_format_csv_invalid);

		expect(result.success).toBe(false);
	});
});
