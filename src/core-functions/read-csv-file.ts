import { Result } from '../utils/types';
import { parseCSV } from './parse-csv';

export const readCSVFile = (file: File): Promise<Result> => {
	return new Promise((resolve) => {
		const reader = new FileReader();

		reader.onload = function (ev) {
			const csvString = ev.target!.result as string;
			const result: Result = parseCSV(file.name, csvString);

			resolve(result);
		};

		reader.onerror = function () {
			resolve({ success: false, message: 'Error reading file.' });
		};

		reader.readAsText(file);
	});
};
