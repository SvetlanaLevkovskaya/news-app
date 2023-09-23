'use client'

import React, { useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchNews } from '@/redux/services/fetch-news';
import { NewsItem } from '@/redux/features/news-slice';
import { formatPublicationDate } from '@/app/lib/format-publication-date';

export const ArticleCard = () => {
	const router = useRouter();
	const dispatch: AppDispatch = useDispatch();

	const { news, status, error, searchTerm, sortOption, itemsPerPage } = useSelector((state: RootState) => state.news);

	useEffect(() => {
		dispatch(fetchNews({ searchTerm, sortOption, itemsPerPage }));
	}, [dispatch, searchTerm, sortOption, itemsPerPage]);

	const handleClick = (news: NewsItem) => {
		router.push(`/article?id=${ news.id }`);
	};


	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	if (status === 'failed') {
		return <p>Error: { error }</p>;
	}

	return (
		<div>
			{ news.map((item: NewsItem) => {
				const formattedDate = formatPublicationDate(item.webPublicationDate);

				return (
					<div key={ item.id }>
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
						<p>{ formattedDate }</p>
						<p>{ item.webTitle }</p>
						<button onClick={ () => handleClick(item) }>Details</button>
					</div>
				);
			}) }
		</div>
	);
};
