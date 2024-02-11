import { COLUMN_NAMES } from './constants';

type PointType = 'start' | 'end';

export type ColumnName = (typeof COLUMN_NAMES)[number];
export type EmployeeId = number;
export type ProjectId = number;

export interface PointInTime {
	empId: EmployeeId;
	projectId: ProjectId;
	date: Date;
	pointType: PointType;
}

export interface Result {
	success: boolean;
	message?: string;
	payload?: PointInTime[];
}

export type Overlap = {
	projectId: ProjectId;
	start: Date;
	people: EmployeeId[];
};

export interface FinishedOverlap extends Overlap {
	end: Date;
	durationInDays: number;
};