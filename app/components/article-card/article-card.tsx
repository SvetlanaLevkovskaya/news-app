'use client'

import React, { useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';

import { NewsItem, setLoadMore } from '@/redux/features/news-slice';
import { formatPublicationDate } from '@/app/lib/format-publication-date';
import { fetchNews } from '@/redux/services/fetch-news';
import styles from './article-card.module.css'
import { Loader } from '@/app/components/loader/loader';
import { maxResult } from '@/app/constants';


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
		page,
	} = useAppSelector(state => state.news);

	const handleClick = (news: NewsItem) => {
		router.push(`/article?id=${ news.id }`);
	};

	const handleLoadMore = () => {
		const newPageSize = itemsPerPage + maxResult;
		dispatch(setLoadMore({ page: page, itemsPerPage: newPageSize }));
	}

	useEffect(() => {
		dispatch(fetchNews({ searchTerm, sortOption, itemsPerPage, page }));
	}, [dispatch, searchTerm, sortOption, itemsPerPage, page]);

	if (status === 'loading') {
		return <Loader />;
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
									<p>No image available</p>
								) }
							</div>
							<div className={ styles.cardBody }>
								<p className={ styles.formattedDate }>{ formattedDate }</p>
								<p className={ styles.webTitle }>{ item.webTitle }</p>
							</div>
							<div className={ styles.buttonContainer }>
								<button
									className={ styles.detailsButton }
									onClick={ () => handleClick(item) }
								>
									Details
								</button>
							</div>
						</div>
					);
				}) }

			</div>
			{ news?.length !== 0 &&
        <button className={ styles.loadMoreButton } onClick={ handleLoadMore }>Load More</button> }

		</>

	);
};

export default ArticleCard;
