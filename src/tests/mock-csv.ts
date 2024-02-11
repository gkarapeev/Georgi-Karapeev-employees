import { PointInTime, Result } from '../types';

export const test_CSV = `EmpID,ProjectID,DateFrom,DateTo
1,11,2020-01-01,2020-02-01
2,11,2020-01-01,2020-02-01
1,22,2020-03-01,2020-05-01
2,22,2020-03-01,2020-04-15
1,11,2020-06-01,2020-06-10
2,11,2020-06-05,2020-06-10`;

export const test_CSV_empty_end = `1,11,2020-01-01,`;
export const test_CSV_empty_end_event_list: PointInTime[] = [
	{
		empId: 1,
		projectId: 11,
		date: new Date('2020-01-01T00:00:00.000Z'),
		pointType: 'start',
	},
	{
		empId: 1,
		projectId: 11,
		date: new Date('2024-02-11T00:00:00.000Z'),
		pointType: 'end',
	},
];

export const event_list: Result = {
	success: true,
	message: 'CSV is valid.',
	payload: [
		{
			empId: 1,
			projectId: 11,
			date: new Date('2020-01-01T00:00:00.000Z'),
			pointType: 'start',
		},
		{
			empId: 1,
			projectId: 11,
			date: new Date('2020-02-01T00:00:00.000Z'),
			pointType: 'end',
		},
		{
			empId: 2,
			projectId: 11,
			date: new Date('2020-01-01T00:00:00.000Z'),
			pointType: 'start',
		},
		{
			empId: 2,
			projectId: 11,
			date: new Date('2020-02-01T00:00:00.000Z'),
			pointType: 'end',
		},
		{
			empId: 1,
			projectId: 22,
			date: new Date('2020-03-01T00:00:00.000Z'),
			pointType: 'start',
		},
		{
			empId: 1,
			projectId: 22,
			date: new Date('2020-05-01T00:00:00.000Z'),
			pointType: 'end',
		},
		{
			empId: 2,
			projectId: 22,
			date: new Date('2020-03-01T00:00:00.000Z'),
			pointType: 'start',
		},
		{
			empId: 2,
			projectId: 22,
			date: new Date('2020-04-15T00:00:00.000Z'),
			pointType: 'end',
		},
		{
			empId: 1,
			projectId: 11,
			date: new Date('2020-06-01T00:00:00.000Z'),
			pointType: 'start',
		},
		{
			empId: 1,
			projectId: 11,
			date: new Date('2020-06-10T00:00:00.000Z'),
			pointType: 'end',
		},
		{
			empId: 2,
			projectId: 11,
			date: new Date('2020-06-05T00:00:00.000Z'),
			pointType: 'start',
		},
		{
			empId: 2,
			projectId: 11,
			date: new Date('2020-06-10T00:00:00.000Z'),
			pointType: 'end',
		},
	],
};
