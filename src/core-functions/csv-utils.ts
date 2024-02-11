import { parse } from 'date-fns';
import {
	COLUMN_NAMES,
	DateFormat,
	MUST_BE_CSV,
	MUST_CONTAIN_COMMAS,
	SUPPORTED_DATE_FORMATS,
} from '../utils/constants';
import { PointInTime, Result } from '../utils/types';

export const validateAndParseCSV = (
	fileName: string,
	csvString: string
): Result => {
	if (!fileName.toLowerCase().endsWith('.csv')) {
		return {
			success: false,
			message: MUST_BE_CSV,
		};
	}

	if (!csvString.includes(',')) {
		return {
			success: false,
			message: MUST_CONTAIN_COMMAS,
		};
	}

	const rows: string[] = csvString.split('\n');

	const lastLineEmpty = rows.at(-1) === '';
	if (lastLineEmpty) {
		rows.pop();
	}

	const headerRow = isPossiblyHeader(rows[0].split(','));
	if (headerRow) {
		rows.splice(0, 1);
		validateHeaderRow(headerRow);
	}

	let dateFormat: DateFormat = null;
	const firstDateString = rows[0].split(',')[2];
	// const firstDateString = rows.find(r => !!r.split(',')[2]);

	for (const format of SUPPORTED_DATE_FORMATS) {
		const parsedDate = parse(firstDateString, format, new Date());

		if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
			dateFormat = format;
			break;
		};
	}

	if (dateFormat === null) {
		const message = `Could not parse '${firstDateString}' as a date. Supported formats are: ${SUPPORTED_DATE_FORMATS.map(f => `"${f}"`).join(', ')}`;
		alert(message);

		return {
			success: false,
			message,
		}
	}

	for (let i = 0; i < rows.length / 2; i++) {
		const rowIndex = i === 0 ? i : i * 2;
		const row = rows[rowIndex].split(',');

		if (row[3] === '' || row[3].toLowerCase() === 'null') {
			const todayString = new Date().toISOString().split('T')[0];
			row[3] = todayString;
		}

		const rowValidationState: Result = validateRow(row, i);
		if (rowValidationState.success === false) {
			return rowValidationState;
		}

		const [start, end] = makeEvents(row, dateFormat);
		rows.splice(rowIndex, 1, start as any, end as any); // Updating in-place for performance.
	}

	(rows as any as PointInTime[]).sort(
		(a, b) => a.date.getTime() - b.date.getTime()
	);

	return {
		success: true,
		message: 'CSV is valid.',
		payload: rows as any as PointInTime[],
	};
};

const makeEvents = (columns: string[], dateFormat: DateFormat): [PointInTime, PointInTime] => {
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

const isPossiblyHeader = (line: string[]): string[] | false => {
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

const validateHeaderRow = (row: string[]): void => {
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

const validateRow = (row: string[], rowIndex: number): Result => {
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
