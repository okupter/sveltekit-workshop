import { prisma } from '$lib/db/prisma';
import { genSalt, hash } from 'bcryptjs';
import type { Prisma } from '@prisma/client';

const getUserByEmail = async (email: string) => {
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	});

	return user;
};

const getUserById = async (id: string | undefined) => {
	const user = await prisma.user.findUnique({
		where: {
			id
		}
	});

	return user;
};

const createNewUser = async (userData: Prisma.UserCreateInput) => {
	// Check if user already exists
	const user = await getUserByEmail(userData.email);

	if (user) {
		return {
			error: true,
			message: 'There is already a user with this email address'
		};
	}

	const salt = await genSalt(10);
	const hashedPassword = await hash(userData.password, salt);

	const newUser = await prisma.user.create({
		data: {
			...userData,
			password: hashedPassword
		}
	});

	return newUser;
};

export { getUserByEmail, getUserById, createNewUser };
