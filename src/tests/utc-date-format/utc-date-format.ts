import { PointInTime } from '../../utils/types';

export const utc_date_format_csv = `1,11,2020-03-01T00:00:00.000Z,2020-03-02T00:00:00.000Z
2,11,2020-03-01T00:00:00.000Z,2020-03-02T00:00:00.000Z`;

export const utc_date_format_csv_invalid = `1,11,20200301T00:00:00.000Z,20200302T00:00:00.000Z
2,11,20200301T00:00:00.000Z,20200302T00:00:00.000Z`;

export const utc_date_format_points: PointInTime[] = [
	{
		empId: 1,
		projectId: 11,
		date: new Date('2020-03-01T00:00:00.000Z'),
		pointType: 'start',
	},
	{
		empId: 2,
		projectId: 11,
		date: new Date('2020-03-01T00:00:00.000Z'),
		pointType: 'start',
	},
	{
		empId: 1,
		projectId: 11,
		date: new Date('2020-03-02T00:00:00.000Z'),
		pointType: 'end',
	},
	{
		empId: 2,
		projectId: 11,
		date: new Date('2020-03-02T00:00:00.000Z'),
		pointType: 'end',
	},
];
