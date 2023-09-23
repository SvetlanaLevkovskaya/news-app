'use client'

import React, { useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchNews } from '@/redux/services/fetch-news';
import { NewsItem } from '@/redux/features/news-slice';

export const ArticleCard = () => {
	const router = useRouter();
	const dispatch: AppDispatch = useDispatch();

	const { news, status, error } = useSelector((state: RootState) => state.news);
	console.log('news', news)


	useEffect(() => {
		dispatch(fetchNews());
	}, [dispatch]);

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
				const date = new Date(item.webPublicationDate);

				const day = date.getDate();
				const months = [
					'January', 'February', 'March', 'April',
					'May', 'June', 'July', 'August',
					'September', 'October', 'November', 'December',
				];
				const monthName = months[date.getMonth()];
				const year = date.getFullYear();
				let hours = date.getHours();
				const minute = date.getMinutes();
				const seconds = date.getSeconds();
				const period = hours >= 12 ? 'PM' : 'AM';

				if (hours > 12) {
					hours -= 12;
				}

				const formattedTime = `${ hours.toString().padStart(2, '0') }:${ minute.toString().padStart(2, '0') }:${ seconds.toString().padStart(2, '0') }`;
				const formatted = `${ day } ${ monthName } ${ year } ${ formattedTime } ${ period }`;

				return (
					<div key={ item.id }>
						<Image src={ item.fields.thumbnail } alt={ 'cover' } width={ '350' } height={ '350' } />
						<p>{ formatted }</p>
						<p>{ item.webTitle }</p>
						<button onClick={ () => handleClick(item) }>Details</button>
					</div>
				);
			}) }
		</div>
	);

};


/*
 * 	return (
 <div key={ item.id }>
 <Image src={ item.fields.thumbnail } alt={ 'cover' } width={ '350' } height={ '350' } />
 <p>{ formattedDate }</p>
 <p>{ item.webTitle }</p>
 <button onClick={ handleClick }>Details</button>
 </div>
 );
 *
 * */
