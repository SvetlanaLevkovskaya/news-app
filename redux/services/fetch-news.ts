import { createAsyncThunk } from '@reduxjs/toolkit';

interface FetchNewsType {
	searchTerm: string
	sortOption: string
}

export const fetchNews = createAsyncThunk<any, FetchNewsType>('article/fetchNews', async ({searchTerm, sortOption}: FetchNewsType) => {
	const apiKey = "f8e7118b-6ea5-4f80-bcb6-5332a889495a";
	const apiUrl = `https://content.guardianapis.com/search?show-fields=body,headline,thumbnail&q=${searchTerm}&order-by=${sortOption}&api-key=${apiKey}`;

	try {
		const res = await fetch(apiUrl);
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await res.json();
		return data.response.results;
	} catch (error) {
		console.error('Error fetching news', error);
		throw error;
	}
});
