import { PointInTime, Result } from '../types';
import { p11_35days_p22_45days_points } from './mock-events';

export const p11_35days_p22_45days_csv = `EmpID,ProjectID,DateFrom,DateTo
1,11,2020-01-01,2020-02-01
2,11,2020-01-01,2020-02-01
1,22,2020-03-01,2020-05-01
2,22,2020-03-01,2020-04-15
1,11,2020-06-01,2020-06-10
2,11,2020-06-05,2020-06-10`;

export const test_CSV_empty_end = `1,11,2020-01-01,`;

export const event_list: Result = {
	success: true,
	message: 'CSV is valid.',
	payload: p11_35days_p22_45days_points
};
