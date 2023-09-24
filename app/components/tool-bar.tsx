'use client'

import React, { useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setArticlePerPage, setSearchTerm, setSortOption } from '@/redux/features/news-slice';

export const ToolBar = () => {
	const dispatch: AppDispatch = useDispatch()

	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('')
	const [itemsPerPage, setItemsPerPage] = useState(10)

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

	const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = Number(event.target.value);
		dispatch(setArticlePerPage(selectedValue));
		setItemsPerPage(selectedValue);
	};


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
					<option value="relevance">Relevance</option>
					<option value="oldest">Oldest</option>
				</select>
			</div>

			<div>
				<select value={itemsPerPage} onChange={handleItemsPerPageChange}>
					<option value={10}>10 per page</option>
					<option value={20}>20 per page</option>
					<option value={30}>30 per page</option>
				</select>
			</div>
		</>
	);
};

