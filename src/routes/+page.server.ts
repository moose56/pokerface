import { type Actions, fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/auth/session";

export async function load(event: RequestEvent) {
	if (event.locals.session === null || event.locals.user === null) {
		return redirect(302, "/login");
	}
	return {
		user: event.locals.user
	};
}

// TODO: have a look at https://github.com/sveltejs/kit/issues/6315#issuecomment-1374680430

export const actions: Actions = {
	default: action
};

async function action(event: RequestEvent) {
	if (event.locals.session === null) {
		return fail(401);
	}
	await invalidateSession(event.locals.session.id);
	deleteSessionTokenCookie(event);
	return redirect(302, "/login");
}