import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/features/layout/components/header.component';

export const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Kerja Merdeka',
	description: 'Generate CV kamu pake AI!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} antialiased`}>
				<Header />
				<main className="p-8 pb-20 gap-16 md:p-20 relative">{children}</main>
			</body>
		</html>
	);
}
