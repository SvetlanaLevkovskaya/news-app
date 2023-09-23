'use client'

import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useFormattedDate } from '@/app/hooks/use-formatted-date';

export const ArticleCard = ({ item }: any) => {
	const router = useRouter();

	const formattedDate = useFormattedDate(item.webPublicationDate);

	const handleClick = () => {
		router.push(`/article?id=${ item.id }`);
	};

	return (
		<div key={ item.id }>
			<Image src={ item.fields.thumbnail } alt={ 'cover' } width={ '350' } height={ '350' } />
			<p>{ formattedDate }</p>
			<p>{ item.webTitle }</p>
			<button onClick={ handleClick }>Details</button>
		</div>
	);
};
