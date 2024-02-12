import { parseCSV } from '../../core-functions/parse-csv';
import { MUST_BE_CSV } from '../../utils/constants';

describe('non-csv-extension', () => {
	it('should prevent non-csv file extension', () => {
		const result = parseCSV('test.something', '');

		expect(result.message).toEqual(MUST_BE_CSV);
	});
});
