import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridDataResult, GridModule, PageChangeEvent } from '@progress/kendo-angular-grid';
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
export class AppComponent implements AfterViewInit {
	public fullData: OverlapGridData[] = [];

	public gridView: GridDataResult = {
		data: [] as OverlapGridData[],
		total: 0
	};

	public pageSize = 100;
	public skip = 0;
	public gridHeight!: number;

	public loading = false;

	private loadGridPage(): void {
		this.gridView = {
			data: this.fullData.slice(this.skip, this.skip + this.pageSize),
			total: this.fullData.length,
		};
	}

	public pageChange(event: PageChangeEvent): void {
		this.skip = event.skip;
		this.loadGridPage();
	}

	public async handleChange(e: Event) {
		this.loading = true;
		const result: Result = await readCSVFile(e);

		this.loading = false;

		if (result.success) {
			const points: PointInTime[] = result.payload!;
			const pairs = aggregatePairOverlapData(points);
			const data = makeGridData(pairs);

			this.fullData = data;
			this.loadGridPage();
		} else {
			alert(result.message);
		}
	}

	public ngAfterViewInit(): void {
		this.gridHeight = window.innerHeight - 50;
	}
}
