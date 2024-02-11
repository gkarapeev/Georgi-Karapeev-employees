import { AccumulatedOverlap, FinishedOverlap, PointInTime } from "../../utils/types";

export const three_people_overlapping_csv = `EmpID,ProjectID,DateFrom,DateTo
1,11,2020-01-01T00:00:00.000Z,2020-02-01T00:00:00.000Z
2,11,2020-01-15T00:00:00.000Z,2020-01-20T00:00:00.000Z
3,11,2020-01-01T00:00:00.000Z,2020-02-15T00:00:00.000Z`;

export const three_people_overlapping_points: PointInTime[] = [
	{
		empId: 1,
		projectId: 11,
		date: new Date('2020-01-01T00:00:00.000Z'),
		pointType: 'start',
	},
	{
		empId: 3,
		projectId: 11,
		date: new Date('2020-01-01T00:00:00.000Z'),
		pointType: 'start',
	},
	{
		empId: 2,
		projectId: 11,
		date: new Date('2020-01-15T00:00:00.000Z'),
		pointType: 'start',
	},
	{
		empId: 2,
		projectId: 11,
		date: new Date('2020-01-20T00:00:00.000Z'),
		pointType: 'end',
	},
	{
		empId: 1,
		projectId: 11,
		date: new Date('2020-02-01T00:00:00.000Z'),
		pointType: 'end',
	},
	{
		empId: 3,
		projectId: 11,
		date: new Date('2020-02-15T00:00:00.000Z'),
		pointType: 'end',
	},
];

export const three_people_overlapping_finished_overlaps: FinishedOverlap[] = [
	{
		projectId: 11,
		start: new Date('2020-01-15T00:00:00.000Z'),
		pair: '1-2',
		end: new Date('2020-01-20T00:00:00.000Z'),
		durationInDays: 5,
	},
	{
		projectId: 11,
		start: new Date('2020-01-15T00:00:00.000Z'),
		pair: '2-3',
		end: new Date('2020-01-20T00:00:00.000Z'),
		durationInDays: 5,
	},
	{
		projectId: 11,
		start: new Date('2020-01-01T00:00:00.000Z'),
		pair: '1-3',
		end: new Date('2020-02-01T00:00:00.000Z'),
		durationInDays: 31,
	},
];

export const three_people_overlapping_longest_cumulative_pair: AccumulatedOverlap[] = [
	{
		projectId: 11,
		pair: '1-3',
		cumulativeDurationInDays: 31,
	},
];
