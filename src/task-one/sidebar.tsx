import { FC, memo } from 'react';

interface Props {}

export const sidebar: FC<Props> = memo(() => {
	return <div>sidebar</div>;
});

sidebar.displayName = 'sidebar';