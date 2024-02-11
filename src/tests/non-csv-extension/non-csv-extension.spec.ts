import { validateAndParseCSV } from '../../app/utils/csv-utils';
import { MUST_BE_CSV } from '../../constants';

describe('non-csv-extension', () => {
	it('should prevent non-csv file extension', () => {
		const result = validateAndParseCSV('test.something', '');

		expect(result.message).toEqual(MUST_BE_CSV);
	});
});
