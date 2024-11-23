'use client';
import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function SwitchMode() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div>
			<Switch
				isSelected={theme === 'dark'}
				onValueChange={() =>
					setTheme(theme == 'dark' ? 'light' : 'dark')
				}
			/>
		</div>
	);
}
