import React from 'react';
import { ArticleDetails } from '@/app/components/article-details/article-details';
import styles from '@/app/page.module.css';

const ArticlePage = () => {

	return (
		<div className={styles.container}>
			<ArticleDetails />
			</div>
	);
};

export default ArticlePage

