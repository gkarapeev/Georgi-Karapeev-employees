import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { aggregatePairOverlapData } from '../core-functions/aggregate-pair-data';
import { readCSVFile } from '../core-functions/read-csv-file';
import { OverlapGridData, PointInTime, Result } from '../utils/types';
import { makeGridData } from './utils';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, GridModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	public gridData: OverlapGridData[] = [];

	public async handleChange(e: Event) {
		const result: Result = await readCSVFile(e);
		
		if (result.success) {
			const points: PointInTime[] = result.payload!;
			const pairs = aggregatePairOverlapData(points);
			const data = makeGridData(pairs);

			this.gridData = data;
		} else {
			alert(result.message);
		}
	}
}
