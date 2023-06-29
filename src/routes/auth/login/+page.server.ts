import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getUserByEmail } from '$lib/db/user';
import { fail, redirect } from '@sveltejs/kit';
import { JWT_ENCRYPTION_SECRET } from '$env/static/private';

export const load = async ({ locals }) => {
	if (locals.authUser) {
		throw redirect(302, '/courses');
	}

	return {};
};

export const actions = {
	default: async (event) => {
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

		// Check that there is a user with the given email
		const existingUser = await getUserByEmail(email);

		if (!existingUser) {
			return fail(400, {
				error: true,
				message: 'Invalid email or password'
			});
		}

		// Check that the password matches
		const passwordMatches = await compare(password, existingUser.password);

		if (!passwordMatches) {
			return fail(400, {
				error: true,
				message: 'Invalid email or password'
			});
		}

		// Create a jwt token with the user id
		const jwtUser = sign({ id: existingUser.id }, JWT_ENCRYPTION_SECRET, { expiresIn: '7d' });

		// Create a secure cookie with the jwt token
		event.cookies.set('jwtUser', jwtUser, {
			path: '/',
			httpOnly: import.meta.env.PROD,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		// Redirect to the courses page
		throw redirect(302, '/courses');
	}
};
