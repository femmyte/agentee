'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';

function Providers({ children }) {
	return (
		<NextUIProvider>
			<NextThemesProvider attribute='class' defaultTheme='light'>
				{children}
			</NextThemesProvider>
		</NextUIProvider>
	);
}

export default Providers;
