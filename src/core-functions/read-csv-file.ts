import { Result } from "../utils/types";
import { validateAndParseCSV } from "./csv-utils";

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