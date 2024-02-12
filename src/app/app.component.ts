import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
	GridDataResult,
	GridModule,
	PageChangeEvent,
} from '@progress/kendo-angular-grid';
import { aggregatePairOverlapData } from '../core-functions/aggregate-pair-data';
import { readCSVFile } from '../core-functions/read-csv-file';
import { OverlapGridData, PerformanceStats, PointInTime, Result } from '../utils/types';
import { makeGridData } from './utils';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { AvatarModule } from '@progress/kendo-angular-layout';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { HttpClientModule } from '@angular/common/http';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { xIcon } from '@progress/kendo-svg-icons';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		GridModule,
		NavigationModule,
		AvatarModule,
		UploadsModule,
		HttpClientModule,
		ButtonsModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
	public fullData: OverlapGridData[] = [];

	public gridView: GridDataResult = {
		data: [] as OverlapGridData[],
		total: 0,
	};

	public pageSize = 100;
	public skip = 0;
	public gridHeight!: number;

	public loading = false;
	public performanceStats: PerformanceStats = {};

	public currentFile: any = null;
	public xIcon = xIcon;

	constructor(private cdr: ChangeDetectorRef) {}

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

	public async loadCSV([file]: File[]) {
		this.loading = true;
		this.currentFile = {
			name: file.name,
			size: file.size,
			lastModified: new Date(file.lastModified),
		};

		const startTime = performance.now();
		const result: Result = await readCSVFile(file);

		this.loading = false;

		if (result.success) {
			const endTime = performance.now();
			this.performanceStats = {
				time: (endTime - startTime).toFixed(0),
				numberOfRows: result.payload!.length / 2
			};

			const points: PointInTime[] = result.payload!;
			const pairs = aggregatePairOverlapData(points);
			const data = makeGridData(pairs);

			this.fullData = data;
			this.loadGridPage();
		} else {
			alert(result.message);
		}
	}

	public reset() {
		this.fullData = [];
		this.currentFile = null;
		this.gridView = {
			data: [] as OverlapGridData[],
			total: 0,
		};
		this.performanceStats = {};
	}

	public ngAfterViewInit(): void {
		this.gridHeight = window.innerHeight - 137;
		this.cdr.detectChanges();
	}
}
