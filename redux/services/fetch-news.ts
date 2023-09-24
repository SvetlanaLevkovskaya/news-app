import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiKey, apiUrl } from '@/app/constants';
import { NewsItem } from '@/redux/features/news-slice';
import { RootState } from '@/redux/store';

interface FetchNewsType {
	searchTerm: string
	sortOption: string
	itemsPerPage: number
	nextPage: number
}

export const fetchNews = createAsyncThunk<NewsItem[], FetchNewsType>('article/fetchNews', async ({
																																																	 searchTerm,
																																																	 sortOption,
																																																	 itemsPerPage,
																																																	 nextPage,
																																																 }: FetchNewsType, { getState }) => {
	const params = new URLSearchParams({
		'show-fields': 'body,headline,thumbnail',
		'q': searchTerm,
		'order-by': sortOption,
		'page': nextPage.toString(),
		'page-size': itemsPerPage.toString(),
		'api-key': apiKey,
	});

	const apiUrlWithParams = `${ apiUrl }search?${ params.toString() }`;

	try {
		const res = await fetch(apiUrlWithParams);
		const data = await res.json();

		const total = data?.response?.total || 0
		const prevNews = (getState() as RootState).news.news;
		console.log('prevNews', prevNews)
		const newNews = data.response.results;
		console.log('newNews', newNews)
		const combinedNews = [...prevNews, ...newNews];

		return data.response.results
	} catch (error) {
		console.error('Error fetching news', error);
		throw error;
	}
});
