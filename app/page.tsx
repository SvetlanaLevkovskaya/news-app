import React from 'react';

import { ToolBar } from '@/app/components/tool-bar';
import ArticleCard from '@/app/components/article-card';

export default async function Home() {

	return (
		<>
			<ToolBar />
			<ArticleCard />
		</>

	);
}
