import { validateAndParseCSV } from '../../core-functions/csv-utils';
import { empty_end_date_csv, empty_end_date_points } from '../empty_end_date/empty_end_date';

describe('Empty or NULL end date', () => {
	it('should convert empty string, null, and NULL to TODAY', () => {
		const result = validateAndParseCSV('test.csv', empty_end_date_csv);

		expect(result.payload).toEqual(empty_end_date_points);
	});
});
