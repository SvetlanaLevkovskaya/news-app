'use client'

import React, { useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';

import { NewsItem, setLoadMore } from '@/redux/features/news-slice';
import { formatPublicationDate } from '@/app/lib/format-publication-date';
import { fetchNews } from '@/redux/services/fetch-news';
import styles from './article-card.module.css'


const ArticleCard = () => {
	const router = useRouter();
	const dispatch: AppDispatch = useDispatch();

	const {
		news,
		status,
		error,
		searchTerm,
		sortOption,
		itemsPerPage,
		nextPage,
	} = useSelector((state: RootState) => state.news);


	useEffect(() => {
		dispatch(fetchNews({ searchTerm, sortOption, itemsPerPage, nextPage }));
	}, [dispatch, searchTerm, sortOption, itemsPerPage, nextPage]);

	const handleClick = (news: NewsItem) => {
		router.push(`/article?id=${ news.id }`);
	};

	const handleLoadMore = () => {
		const newPage = nextPage + 1;
		const newPageSize = itemsPerPage + itemsPerPage
		dispatch(setLoadMore({ nextPage: newPage, itemsPerPage: newPageSize }));
	}

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	if (status === 'failed') {
		return <p>Error: { error }</p>;
	}

	return (
		<>
			<div className={ styles.articleCard }>
				{ news?.map((item: NewsItem, index) => {
					const formattedDate = formatPublicationDate(item.webPublicationDate);

					return (
						<div key={ index } className={ styles.newsItem }>
							<div className={ styles.imageContainer }>
								{ item?.fields?.thumbnail ? (
									<Image
										src={ item.fields.thumbnail }
										alt={ 'cover' }
										width="500"
										height="500"
									/>
								) : (
									<p>No thumbnail available</p>
								) }
							</div>
							<div className={ styles.cardBody }>
								<p className={ styles.formattedDate }>{ formattedDate }</p>
								<p className={ styles.webTitle }>{ item.webTitle }</p>
							</div>
							<div className={styles.buttonContainer}>
								<button
									className={styles.detailsButton}
									onClick={() => handleClick(item)}
								>
									Details
								</button>
							</div>
						</div>
					);
				}) }

			</div>
			<button className={ styles.loadMoreButton } onClick={ handleLoadMore }>Load More</button>
		</>

	);
};

export default ArticleCard;
