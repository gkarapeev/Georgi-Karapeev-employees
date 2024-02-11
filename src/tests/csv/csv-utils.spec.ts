import { validateAndParseCSV } from '../../app/utils/csv-utils';
import { MUST_BE_CSV } from '../../constants';
import { event_list, test_CSV, test_CSV_empty_end, test_CSV_empty_end_event_list } from './mock-csv';

describe('csv utils', () => {
	it('should prevent non-csv file extension', async () => {
		const result = await validateAndParseCSV('test.something', test_CSV);
		expect(result).toEqual({
			success: false,
			message: MUST_BE_CSV,
		});
	});

	it('should convert empty string, null, and NULL to TODAY', async () => {
		const result = await validateAndParseCSV('test.csv', test_CSV_empty_end);
		expect(result.payload).toEqual(test_CSV_empty_end_event_list);
	});

	it('should parse CSV correclty', async () => {
		const result = await validateAndParseCSV('test.csv', test_CSV);
		expect(result).toEqual(event_list);
	});
});
