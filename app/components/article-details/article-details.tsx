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
import styles from './article-details.module.css'
import { Loader } from '@/app/components/loader/loader';


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

	const handleHomeClick = () => {
		window.location.href = '/'
	}

	if (status === 'loading') {
		return <Loader />;
	}

	if (status === 'failed') {
		return <p>Error: { error }</p>;
	}

	return (
		<div className={ styles.container }>
			<button onClick={ handleHomeClick }> Go Home</button>
			<div className={ styles.title }>
				<p>{ article?.webTitle }</p>
			</div>

			<div className={ styles.subTitle }>
				<p>{ formattedDate }</p>
				<Link href={ article?.webUrl }>read on Guardian</Link>
			</div>

			<div className={ styles.rightContainer }>
				<div className={ styles.imageContainer }>
					{ article?.fields.thumbnail ? (
						<Image
							className={ styles.image }
							src={ article.fields.thumbnail }
							alt={ 'cover' }
							width={ 700 }
							height={ 700 }
						/>
					) : (
						<span>No image available</span>
					) }
				</div>

				<p className={ styles.text }
					 dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize(article?.fields.body || '') } }></p>
			</div>
		</div>
	);
};

