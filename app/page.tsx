import React from 'react';
import getConfig from 'next/config'
import { ArticleCard } from '@/app/components/article-card';


export default async function Home() {
	const { publicRuntimeConfig } = getConfig();

	const apiKey = publicRuntimeConfig.GUARDIAN_API_KEY;
	const apiUrl = `${ publicRuntimeConfig.GUARDIAN_API_URL }search?show-fields=body,headline,thumbnail&api-key=${ apiKey }`;

	const res = await fetch(apiUrl);
	const data: any = await res.json();

	const news = await data.response.results;

	return (
		<main>
			Home page
			<div>
				{ news.map((item: any) => (
					<ArticleCard key={ item.id } item={ item } />
				)) }
			</div>
		</main>
	);
}
