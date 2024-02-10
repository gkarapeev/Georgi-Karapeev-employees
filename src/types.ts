import { COLUMN_NAMES } from './constants';

type ProjectEventType = 'start' | 'end';

export type ColumnName = (typeof COLUMN_NAMES)[number];
export type EmployeeId = number;
export type ProjectId = number;

export interface PointInTime {
	EmpID: EmployeeId;
	ProjectID: ProjectId;
	Date: Date;
	Type: ProjectEventType;
}

export interface Result {
	success: boolean;
	message?: string;
	payload?: PointInTime[];
}

export type OverlapInfo = {
	start: Date;
	duration?: number;
};
