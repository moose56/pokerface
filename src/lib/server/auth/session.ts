import prisma from '$lib/prisma';
import { encodeBase32, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

import { type User } from './user';
import { type RequestEvent } from '@sveltejs/kit';

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const result = await prisma.session.findFirst({
		where: { id: sessionId },
		include: {user: true},
	});

	if (result === null) {
		return { session: null, user: null };
	}

	const session: Session = {
		id: result.id,
		userId: result.userId,
		expiresAt: new Date(result.expiresAt * 1000)
	};

	const user: User = {
		id: result.user.id,
		googleId: result.user.googleId,
		email: result.user.email,
		name: result.user.name
	};

	if (Date.now() >= session.expiresAt.getTime()) {
		await invalidateSession(session.id);
		return { session: null, user: null };
	}

	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

		await prisma.session.update({
			where: { id: session.id },
			data: { expiresAt: Math.floor(session.expiresAt.getTime() / 1000) }
		});
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await prisma.session.delete({ where: { id: sessionId } });
}

export async function invalidateUserSessions(userId: number): Promise<void> {
	await prisma.session.deleteMany({ where: { userId: userId } });
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		expires: expiresAt
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		maxAge: 0
	});
}

export function generateSessionToken(): string {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	return encodeBase32(tokenBytes).toLowerCase();
}

export async function createSession(token: string, userId: number): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};

	try {
		const result = await prisma.session.create({
			data: {
				id: session.id,
				userId: session.userId,
				expiresAt: Math.floor(session.expiresAt.getTime() / 1000)
			}
		});
	} catch (e: any) {
		throw new Error(`Unexpected error creating session: ${e.message}`);
	}

	return session;
}

export interface Session {
	id: string;
	expiresAt: Date;
	userId: number;
}

type SessionValidationResult = { session: Session; user: User } | { session: null; user: null };