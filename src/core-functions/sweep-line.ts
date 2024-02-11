import { MS_IN_DAY } from '../utils/constants';
import {
	EmployeeId,
	FinishedOverlap,
	Overlap,
	Pair,
	PointInTime,
	ProjectId,
} from '../utils/types';

// TODO: make individual parts of the algorithm more testable.
export const processEvents = (projectEvents: PointInTime[]) => {
	const projectsNow = new Map<ProjectId, EmployeeId[]>();
	const overlapsNow = new Map<ProjectId, Overlap[]>();
	const result: FinishedOverlap[] = [];

	projectEvents.forEach((e) => {
		const peopleWorking = projectsNow.get(e.projectId);
		const imWorking = peopleWorking?.includes(e.empId) ?? false;

		if (e.pointType === 'start') {
			if (imWorking) {
				alert(`EmpID ${e.empId} is already working on ${e.projectId}!`);
			} else if (peopleWorking) {
				projectsNow.set(e.projectId, [...peopleWorking, e.empId]);

				const newPairs: Pair[] = peopleWorking.map( // A new pair for me + every person working now
					(workingPersonId) => {
						return [e.empId, workingPersonId].sort().join('-');
					}
				);

				const newOverlaps: Overlap[] = newPairs.map((pair) => {
					return {
						projectId: e.projectId,
						start: e.date,
						pair: pair,
					};
				});

				const projectOverlaps = overlapsNow.get(e.projectId);
				overlapsNow.set(e.projectId, [
					...projectOverlaps || [],
					...newOverlaps,
				]);
			} else {
				projectsNow.set(e.projectId, [e.empId]);
			}
		}

		if (e.pointType === 'end') {
			const imWorkingButOthersToo =
				imWorking && peopleWorking && peopleWorking.length > 1;
			if (imWorkingButOthersToo) {
				projectsNow.set(
					e.projectId,
					peopleWorking.filter((empId) => empId !== e.empId)
				);
			}

			const onlyImWorking =
				peopleWorking && peopleWorking.length === 1 && imWorking;
			if (onlyImWorking) {
				projectsNow.delete(e.projectId);
			}

			const currentOverlaps = overlapsNow.get(e.projectId);
			if (currentOverlaps) {
				const finishedOverlaps: FinishedOverlap[] = currentOverlaps
					.filter((o) => o.pair.indexOf(e.empId.toFixed(0)) !== -1)
					.map((overlap) => {
						return {
							...overlap,
							end: e.date,
							durationInDays:
								(e.date.getTime() - overlap.start.getTime()) /
								MS_IN_DAY,
						};
					});

				result.push(...finishedOverlaps);

				const remainingOverlaps = currentOverlaps.filter((o) => o.pair.indexOf(e.empId.toFixed(0)) === -1);

				if (remainingOverlaps.length > 0) {
					overlapsNow.set(e.projectId, remainingOverlaps);
				} else {
					overlapsNow.delete(e.projectId);
				}
			}

			if (!peopleWorking || !imWorking) {
				alert(
					`Tried to end an event that hasn't started or has already ended:\n\n${JSON.stringify(
						e
					)}`
				);
			}
		}
	});

	return result;
};
