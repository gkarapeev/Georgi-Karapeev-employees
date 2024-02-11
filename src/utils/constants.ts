export const COLUMN_NAMES = [
	'EmpID',
	'ProjectID',
	'DateFrom',
	'DateTo',
] as const;

export const MS_IN_DAY = 1000 * 60 * 60 * 24;

export const MUST_BE_CSV = 'File extension must be .csv or .CSV';
export const MUST_CONTAIN_COMMAS =
	'The provided CSV file does not contain any commas.';

export const SUPPORTED_DATE_FORMATS = [
	'yyyy-MM-dd',
	`yyyy-MM-dd'T'HH:mm:ss.SSSX`,
	'yyyy.MM.dd',
	'MM/dd/yyyy',
	'dd/MM/yyyy',
] as const;

export type DateFormat = typeof SUPPORTED_DATE_FORMATS[number] | null;