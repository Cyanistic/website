import { getWorkspaceId } from '../workspaces';

document.addEventListener('astro:before-preparation', (event) => {
	const from = getWorkspaceId(event.from.pathname);
	const to = getWorkspaceId(event.to.pathname);

	event.direction = from === null || to === null || from === to
		? 'same'
		: to > from
			? 'forward'
			: 'back';
});
