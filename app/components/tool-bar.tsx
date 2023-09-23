'use client'

import React, { useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setSearchTerm, setSortOption } from '@/redux/features/news-slice';

export const ToolBar = () => {
	const dispatch: AppDispatch = useDispatch()

	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('')

	const handleSearch = () => {
		dispatch(setSearchTerm(search))
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.currentTarget.value)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch()
		}
	}

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value
		dispatch(setSortOption(selectedValue))
		setSort(selectedValue)
	}


	return (
		<>
			<div>
				<input
					type="text"
					value={ search }
					onChange={ handleChange }
					onKeyDown={ handleKeyDown }
					placeholder="Search article..."
				/>
				<button onClick={ handleSearch }>Search</button>
			</div>

			<div>
				<select value={ sort } onChange={ handleSortChange }>
					<option value="newest">Newest</option>
					<option value="oldest">Oldest</option>
				</select>
			</div>
		</>
	);
};

