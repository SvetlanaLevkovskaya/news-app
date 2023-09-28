import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiKey, apiUrl } from '@/app/constants';
import { NewsItem } from '@/redux/features/news-slice';


interface FetchNewsType {
	searchTerm: string
	sortOption: string
	itemsPerPage: number
	page: number
}

export const fetchNews = createAsyncThunk<NewsItem[], FetchNewsType>('news/fetchNews', async ({
																																																searchTerm,
																																																sortOption,
																																																itemsPerPage,
																																																page,
																																															}: FetchNewsType) => {
	const params = new URLSearchParams({
		'show-fields': 'body,headline,thumbnail',
		'q': searchTerm,
		'order-by': sortOption,
		'page': page.toString(),
		'page-size': itemsPerPage.toString(),
		'api-key': apiKey,
	});

	const apiUrlWithParams = `${ apiUrl }search?${ params.toString() }`;

	try {
		const res = await fetch(apiUrlWithParams);
		const data = await res.json();
		return data.response.results
	} catch (error) {
		console.error('Error fetching news', error);
		throw error;
	}
});
