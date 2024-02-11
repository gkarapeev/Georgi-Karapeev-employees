import {
	CumulativeTimePerPairPerProject,
	FinishedOverlap,
} from '../types';

export const p11_35days_interval: FinishedOverlap[] = [
	{
		projectId: 11,
		start: new Date('2020-01-01T00:00:00.000Z'),
		people: [1, 2],
		end: new Date('2020-02-01T00:00:00.000Z'),
		durationInDays: 31,
	},
	{
		projectId: 11,
		start: new Date('2020-06-05T00:00:00.000Z'),
		people: [1, 2],
		end: new Date('2020-06-10T00:00:00.000Z'),
		durationInDays: 5,
	},
];

export const p11_35days_accumulated: CumulativeTimePerPairPerProject = {
	projectId: 11,
	people: [1, 2],
	cumulativeDurationInDays: 36,
};
