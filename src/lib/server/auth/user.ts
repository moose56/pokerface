import prisma from '$lib/prisma';

export async function createUser(googleId: string, email: string, name: string): Promise<User> {
	try {
		const result = await prisma.user.create({
			data: {
				googleId: googleId,
				email: email,
				name: name
			}
		});

		return {
			id: result.id,
			googleId: result.googleId,
			email: result.email,
			name: result.name
		};
	} catch (e: any) {
		throw new Error(`Unexpected error creating user: ${e.message}`);
	}
}

export async function getUserFromGoogleId(googleId: string): Promise<User | null> {
	const result = await prisma.user.findUnique({
		where: {
			googleId: googleId
		}
	});

	if (result === null) {
		return null;
	}

	return {
		id: result.id,
		googleId: result.googleId,
		email: result.email,
		name: result.name
	};
}

export interface User {
	id: number;
	email: string;
	googleId: string;
	name: string;
}