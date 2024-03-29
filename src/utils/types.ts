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

export type Pair = string; // e.g. 1-2 where 1 and 2 are EmployeeId's, always sorted by smaller first!

export type Overlap = {
	projectId: ProjectId;
	start: Date;
	pair: Pair;
};

export interface FinishedOverlap extends Overlap {
	end: Date;
	durationInDays: number;
}

export interface AccumulatedOverlap {
	projectId: ProjectId;
	pair: Pair;
	cumulativeDurationInDays: number;
}

export interface AggregatedPairOverlapData {
	pair: Pair;
	overlaps: AccumulatedOverlap[];
	totalDaysWorkingTogether: number;
}

export interface OverlapGridData extends AggregatedPairOverlapData {
	person_1: EmployeeId;
	person_2: EmployeeId;
}

export interface PerformanceStats {
	time?: string;
	numberOfRows?: number;
}
