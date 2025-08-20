import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FileText, House, User } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({
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
				<header className="sticky top-0 z-10 bg-white flex items-center justify-between w-screen min-h-20 shadow-sm shadow-gray-500 px-8 md:px-20 py-2">
					<div className="flex gap-2 items-center">
						<Link href='/' className="font-sans font-bold text-accent text-2xl">KerjaMerdeka</Link>
						<nav className="flex gap-2">
							<Link
								href={'/job-companion'}
								className="flex items-center gap-1 px-4 py-2 text-sm bg-accent text-white rounded-lg"
							>
								<House />
								Dashboard
							</Link>
							<Link
								href={'/'}
								className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg"
							>
								<FileText />
								CV Saya
							</Link>
						</nav>
					</div>
					<div className="flex gap-2">
						<Link
              href={'/profile'}
							className="flex items-center gap-1 px-4 py-2 text-sm"
						>
							<User />
							Profile
						</Link>
						<button
							className="flex items-center gap-1 px-4 py-2 text-sm bg-[#EF4444] text-white rounded-lg"
							disabled
						>
							Logout
						</button>
					</div>
				</header>
				<main className="p-8 pb-20 gap-16 md:p-20">{children}</main>
			</body>
		</html>
	);
}
