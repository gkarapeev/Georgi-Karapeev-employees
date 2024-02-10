import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Result } from '../types';
import { readCSVFile } from './utils/csv-utils';
import { processEvents } from './utils/algo-utils';

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
			const solution = processEvents(result.payload!);
			console.log(solution);
		} else {
			alert(result.message);
		}
	}
}
