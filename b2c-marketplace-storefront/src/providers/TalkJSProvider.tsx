'use client';

import { Session } from '@talkjs/react';
import Talk from 'talkjs';
import { useCallback } from 'react';

type User = {
	id: string;
	email: string;
	first_name: string | null;
	last_name: string | null;
	phone?: string | null;
};

type TalkJSProviderProps = {
	appId?: string;
	user: User | null;
	children: React.ReactNode;
};

export function TalkJSProvider({ appId, user, children }: TalkJSProviderProps) {
	const syncUser = useCallback(() => {
		if (!user) return new Talk.User({ id: 'anonymous', name: 'Anonymous' });

		const firstName = user.first_name || 'Guest';
		const lastName = user.last_name || 'User';

		return new Talk.User({
			id: user.id,
			name: `${firstName} ${lastName}`,
			email: user.email,
			phone: user.phone || undefined,
			role: 'customer',
		});
	}, [user]);

	if (!appId || !user) {
		return <>{children}</>;
	}

	return (
		<Session appId={appId} syncUser={syncUser}>
			{children}
		</Session>
	);
}

