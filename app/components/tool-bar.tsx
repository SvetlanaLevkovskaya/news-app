'use client'

import React, { useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '@/redux/features/news-slice';

export const ToolBar = () => {
	const dispatch: AppDispatch = useDispatch()
	const router = useRouter();
	const [search, setSearch] = useState('')

	const handleSearch = () => {
		dispatch(setSearchTerm(search))
		router.push(`/`);
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.currentTarget.value)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch()
		}
	}


	return (
		<div>
			<input
				type="text"
				value={ search }
				onChange={ handleChange }
				onKeyDown={ handleKeyDown }
				placeholder="Search books..."
			/>
			<button onClick={ handleSearch }>Search</button>
		</div>
	);
};

