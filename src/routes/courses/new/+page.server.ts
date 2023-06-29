import { createNewCourse } from '$lib/db/courses.js';
import { getUserById } from '$lib/db/user.js';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.authUser) {
		throw error(401, 'Unauthorized');
	}

	return {};
};

export const actions = {
	default: async (event) => {
		const formData = Object.fromEntries(await event.request.formData());

		if (
			!formData.title ||
			!formData.releaseDate ||
			!formData.author ||
			!formData.description ||
			!String(formData.title).trim().length ||
			!String(formData.releaseDate).trim().length ||
			!String(formData.author).trim().length ||
			!String(formData.description).trim().length
		) {
			return fail(400, {
				error: true,
				message: 'All fields are required and should not be empty'
			});
		}

		const { title, releaseDate, author, description } = formData as {
			title: string;
			releaseDate: string;
			author: string;
			description: string;
		};

		const authUser = await getUserById(event.locals.authUser?.id);

		if (!authUser) {
			return fail(401, {
				error: true,
				message: 'Unauthorized'
			});
		}

		const newCourse = await createNewCourse(
			title,
			new Date(releaseDate),
			author,
			description,
			authUser?.id
		);

		if ('error' in newCourse) {
			return fail(400, newCourse);
		}

		throw redirect(303, `/courses/${newCourse.slug}`);
	}
};
