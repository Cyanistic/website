const workspaceMotion = (name: string) => ({
	name,
	duration: '600ms',
	easing: 'var(--workspace-easing)',
	fillMode: 'both',
});

export const workspaceTransition = {
	forwards: {
		old: workspaceMotion('workspace-leave-left'),
		new: workspaceMotion('workspace-enter-right'),
	},
	backwards: {
		old: workspaceMotion('workspace-leave-right'),
		new: workspaceMotion('workspace-enter-left'),
	},
	same: {
		old: {
			name: 'workspace-fade-out',
			duration: '150ms',
			easing: 'ease-out',
			fillMode: 'both',
		},
		new: {
			name: 'workspace-fade-in',
			duration: '180ms',
			easing: 'ease-out',
			fillMode: 'both',
		},
	},
};
