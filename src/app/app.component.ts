import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FinishedOverlap, Result } from '../types';
import { readCSVFile } from './utils/csv-utils';
import { findLongestOverlap, processEvents } from './utils/algo';

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
			const overlaps: FinishedOverlap[] = processEvents(result.payload!);
			const longestOverlap: FinishedOverlap = findLongestOverlap(overlaps);
			console.log(longestOverlap);
		} else {
			alert(result.message);
		}
	}
}
