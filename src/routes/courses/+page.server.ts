import { getAllCourses } from '$lib/db/courses';

export const load = async () => {
	return {
		courses: getAllCourses()
	};
};
