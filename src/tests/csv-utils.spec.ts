import { validateAndParseCSV } from '../app/utils/csv-utils';
import { MUST_BE_CSV } from '../constants';
import { event_list, p11_35days_p22_45days_csv, test_CSV_empty_end } from './mock-csv';
import { test_CSV_empty_end_points } from './mock-events';

describe('csv utils', () => {
	it('should prevent non-csv file extension', async () => {
		const result = await validateAndParseCSV('test.something', p11_35days_p22_45days_csv);
		expect(result).toEqual({
			success: false,
			message: MUST_BE_CSV,
		});
	});

	it('should convert empty string, null, and NULL to TODAY', async () => {
		const result = await validateAndParseCSV('test.csv', test_CSV_empty_end);
		expect(result.payload).toEqual(test_CSV_empty_end_points);
	});

	it('should parse CSV correclty', async () => {
		const result = await validateAndParseCSV('test.csv', p11_35days_p22_45days_csv);
		expect(result).toEqual(event_list);
	});
});
