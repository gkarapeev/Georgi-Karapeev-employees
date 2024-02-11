import { MS_IN_DAY } from '../../constants';
import {
	EmployeeId,
	FinishedOverlap,
	Overlap,
	PointInTime,
	ProjectId,
} from '../../types';

// MASSIVE TODO: make it work with 2+ people!
// TODO: make individual internals of the algorithm testable, e.g:
// if event end, but other people working:
// - remove me from peopleWorking
// - project is still in projectsNow
export const processEvents = (projectEvents: PointInTime[]) => {
	projectEvents.sort((a, b) => a.date.getTime() - b.date.getTime());

	const projectsNow = new Map<ProjectId, EmployeeId[]>();
	const overlapsNow = new Map<ProjectId, Overlap>();
	const result: FinishedOverlap[] = [];

	projectEvents.forEach((e) => {
		const peopleWorking = projectsNow.get(e.projectId);
		const imWorking = peopleWorking?.includes(e.empId) ?? false;

		if (e.pointType === 'start') {
			if (imWorking) {
				alert(`EmpID ${e.empId} is already working on ${e.projectId}!`);
			} else if (peopleWorking) {
				projectsNow.set(e.projectId, [...peopleWorking, e.empId]);
				overlapsNow.set(e.projectId, {
					projectId: e.projectId,
					start: e.date,
					people: [...new Set([...peopleWorking, e.empId])],
				});
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

			const currentOverlap = overlapsNow.get(e.projectId);
			if (currentOverlap) {
				// Can't have an overlap if 1 of 2 people is ending
				const finishedOverlap: FinishedOverlap = {
					...currentOverlap,
					end: e.date,
					durationInDays:
						(e.date.getTime() - currentOverlap.start.getTime()) /
						MS_IN_DAY,
				};

				result.push(finishedOverlap);
				overlapsNow.delete(e.projectId);
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
