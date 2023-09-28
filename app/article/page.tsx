import React, { Suspense } from 'react';
import { ArticleDetails } from '@/app/components/article-details/article-details';
import styles from '@/app/page.module.css';
import { Loader } from '@/app/components/loader/loader';

const ArticlePage = () => {

	return (
		<div className={ styles.container }>
			<Suspense fallback={<Loader />}>
				<ArticleDetails />
			</Suspense>

		</div>
	);
};

export default ArticlePage

