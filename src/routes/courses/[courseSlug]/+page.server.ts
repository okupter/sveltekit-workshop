import { getCourseBySlug } from '$lib/db/courses.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { courseSlug } = params;

	const course = await getCourseBySlug(courseSlug);

	if (!course) {
		throw error(404, 'Course not found');
	}

	return {
		course
	};
};
