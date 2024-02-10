import { Result } from '../../types';
import { validateAndParseCSV } from './csv-utils';

const test_CSV = `EmpID,ProjectID,DateFrom,DateTo
1,11,2020-01-01,2020-02-01
2,11,2020-01-01,2020-02-01
1,22,2020-03-01,2020-05-01
2,22,2020-03-01,2020-04-15
1,11,2020-06-01,2020-06-10
2,11,2020-06-05,2020-06-10`;

const expected: Result = {
	success: true,
	message: 'CSV is valid.',
	payload: [
		{
			EmpID: 1,
			ProjectID: 11,
			Date: new Date('2020-01-01T00:00:00.000Z'),
			Type: 'start',
		},
		{
			EmpID: 1,
			ProjectID: 11,
			Date: new Date('2020-02-01T00:00:00.000Z'),
			Type: 'end',
		},
		{
			EmpID: 2,
			ProjectID: 11,
			Date: new Date('2020-01-01T00:00:00.000Z'),
			Type: 'start',
		},
		{
			EmpID: 2,
			ProjectID: 11,
			Date: new Date('2020-02-01T00:00:00.000Z'),
			Type: 'end',
		},
		{
			EmpID: 1,
			ProjectID: 22,
			Date: new Date('2020-03-01T00:00:00.000Z'),
			Type: 'start',
		},
		{
			EmpID: 1,
			ProjectID: 22,
			Date: new Date('2020-05-01T00:00:00.000Z'),
			Type: 'end',
		},
		{
			EmpID: 2,
			ProjectID: 22,
			Date: new Date('2020-03-01T00:00:00.000Z'),
			Type: 'start',
		},
		{
			EmpID: 2,
			ProjectID: 22,
			Date: new Date('2020-04-15T00:00:00.000Z'),
			Type: 'end',
		},
		{
			EmpID: 1,
			ProjectID: 11,
			Date: new Date('2020-06-01T00:00:00.000Z'),
			Type: 'start',
		},
		{
			EmpID: 1,
			ProjectID: 11,
			Date: new Date('2020-06-10T00:00:00.000Z'),
			Type: 'end',
		},
		{
			EmpID: 2,
			ProjectID: 11,
			Date: new Date('2020-06-05T00:00:00.000Z'),
			Type: 'start',
		},
		{
			EmpID: 2,
			ProjectID: 11,
			Date: new Date('2020-06-10T00:00:00.000Z'),
			Type: 'end',
		},
	],
};

describe('csv utils', () => {
	it('should parse CSV correclty', async () => {
		const result = await validateAndParseCSV('test.csv', test_CSV);
		expect(result).toEqual(expected);
	});
});
