import { MS_IN_DAY } from '../../constants';
import { EmployeeId, OverlapInfo, PointInTime, ProjectId } from '../../types';

// Assuming `projectEvents` is an array of ProjectEvent
export const processEvents = (projectEvents: PointInTime[]) => {
	// 1. Sort the events chronologically
	projectEvents.sort((a, b) => a.Date.getTime() - b.Date.getTime());

	// 2. Create a hash map
	const ongoingProjects = new Map<ProjectId, Set<EmployeeId>>();
	const overlaps = new Map<ProjectId, OverlapInfo>();

	// TODO: row can't be valid if same person is already working on same project and you claim it's a start
	// Same for end

	// 3. Sweep
	projectEvents.forEach((event) => {
		const ongoingProject: Set<EmployeeId> | undefined = ongoingProjects.get(event.ProjectID);

		if (event.Type === 'start') {
			if (ongoingProject) {
				overlaps.set(event.ProjectID, { start: event.Date });
				ongoingProjects.set(event.ProjectID, ongoingProject.add(event.EmpID));
			} else {
				ongoingProjects.set(event.ProjectID, new Set().add(event.EmpID) as Set<EmployeeId>);
			}

		}

		if (event.Type === 'end') {
			const overlap = overlaps.get(event.ProjectID);
			if (overlap && ongoingProject && ongoingProject.size > 1) {
				const duration = (event.Date.getTime() - overlap.start.getTime()) / MS_IN_DAY;
				overlaps.set(event.ProjectID, { ...overlap, duration });
			}

			if (ongoingProject) {
				if (ongoingProject.size > 1) {
					ongoingProject.delete(event.EmpID);
				} else {
					ongoingProjects.delete(event.ProjectID);
				}
			}
		}
	});

	console.log(overlaps);
	// 4. Find the longest cumulative coworking period
};
