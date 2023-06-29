import { prisma } from '$lib/db/prisma';

const slugify = (text: string) => {
	return text
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9-]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
};

const getCourseBySlug = async (slug: string) => {
	const course = await prisma.course.findUnique({
		where: {
			slug
		},
		select: {
			id: true,
			title: true,
			releaseDate: true,
			authorName: true,
			description: true
		}
	});

	return course;
};

const getAllCourses = async () => {
	const courses = await prisma.course.findMany({
		select: {
			id: true,
			title: true,
			slug: true,
			releaseDate: true,
			authorName: true,
			description: true
		}
	});

	return courses;
};

const createNewCourse = async (
	title: string,
	releaseDate: Date,
	authorName: string,
	description: string,
	userId: string
) => {
	// Check that there is no course with the same slug
	const existingCourse = await getCourseBySlug(slugify(title));

	if (existingCourse) {
		return {
			error: true,
			message: 'A course with the same title already exists'
		};
	}

	const newCourse = await prisma.course.create({
		data: {
			title,
			slug: slugify(title),
			releaseDate,
			authorName,
			description,
			user: {
				connect: {
					id: userId
				}
			}
		}
	});

	return newCourse;
};

export { getCourseBySlug, getAllCourses, createNewCourse };
