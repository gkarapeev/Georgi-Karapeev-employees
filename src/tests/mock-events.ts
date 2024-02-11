import { FinishedOverlap, PointInTime } from '../types';

export const test_CSV_empty_end_points: PointInTime[] = [
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

export const p11_35days_p22_45days_points: PointInTime[] = [
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
];

export const p11_35days_p22_45days_overlaps: FinishedOverlap[] = [
	{
		projectId: 11,
		start: new Date('2020-01-01T00:00:00.000Z'),
		pair: '1-2',
		end: new Date('2020-02-01T00:00:00.000Z'),
		durationInDays: 31,
	},
	{
		projectId: 22,
		start: new Date('2020-03-01T00:00:00.000Z'),
		pair: '1-2',
		end: new Date('2020-04-15T00:00:00.000Z'),
		durationInDays: 45,
	},
	{
		projectId: 11,
		start: new Date('2020-06-05T00:00:00.000Z'),
		pair: '1-2',
		end: new Date('2020-06-10T00:00:00.000Z'),
		durationInDays: 5,
	},
];

export const p11_35days_p22_45days_longest = {
	projectId: 22,
	start: new Date('2020-03-01T00:00:00.000Z'),
	people: '1-2',
	end: new Date('2020-04-15T00:00:00.000Z'),
	durationInDays: 45,
};
