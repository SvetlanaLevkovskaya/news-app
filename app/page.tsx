import React from 'react';

import { ArticleCard } from '@/app/components/article-card';
import { ToolBar } from '@/app/components/tool-bar';

export default async function Home() {

	return (
		<main>
			<ToolBar />
			<ArticleCard />
		</main>
	);
}
