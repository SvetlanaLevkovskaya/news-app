import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiKey, apiUrl } from '@/app/constants';


export const fetchArticle = createAsyncThunk('article/fetchArticle', async (articleId: string | undefined) => {

	const apiURL = `${ apiUrl }/${ articleId }?show-fields=body,thumbnail&api-key=${ apiKey }`;

	try {
		const res = await fetch(apiURL);
		const data = await res.json();
		return data.response.content;
	} catch (error) {
		console.error('Error fetching article', error);
		throw error;
	}
});
