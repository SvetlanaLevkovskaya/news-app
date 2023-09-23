import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNews = createAsyncThunk('article/fetchNews', async () => {
	const apiKey = "f8e7118b-6ea5-4f80-bcb6-5332a889495a"; // Replace with your API key
	const apiUrl = `https://content.guardianapis.com/search?show-fields=body,headline,thumbnail&api-key=${apiKey}`;

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
