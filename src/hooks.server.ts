import { JWT_ENCRYPTION_SECRET } from '$env/static/private';
import { getUserById } from '$lib/db/user';
import { redirect } from '@sveltejs/kit';
import { verify } from 'jsonwebtoken';

export const handle = async ({ event, resolve }) => {
	// Get the JWT token cookie
	const jwtCookie = event.cookies.get('jwtUser');

	if (jwtCookie) {
		try {
			const jwtUser = verify(jwtCookie, JWT_ENCRYPTION_SECRET) as {
				id: string;
				iat: number;
				exp: number;
			};

			// TODO: check if the token has expired, if yes, refresh it

			// Check that the user exists in the database
			const existingUser = await getUserById(jwtUser.id);

			if (!existingUser) {
				event.cookies.delete('jwtUser');
				throw redirect(302, '/auth/login');
			}

			// Add the JWT user to the locals
			event.locals.authUser = jwtUser;
		} catch (err) {
			event.cookies.delete('jwtUser');
			throw redirect(302, '/auth/login');
		}
	}

	const response = await resolve(event);
	return response;
};
