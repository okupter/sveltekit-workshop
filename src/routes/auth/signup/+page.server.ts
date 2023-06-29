import { createNewUser } from '$lib/db/user';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.authUser) {
		throw redirect(302, '/courses');
	}

	return {};
};

export const actions = {
	default: async (event) => {
		// Delete the jwtUser cookie if it exists
		event.cookies.delete('jwtUser');

		const formData = Object.fromEntries(await event.request.formData());

		if (
			!formData.email ||
			!formData.password ||
			!String(formData.email).trim().length ||
			!String(formData.password).trim().length
		) {
			return fail(400, {
				error: true,
				message: 'All fields are required and should not be empty'
			});
		}

		const { email, password } = formData as { email: string; password: string };

		const newUser = await createNewUser({ email, password });

		if ('error' in newUser) {
			return fail(400, newUser);
		}
	}
};
