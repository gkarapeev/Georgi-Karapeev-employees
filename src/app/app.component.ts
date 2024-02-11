import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { findLongestCoworkingPair } from '../core-functions/longest-coworking-pair';
import { readCSVFile } from '../core-functions/read-csv-file';
import { PointInTime, Result } from '../utils/types';

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
			const points: PointInTime[] = result.payload!;
			const finalAnswer = findLongestCoworkingPair(points);
			console.log(finalAnswer);
		} else {
			alert(result.message);
		}
	}
}
