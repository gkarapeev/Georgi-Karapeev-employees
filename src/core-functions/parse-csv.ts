import { parse } from 'date-fns';
import {
	MUST_BE_CSV,
	MUST_CONTAIN_COMMAS,
	DateFormat,
	SUPPORTED_DATE_FORMATS,
} from '../utils/constants';
import { Result, PointInTime } from '../utils/types';
import {
	isPossiblyHeader,
	validateHeaderRow,
	validateRow,
	makeEvents,
} from './csv-utils';

export const parseCSV = (
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
		}
	}

	if (dateFormat === null) {
		const message = `Could not parse '${firstDateString}' as a date. Supported formats are: ${SUPPORTED_DATE_FORMATS.map(
			(f) => `"${f}"`
		).join(', ')}`;
		alert(message);

		return {
			success: false,
			message,
		};
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
