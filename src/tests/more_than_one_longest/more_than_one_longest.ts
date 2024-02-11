import { AccumulatedOverlap, FinishedOverlap, PointInTime } from '../../types';

export const more_than_one_longest_csv = `EmpID,ProjectID,DateFrom,DateTo
1,11,2020-01-01,2020-01-10
2,11,2020-01-01,2020-01-10
2,22,2020-03-01,2020-03-10
3,22,2020-03-01,2020-03-10`;

export const more_than_one_longest_points: PointInTime[] = [
	{
		empId: 1,
		projectId: 11,
		date: new Date('2020-01-01T00:00:00.000Z'),
		pointType: 'start',
	},
	{
		empId: 2,
		projectId: 11,
		date: new Date('2020-01-01T00:00:00.000Z'),
		pointType: 'start',
	},
	{
		empId: 1,
		projectId: 11,
		date: new Date('2020-01-10T00:00:00.000Z'),
		pointType: 'end',
	},
	{
		empId: 2,
		projectId: 11,
		date: new Date('2020-01-10T00:00:00.000Z'),
		pointType: 'end',
	},
	{
		empId: 2,
		projectId: 22,
		date: new Date('2020-03-01T00:00:00.000Z'),
		pointType: 'start',
	},
	{
		empId: 3,
		projectId: 22,
		date: new Date('2020-03-01T00:00:00.000Z'),
		pointType: 'start',
	},
	{
		empId: 2,
		projectId: 22,
		date: new Date('2020-03-10T00:00:00.000Z'),
		pointType: 'end',
	},
	{
		empId: 3,
		projectId: 22,
		date: new Date('2020-03-10T00:00:00.000Z'),
		pointType: 'end',
	},
];

export const more_than_one_longest_finished_overlaps: FinishedOverlap[] = [
	{
		projectId: 11,
		start: new Date('2020-01-01T00:00:00.000Z'),
		pair: '1-2',
		end: new Date('2020-01-10T00:00:00.000Z'),
		durationInDays: 9,
	},
	{
		projectId: 22,
		start: new Date('2020-03-01T00:00:00.000Z'),
		pair: '2-3',
		end: new Date('2020-03-10T00:00:00.000Z'),
		durationInDays: 9,
	},
];

export const more_than_one_longest_accumulated_overlaps: AccumulatedOverlap[] =
	[
		{
			projectId: 11,
			pair: '1-2',
			cumulativeDurationInDays: 9,
		},
		{
			projectId: 22,
			pair: '2-3',
			cumulativeDurationInDays: 9,
		},
	];

export const more_than_one_longest_longest_pair: AccumulatedOverlap[] = [
	{
		projectId: 11,
		pair: '1-2',
		cumulativeDurationInDays: 9,
	},
	{
		projectId: 22,
		pair: '2-3',
		cumulativeDurationInDays: 9,
	},
];
