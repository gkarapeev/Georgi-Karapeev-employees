import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Result } from '../utils/types';
import { findLongestCoworkingPair } from '../core-functions/accumulate-utils';
import { readCSVFile } from '../core-functions/read-csv-file';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	public async handleChange(e: Event) {
		const result: Result = await readCSVFile(e);
		
		if (result.success) {
			const longest = findLongestCoworkingPair(result.payload!);
			console.log(longest);
		} else {
			alert(result.message);
		}
	}
}
