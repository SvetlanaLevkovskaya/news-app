'use client'

import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

export const ArticleCard = ({item}: any) => {
	const router = useRouter();

	const webPublicationDate = new Date(item.webPublicationDate);

	const day = webPublicationDate.getDate();
	const months = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December',
	];
	const monthName = months[webPublicationDate.getMonth()];
	const year = webPublicationDate.getFullYear();
	let hours = webPublicationDate.getHours();
	const minute = webPublicationDate.getMinutes();
	const seconds = webPublicationDate.getSeconds();
	const period = hours >= 12 ? 'PM' : 'AM';

	if (hours > 12) {
		hours -= 12;
	}

	const formattedTime = `${hours.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	const formattedDate = `${day} ${monthName} ${year} ${formattedTime} ${period}`;

	const handleClick = () => {
		router.push(`/article?id=${item.id}`);
	};

	return (
		<div key={item.id}>
			<Image src={item.fields.thumbnail} alt={'cover'} width={'350'} height={'350'} />
			<p>{formattedDate}</p>
			<p>{item.webTitle}</p>
			<button onClick={handleClick}>Details</button>
		</div>
	);
};

