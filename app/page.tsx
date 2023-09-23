import Link from 'next/link';
import React from 'react';

export default function Home() {
	return (
		<main>
			Home page
			<div>
				<Link href={ '/article' }>ArticlePage</Link>
			</div>
		</main>
	)
}
