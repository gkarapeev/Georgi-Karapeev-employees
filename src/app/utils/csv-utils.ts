import { COLUMN_NAMES, MUST_BE_CSV, MUST_CONTAIN_COMMAS } from '../../constants';
import { PointInTime, Result } from '../../types';

export const readCSVFile = (e: Event): Promise<Result> => {
	return new Promise((resolve) => {
		const file = (e.target as HTMLInputElement).files![0];

		const reader = new FileReader();

		reader.onload = function (e) {
			const csvString = e.target!.result as string;
			const result: Result = validateAndParseCSV(file.name, csvString);

			resolve(result);
		};

		reader.onerror = function () {
			resolve({ success: false, message: 'Error reading file.' });
		};

		reader.readAsText(file);
	});
};

export const validateAndParseCSV = (fileName: string, csvString: string): Result => {
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

		const [start, end] = makeEvents(row);
		rows.splice(rowIndex, 1, start as any, end as any); // Updating in-place for performance.
	}

	return {
		success: true,
		message: 'CSV is valid.',
		payload: rows as any as PointInTime[],
	};
};

const makeEvents = (columns: string[]): [PointInTime, PointInTime] => {
	return [
		{
			EmpID: Number(columns[0]),
			ProjectID: Number(columns[1]),
			Date: new Date(columns[2]),
			Type: 'start',
		},
		{
			EmpID: Number(columns[0]),
			ProjectID: Number(columns[1]),
			Date: new Date(columns[3]),
			Type: 'end',
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
	// NULL or empty string value for DateFrom
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
