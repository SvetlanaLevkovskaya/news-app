'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFormattedDate } from '@/app/hooks/use-formatted-date';
import { useSearchParams } from 'next/navigation';
import fetchArticle from '@/redux/api/fetch-article';
import DOMPurify from 'dompurify'

export const ArticleDetails = () => {
	const searchParams = useSearchParams();
	const articleId = searchParams.get('id');
	const [article, setArticle] = useState<any>(null);

	useEffect(() => {
		if (articleId) {
			fetchArticle(articleId)
				.then((data: any) => setArticle(data))
				.catch((error) => console.error('Error:', error));
		}
	}, [articleId]);

	const formattedDate = useFormattedDate(article?.webPublicationDate);

	if (!article) {
		return <p>Loading...</p>;
	}

	return (

		<div>
			<p>{formattedDate}</p>
			<div>
				<Image src={article?.fields.thumbnail} alt={'cover'}  width={'350'} height={'350'}  loading="eager"/>
			</div>
			<Link href={article?.webUrl}>read on Guardian</Link>
			<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article?.fields.body) }}></p>
		</div>
	);
};

