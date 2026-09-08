export const WORKSPACES = [
	{ id: 0, href: '/', title: 'Home', icon: '󰋜' },
	{ id: 1, href: '/projects', title: 'Projects', icon: '󰐯' },
	{ id: 2, href: '/software', title: 'Software', icon: '' },
	{ id: 3, href: '/blog', title: 'Writing', icon: '󰂺' },
	{ id: 4, href: '/about', title: 'About', icon: '󰀄' },
] as const;

export function getWorkspaceId(pathname: string): number | null {
	const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
	const workspace = WORKSPACES.find(({ href }) => href === '/'
		? path === '/'
		: path === href || path.startsWith(`${href}/`));

	return workspace?.id ?? null;
}
