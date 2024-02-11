import { PointInTime } from "../../utils/types";

export const empty_end_date_csv = `1,11,2020-01-01,`;

export const empty_end_date_points: PointInTime[] = [
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