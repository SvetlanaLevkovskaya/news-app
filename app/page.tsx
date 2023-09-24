import React from 'react';

import { ToolBar } from '@/app/components/tool-bar';
import ArticleCard from '@/app/components/article-card/article-card';
import styles from './page.module.css';

export default async function Home() {

	return (
		<div className={styles.container}>
			<ToolBar />
			<ArticleCard />
		</div>

	);
}
