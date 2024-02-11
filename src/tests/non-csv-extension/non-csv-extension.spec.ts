import { validateAndParseCSV } from '../../core-functions/csv-utils';
import { MUST_BE_CSV } from '../../utils/constants';

describe('non-csv-extension', () => {
	it('should prevent non-csv file extension', () => {
		const result = validateAndParseCSV('test.something', '');

		expect(result.message).toEqual(MUST_BE_CSV);
	});
});
