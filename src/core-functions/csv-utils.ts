import { parse } from 'date-fns';
import {
	COLUMN_NAMES,
	DateFormat
} from '../utils/constants';
import { PointInTime, Result } from '../utils/types';


export const makeEvents = (columns: string[], dateFormat: DateFormat): [PointInTime, PointInTime] => {
	const startDate = parse(columns[2], dateFormat!, new Date());
	const endDate = parse(columns[3], dateFormat!, new Date());

	const invalid = [startDate, endDate].find(d => !(d instanceof Date) || isNaN(d.getTime()));
	if (invalid) {
		const message = `Could not parse ${columns[2]} or ${columns[3]} as a valid date.`;
		alert(message);
		throw new Error(message);
	}

	return [
		{
			empId: Number(columns[0]),
			projectId: Number(columns[1]),
			date: startDate,
			pointType: 'start',
		},
		{
			empId: Number(columns[0]),
			projectId: Number(columns[1]),
			date: endDate,
			pointType: 'end',
		},
	];
};

export const isPossiblyHeader = (line: string[]): string[] | false => {
	if (
		Number.isNaN(Number(line[0])) ||
		Number.isNaN(Number(line[1])) ||
		line.some((value) =>
			COLUMN_NAMES.some((v) => v.toLowerCase() === value.toLowerCase())
		)
	) {
		return line;
	}

	return false;
};

export const validateHeaderRow = (row: string[]): void => {
	// TODO: Can have specific message for each column - expected vs actual
	if (
		row[0] !== COLUMN_NAMES[0] ||
		row[1] !== COLUMN_NAMES[1] ||
		row[2] !== COLUMN_NAMES[2] ||
		row[3] !== COLUMN_NAMES[3]
	) {
		alert(`
			The valid column names for this project are:\n
			'EmpID', 'ProjectID', 'DateFrom', 'DateTo'\n\n
			They are currently not used, so the program will continue, but please fix them.
		`);
	}
};

export const validateRow = (row: string[], rowIndex: number): Result => {
	// TODO: Cases to handle
	// wrong date formats - all kinds of sheity strings!
	// Non-integer id

	if (row.length !== 4) {
		return {
			success: false,
			message: `Line ${
				rowIndex + 1
			} of the CSV file does not match the expected format: EmpID, ProjectID, DateFrom, DateTo.`,
		};
	}

	return { success: true };
};
