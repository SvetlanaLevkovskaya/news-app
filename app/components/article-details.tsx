'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import DOMPurify from 'dompurify'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchArticle } from '@/redux/services/fetch-article';
import { formatPublicationDate } from '@/app/lib/format-publication-date';


export const ArticleDetails = () => {
	const searchParams = useSearchParams();
	const articleId = searchParams.get('id');
	const dispatch: AppDispatch = useDispatch();

	const { article, status, error } = useSelector((state: RootState) => state.article);
	const formattedDate = formatPublicationDate(article?.webPublicationDate);

	useEffect(() => {
		if (articleId) {
			dispatch(fetchArticle(articleId));
		}
	}, [articleId, dispatch]);

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	if (status === 'failed') {
		return <p>Error: {error}</p>;
	}

	return (

		<div>
			<p>{formattedDate}</p>
			<div>
				{article?.fields.thumbnail ? (
					<Image
						src={article.fields.thumbnail}
						alt={'cover'}
						width={500}
						height={500}
					/>
				) : (
					<p>No thumbnail available</p>
				)}
			</div>
			<Link href={ article?.webUrl }>read on Guardian</Link>
			<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article?.fields.body || '') }}></p>
		</div>
	);
};

