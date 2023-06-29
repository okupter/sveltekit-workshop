import { fail } from '@sveltejs/kit';

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

		const { title, releaseDate, author, description } = formData;
	}
};
