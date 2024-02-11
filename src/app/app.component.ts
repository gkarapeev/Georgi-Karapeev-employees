import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccumulatedOverlap, FinishedOverlap, Result } from '../types';
import { readCSVFile } from './utils/csv-utils';
import { processEvents } from './utils/sweep-line';
import { accumulateOverlaps, findLongestCumulativeOverlap } from './utils/accumulate-utils';

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
			const accumulatedOverlaps = accumulateOverlaps(overlaps); // TODO: move this into the method below
			const longestCumulativeOverlap: AccumulatedOverlap[] = findLongestCumulativeOverlap(accumulatedOverlaps);
			console.log(longestCumulativeOverlap);
		} else {
			alert(result.message);
		}
	}
}
